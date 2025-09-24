"use client";

import React, { useState } from "react";
import {
  SidebarProvider,
  Sidebar,
  SidebarInset,
} from "@/components/ui/sidebar";
import { DocumentList } from "@/components/dashboard/document-list";
import { DocumentEditor } from "@/components/dashboard/document-editor";
import { DashboardHeader } from "@/components/dashboard/header";
import { documents as initialDocuments } from "@/lib/data";
import type { Document } from "@/lib/types";

export function Dashboard() {
  const [documents, setDocuments] = useState<Document[]>(initialDocuments);
  const [activeDocument, setActiveDocument] = useState<Document>(documents[0]);

  const handleSelectDocument = (docId: string) => {
    const selectedDoc = documents.find((doc) => doc.id === docId);
    if (selectedDoc) {
      setActiveDocument(selectedDoc);
    }
  };

  const handleUpdateDocument = (content: string) => {
    setActiveDocument((prevDoc) => {
      if (!prevDoc) return prevDoc;
      const newDoc = { ...prevDoc, content, updatedAt: new Date().toISOString() };
      setDocuments(docs => docs.map(d => d.id === newDoc.id ? newDoc : d));
      return newDoc;
    });
  }

  const handleToggleAILock = (docId: string) => {
    setDocuments(docs => 
      docs.map(doc => 
        doc.id === docId ? { ...doc, aiLocked: !doc.aiLocked } : doc
      )
    );
    // Also update active document if it's the one being changed
    if (activeDocument?.id === docId) {
      setActiveDocument(prev => prev ? {...prev, aiLocked: !prev.aiLocked} : prev);
    }
  };


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
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
