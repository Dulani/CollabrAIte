"use client";

import React, { useEffect, useState } from "react";
import type { Document } from "@/lib/types";
import { Textarea } from "@/components/ui/textarea";

interface DocumentEditorProps {
  document: Document;
  onContentChange: (content: string) => void;
}

const collaboratorColors = ["#FF6B6B", "#4ECDC4", "#45B7D1"];

const MockCursor = ({ userName, color, position }: { userName: string, color: string, position: { top: number, left: number } }) => (
  <div
    className="absolute pointer-events-none transition-all duration-300 ease-in-out"
    style={{ top: `${position.top}px`, left: `${position.left}px` }}
  >
    <div
      className="w-0.5 h-5"
      style={{ backgroundColor: color }}
    />
    <div
      className="px-2 py-0.5 text-xs text-white rounded-full whitespace-nowrap"
      style={{ backgroundColor: color }}
    >
      {userName}
    </div>
  </div>
);


export function DocumentEditor({ document, onContentChange }: DocumentEditorProps) {
    const [cursorPositions, setCursorPositions] = useState<{ top: number; left: number }[]>([]);

    useEffect(() => {
        // Mock cursor movement
        const interval = setInterval(() => {
            setCursorPositions(
                document.collaboratorIds.map(() => ({
                    top: Math.random() * 300 + 20,
                    left: Math.random() * 400 + 20,
                }))
            );
        }, 3000);

        return () => clearInterval(interval);
    }, [document.collaboratorIds]);

  return (
    <div className="flex-1 p-6 bg-card relative overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <Textarea
          value={document.content}
          onChange={(e) => onContentChange(e.target.value)}
          className="w-full h-[calc(100vh-12rem)] min-h-[500px] resize-none border-0 p-2 focus-visible:ring-0 text-base leading-relaxed bg-card"
          placeholder="Start writing your document..."
        />
      </div>
      {document.collaboratorIds.map((id, index) => (
        <MockCursor
            key={id}
            userName={`User ${index + 2}`}
            color={collaboratorColors[index % collaboratorColors.length]}
            position={cursorPositions[index] || { top: 50, left: 100 * (index + 1) }}
        />
      ))}
    </div>
  );
}
