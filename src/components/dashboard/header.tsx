import React from "react";
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
  const collaborators = getCollaborators(document);

  return (
    <header className="p-4 bg-card rounded-t-xl border-b">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{document.title}</h1>
          <p className="text-sm text-muted-foreground">
            Last updated: {new Date(document.updatedAt).toLocaleString()}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2 overflow-hidden">
            {collaborators.map((user) => (
              <Tooltip key={user.id}>
                <TooltipTrigger>
                  <Avatar className="h-8 w-8 border-2 border-card">
                    <AvatarImage src={user.avatarUrl} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </TooltipTrigger>
                <TooltipContent>{user.name}</TooltipContent>
              </Tooltip>
            ))}
          </div>
          <Separator orientation="vertical" className="h-6" />
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
