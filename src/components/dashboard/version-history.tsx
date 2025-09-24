
"use client";

import React, { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DiffView } from "./diff-view";
import { db } from "@/lib/firebase";
import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";
import type { Version } from "@/lib/types";
import { Skeleton } from "../ui/skeleton";

export function VersionHistory({ documentId }: { documentId: string }) {
  const [versions, setVersions] = useState<Version[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!documentId) return;
    setLoading(true);
    const q = query(
      collection(db, "versions"),
      where("documentId", "==", documentId),
      orderBy("timestamp", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const versionsFromFirestore = snapshot.docs.map(doc => doc.data() as Version);
      setVersions(versionsFromFirestore);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [documentId]);


  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
           <div key={i} className="flex items-start gap-4">
              <Skeleton className="h-8 w-8 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-10 w-full" />
              </div>
           </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {versions.map((version) => (
        <div key={version.id} className="flex items-start gap-4">
          <Avatar className="h-8 w-8">
            <AvatarImage src={version.editor.avatarUrl} />
            <AvatarFallback>
              {version.editor.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="text-sm font-medium">
              {version.editor.name}{" "}
              <span className="text-muted-foreground font-normal">
                made an edit
              </span>
            </p>
            <p className="text-sm text-muted-foreground">
              {new Date(version.timestamp).toLocaleString()}
            </p>
            <p className="text-sm my-1 p-2 bg-muted rounded-md">{version.summary}</p>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="link" size="sm" className="p-0 h-auto">
                  View changes
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <DialogHeader>
                  <DialogTitle>Comparing Changes</DialogTitle>
                </DialogHeader>
                <DiffView
                  before={version.contentBefore}
                  after={version.contentAfter}
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      ))}
    </div>
  );
}
