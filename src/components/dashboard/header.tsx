import React, { useState, useEffect } from "react";
import type { Document as DocumentType, User } from "@/lib/types";
import { users } from "@/lib/data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Share2, Star } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface DashboardHeaderProps {
  document: DocumentType;
}

const getCollaborators = (doc: DocumentType): User[] => {
  const owner = users.find((u) => u.id === doc.ownerId);
  const collaborators = doc.collaboratorIds
    .map((id) => users.find((u) => u.id === id))
    .filter((u): u is User => !!u);
  return owner ? [owner, ...collaborators] : collaborators;
};

export function DashboardHeader({ document }: DashboardHeaderProps) {
  const [updatedAt, setUpdatedAt] = useState("");

  useEffect(() => {
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
          <Button variant="outline" size="sm">
            <Star className="mr-2 h-4 w-4" />
            Favorite
          </Button>
          <Button size="sm">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </div>
      </div>
    </header>
  );
}
