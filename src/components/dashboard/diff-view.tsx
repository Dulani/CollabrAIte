import React from "react";
import { diffWords } from "diff";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DiffViewProps {
  before: string;
  after: string;
}

export function DiffView({ before, after }: DiffViewProps) {
  const difference = diffWords(before, after);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Before</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="text-sm whitespace-pre-wrap font-sans bg-muted p-4 rounded-md">
            {before}
          </pre>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">After</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="text-sm whitespace-pre-wrap font-sans bg-muted p-4 rounded-md">
            {difference.map((part, index) => {
              const style = {
                backgroundColor: part.added
                  ? "rgba(46, 160, 67, 0.2)"
                  : part.removed
                  ? "rgba(248, 81, 73, 0.2)"
                  : "transparent",
              };
              return (
                <span key={index} style={style}>
                  {part.value}
                </span>
              );
            })}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}
