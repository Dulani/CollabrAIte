"use client";

import React, { useState, useMemo } from "react";
import type { Document, Version } from "@/lib/types";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DiffGraph } from "./diff-graph";

interface DiffGraphViewProps {
  documents: Document[];
  allVersions: Version[];
}

export function DiffGraphView({
  documents,
  allVersions,
}: DiffGraphViewProps) {
  const [isConcatenated, setIsConcatenated] = useState(false);
  const [selectedDocId, setSelectedDocId] = useState("all");

  const versions = useMemo(() => {
    if (isConcatenated) {
        // Simple concatenation for now. A more robust implementation might handle merges.
        const combinedDocId = documents.map(d => d.id).join('+');
        return allVersions.map(v => ({...v, documentId: combinedDocId, parentId: v.parentId === 'root' ? 'root' : `concat-${v.parentId}` }));
    }
    if (selectedDocId === "all") {
      return allVersions;
    }
    return allVersions.filter((v) => v.documentId === selectedDocId);
  }, [selectedDocId, allVersions, isConcatenated, documents]);

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 rounded-lg border bg-card p-4 shadow-sm">
        <div className="flex items-center space-x-2">
          <Switch
            id="concatenated-mode"
            checked={isConcatenated}
            onCheckedChange={setIsConcatenated}
          />
          <Label htmlFor="concatenated-mode">Concatenated View</Label>
        </div>
        <div className="w-64">
          <Select
            value={selectedDocId}
            onValueChange={setSelectedDocId}
            disabled={isConcatenated}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a document" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Documents</SelectItem>
              {documents.map((doc) => (
                <SelectItem key={doc.id} value={doc.id}>
                  {doc.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="w-full h-[calc(100vh-20rem)] p-4 border rounded-lg bg-card shadow-sm overflow-auto">
        <DiffGraph versions={versions} />
      </div>
    </div>
  );
}
