
"use client";

import React, { useState, useEffect } from "react";
import {
  SidebarProvider,
  Sidebar,
  SidebarInset,
} from "@/components/ui/sidebar";
import { DocumentList } from "@/components/dashboard/document-list";
import { DocumentEditor } from "@/components/dashboard/document-editor";
import { DashboardHeader } from "@/components/dashboard/header";
import type { Document } from "@/lib/types";
import { RightPanel } from "./right-panel";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { documents as initialDocuments } from "@/lib/data";


export function Dashboard() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [activeDocument, setActiveDocument] = useState<Document | null>(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "documents"), (snapshot) => {
      const docsFromFirestore = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Document));
      
      // A one-time operation to seed the database if it's empty
      if (docsFromFirestore.length === 0) {
        console.log("No documents found in Firestore, seeding with initial data...");
        initialDocuments.forEach(async (d) => {
          const { id, ...data } = d;
          await db.collection('documents').doc(id).set(data);
        });
        setDocuments(initialDocuments);
        setActiveDocument(initialDocuments[0]);
        return;
      }

      setDocuments(docsFromFirestore);
      
      if (!activeDocument) {
        setActiveDocument(docsFromFirestore[0]);
      } else {
        const updatedActiveDoc = docsFromFirestore.find(d => d.id === activeDocument.id);
        if (updatedActiveDoc) {
          setActiveDocument(updatedActiveDoc);
        } else {
          setActiveDocument(docsFromFirestore[0] || null);
        }
      }
    });

    return () => unsubscribe();
  }, [activeDocument]);


  const handleSelectDocument = (docId: string) => {
    const selectedDoc = documents.find((doc) => doc.id === docId);
    if (selectedDoc) {
      setActiveDocument(selectedDoc);
    }
  };

  const handleUpdateDocument = async (content: string) => {
    if (!activeDocument) return;

    const docRef = doc(db, "documents", activeDocument.id);
    await updateDoc(docRef, { 
      content,
      updatedAt: new Date().toISOString() 
    });
  };

  const handleToggleAILock = async (docId: string) => {
    const docToToggle = documents.find(doc => doc.id === docId);
    if (!docToToggle) return;

    const docRef = doc(db, "documents", docId);
    await updateDoc(docRef, { aiLocked: !docToToggle.aiLocked });
  };

  if (!activeDocument) {
    return <div>Loading...</div>;
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <DocumentList
          documents={documents}
          activeDocumentId={activeDocument.id}
          onSelectDocument={handleSelectDocument}
          onToggleAILock={handleToggleAILock}
        />
      </Sidebar>

      <div className="flex-1">
        <SidebarInset>
          <DashboardHeader document={activeDocument} />
          <div className="relative flex-1 overflow-hidden">
            <div className="h-full w-full flex">
              <DocumentEditor
                key={activeDocument.id}
                document={activeDocument}
                onContentChange={handleUpdateDocument}
              />
              <RightPanel document={activeDocument} />
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
