
"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { db } from "@/lib/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import type { Task } from "@/lib/types";
import { Skeleton } from "../ui/skeleton";

const statusColors: Record<Task['status'], string> = {
  "To Do": "bg-gray-500",
  "In Progress": "bg-blue-500",
  "Done": "bg-green-500",
};

export function TaskList({ documentId }: { documentId: string }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!documentId) return;
    setLoading(true);
    const q = query(
      collection(db, "tasks"),
      where("documentId", "==", documentId)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const tasksFromFirestore = snapshot.docs.map(doc => doc.data() as Task);
      setTasks(tasksFromFirestore);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [documentId]);

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(2)].map((_, i) => (
          <Card key={i}>
            <CardHeader>
               <Skeleton className="h-5 w-3/4" />
            </CardHeader>
            <CardContent className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
               <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-6 w-6 rounded-full" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                  <Skeleton className="h-5 w-16" />
               </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {tasks.length === 0 && <p className="text-sm text-muted-foreground text-center">No tasks for this document.</p>}
      {tasks.map((task) => (
        <Card key={task.id}>
          <CardHeader>
            <CardTitle className="text-base">{task.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              {task.description}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={task.assignee.avatarUrl} />
                  <AvatarFallback>
                    {task.assignee.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">{task.assignee.name}</span>
              </div>
              <Badge variant="secondary" className="text-xs">
                <span className={`w-2 h-2 rounded-full mr-2 ${statusColors[task.status]}`}></span>
                {task.status}
              </Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
