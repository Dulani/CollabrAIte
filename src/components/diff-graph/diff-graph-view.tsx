
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
import { DiffView } from "@/components/dashboard/diff-view";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
  const [selectedVersion, setSelectedVersion] = useState<Version | null>(null);

  const versions = useMemo(() => {
    if (isConcatenated) {
      const combinedDocId = documents.map((d) => d.id).join("+");
      return allVersions.map((v) => ({
        ...v,
        documentId: combinedDocId,
        parentId: v.parentId === "root" ? "root" : `concat-${v.parentId}`,
      }));
    }
    if (selectedDocId === "all") {
      return allVersions;
    }
    return allVersions.filter((v) => v.documentId === selectedDocId);
  }, [selectedDocId, allVersions, isConcatenated, documents]);

  // When versions change, clear the selected version if it's no longer in the list
  React.useEffect(() => {
    if (selectedVersion && !versions.find(v => v.id === selectedVersion.id)) {
      setSelectedVersion(null);
    }
  }, [versions, selectedVersion]);

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
      <div className="w-full h-[calc(100vh-25rem)] p-4 border rounded-lg bg-card shadow-sm overflow-auto">
        <DiffGraph versions={versions} onNodeClick={setSelectedVersion} />
      </div>
      {selectedVersion && (
        <Card>
          <CardHeader>
            <CardTitle>Comparing Changes</CardTitle>
            <CardDescription>{selectedVersion.summary}</CardDescription>
          </CardHeader>
          <CardContent>
            <DiffView
              before={selectedVersion.contentBefore}
              after={selectedVersion.contentAfter}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
