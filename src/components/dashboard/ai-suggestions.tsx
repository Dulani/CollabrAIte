"use client";

import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Sparkles } from "lucide-react";
import { getAiSuggestions } from "@/ai/flows/get-ai-suggestions";
import { Skeleton } from "@/components/ui/skeleton";

export function AiSuggestions({
  documentContent,
}: {
  documentContent: string;
}) {
  const [instructions, setInstructions] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!instructions.trim()) return;

    setIsLoading(true);
    setSuggestion("");

    try {
      const result = await getAiSuggestions({ documentContent, instructions });
      setSuggestion(result.suggestedEdits);
    } catch (error) {
      console.error("Failed to get AI suggestions:", error);
      setSuggestion("Sorry, I couldn't generate a suggestion at this time.");
    } finally {
      setIsLoading(false);
    }
  };

  const quickPrompts = [
    "Make it more concise",
    "Fix spelling and grammar",
    "Improve the tone to be more professional",
    "Summarize this document",
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot /> AI Assistant
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Textarea
              placeholder="Tell the AI what you want to change... e.g., 'Make this section more formal.'"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="min-h-[100px]"
            />
            <div className="flex flex-wrap gap-2">
              {quickPrompts.map((prompt) => (
                <Button
                  key={prompt}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setInstructions(prompt)}
                >
                  {prompt}
                </Button>
              ))}
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Generating..." : "Generate Suggestions"}
              <Sparkles className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </CardContent>
      </Card>

      {(isLoading || suggestion) && (
        <Card>
          <CardHeader>
            <CardTitle>Suggested Edits</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ) : (
              <div className="prose prose-sm dark:prose-invert max-w-none text-sm text-foreground whitespace-pre-wrap font-sans">
                {suggestion}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
