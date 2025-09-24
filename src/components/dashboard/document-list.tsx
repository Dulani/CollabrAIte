"use client";

import React from "react";
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { File, Plus, Settings, Sparkles, LogOut } from "lucide-react";
import type { Document } from "@/lib/types";
import { users } from "@/lib/data";

interface DocumentListProps {
  documents: Document[];
  activeDocumentId: string;
  onSelectDocument: (docId: string) => void;
}

const currentUser = users[0];

export function DocumentList({
  documents,
  activeDocumentId,
  onSelectDocument,
}: DocumentListProps) {
  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Sparkles className="h-5 w-5" />
          </div>
          <span className="text-lg font-semibold text-sidebar-foreground">
            CollabrAIte
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center justify-between">
            <span>Documents</span>
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <Plus className="h-4 w-4" />
            </Button>
          </SidebarGroupLabel>
          <SidebarMenu>
            {documents.map((doc) => (
              <SidebarMenuItem key={doc.id}>
                <SidebarMenuButton
                  onClick={() => onSelectDocument(doc.id)}
                  isActive={doc.id === activeDocumentId}
                  className="truncate"
                >
                  <File className="h-4 w-4" />
                  <span>{doc.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Separator className="my-2 bg-sidebar-border" />
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton>
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                 <div className="p-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
                            <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-sm text-sidebar-foreground">{currentUser.name}</span>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-sidebar-foreground/70 hover:text-sidebar-foreground">
                        <LogOut className="h-4 w-4" />
                    </Button>
                 </div>
            </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
}
