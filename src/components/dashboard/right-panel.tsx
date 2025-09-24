"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { AiSuggestions } from "./ai-suggestions";
import { VersionHistory } from "./version-history";
import { TaskList } from "./task-list";
import { Bot, History, ListTodo } from "lucide-react";
import type { Document } from "@/lib/types";

export function RightPanel({ document }: { document: Document }) {
  return (
    <aside className="w-96 border-l bg-card hidden md:block">
      <Tabs defaultValue="ai" className="h-full flex flex-col">
        <TabsList className="grid w-full grid-cols-3 m-2">
          <TabsTrigger value="ai">
            <Bot className="h-4 w-4 mr-2" />
            AI
          </TabsTrigger>
          <TabsTrigger value="history">
            <History className="h-4 w-4 mr-2" />
            History
          </TabsTrigger>
          <TabsTrigger value="tasks">
            <ListTodo className="h-4 w-4 mr-2" />
            Tasks
          </TabsTrigger>
        </TabsList>
        <div className="flex-1 overflow-y-auto">
          <TabsContent value="ai" className="mt-0 p-4">
            <AiSuggestions documentContent={document.content} />
          </TabsContent>
          <TabsContent value="history" className="mt-0 p-4">
            <VersionHistory documentId={document.id} />
          </TabsContent>
          <TabsContent value="tasks" className="mt-0 p-4">
            <TaskList documentId={document.id} />
          </TabsContent>
        </div>
      </Tabs>
    </aside>
  );
}
