
"use client";
import { DiffGraphView } from "@/components/diff-graph/diff-graph-view";
import { db } from "@/lib/firebase";
import type { Document, Version } from "@/lib/types";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function DiffGraphPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [versions, setVersions] = useState<Version[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubDocs = onSnapshot(collection(db, "documents"), (snapshot) => {
      const docs = snapshot.docs.map(doc => doc.data() as Document);
      setDocuments(docs);
      if (versions.length > 0) setLoading(false);
    });

    const unsubVersions = onSnapshot(collection(db, "versions"), (snapshot) => {
      const vers = snapshot.docs.map(doc => doc.data() as Version);
      setVersions(vers);
      if (documents.length > 0) setLoading(false);
    });

    // Initial load might complete before snapshots
    Promise.all([
      new Promise(res => onSnapshot(collection(db, "documents"), res)),
      new Promise(res => onSnapshot(collection(db, "versions"), res)),
    ]).then(() => setLoading(false));


    return () => {
      unsubDocs();
      unsubVersions();
    };
  }, []);

  if (loading) {
    return (
       <div className="flex min-h-screen flex-col items-center justify-center">
        <p>Loading document history...</p>
       </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="p-4 border-b bg-card">
        <h1 className="text-2xl font-bold tracking-tight">
          Document Version Graph
        </h1>
        <p className="text-sm text-muted-foreground">
          Visualizing the evolution of documents and contributions.
        </p>
      </header>
      <main className="flex-1 p-4 md:p-6 overflow-auto">
        <DiffGraphView documents={documents} allVersions={versions} />
      </main>
    </div>
  );
}
