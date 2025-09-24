import React, { useState, useEffect } from "react";
import type { Document as DocumentType } from "@/lib/types";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface DashboardHeaderProps {
  document: DocumentType;
}

export function DashboardHeader({ document }: DashboardHeaderProps) {
  const [updatedAt, setUpdatedAt] = useState("");

  useEffect(() => {
    // This will only run on the client, after initial hydration
    // which prevents a mismatch between server and client rendered content.
    if (document.updatedAt) {
      setUpdatedAt(new Date(document.updatedAt).toLocaleString());
    }
  }, [document.updatedAt]);

  return (
    <header className="p-4 bg-card rounded-t-xl border-b">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{document.title}</h1>
          {updatedAt && (
            <p className="text-sm text-muted-foreground">
              Last updated: {updatedAt}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          {/* Favorite and Share buttons removed */}
        </div>
      </div>
    </header>
  );
}
