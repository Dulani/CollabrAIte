"use client";

import React, { useMemo } from "react";
import type { Version } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { diffChars } from "diff";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface DiffGraphProps {
  versions: Version[];
}

interface GraphNode {
  id: string;
  version: Version;
  children: GraphNode[];
  level: number;
}

const DiffSegment = ({ part }: { part: ReturnType<typeof diffChars>[0] }) => {
  const baseStyle = "px-1 py-0.5 rounded";
  if (part.added) {
    return <span className={`bg-green-500/20 text-green-200 ${baseStyle}`}>{part.value}</span>;
  }
  if (part.removed) {
    return <span className={`bg-red-500/20 text-red-200 line-through ${baseStyle}`}>{part.value}</span>;
  }
  return <span className="opacity-70">{part.value}</span>;
};

const VersionNode = ({ node, x, y }: { node: GraphNode; x: number; y: number }) => {
  const version = node.version;
  const diff = diffChars(version.contentBefore, version.contentAfter);

  return (
    <div
      className="absolute"
      style={{
        left: x,
        top: y,
        width: 350,
      }}
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Card className="hover:border-primary/50 transition-colors">
              <CardHeader className="flex flex-row items-center gap-4 p-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={version.editor.avatarUrl} />
                  <AvatarFallback>
                    {version.editor.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-sm font-medium leading-none">
                    {version.editor.name}
                  </CardTitle>
                  <CardDescription className="text-xs">
                    {new Date(version.timestamp).toLocaleString()}
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>
          </TooltipTrigger>
          <TooltipContent side="bottom" align="start" className="max-w-md bg-background border-primary">
            <div className="p-2">
                <h4 className="font-bold mb-2">Change Summary:</h4>
                <p className="text-sm italic mb-4">"{version.summary}"</p>
                <h4 className="font-bold mb-2">Diff:</h4>
                <pre className="text-xs whitespace-pre-wrap font-sans bg-muted p-2 rounded-md">
                    {diff.map((part, index) => (
                        <DiffSegment key={index} part={part} />
                    ))}
                </pre>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

const buildTree = (versions: Version[]) => {
  const nodes: { [id: string]: GraphNode } = {};
  const rootNodes: GraphNode[] = [];

  versions.forEach((v) => {
    nodes[v.id] = { id: v.id, version: v, children: [], level: 0 };
  });

  versions.forEach((v) => {
    if (v.parentId && v.parentId !== "root" && nodes[v.parentId]) {
      nodes[v.parentId].children.push(nodes[v.id]);
    } else {
      rootNodes.push(nodes[v.id]);
    }
  });

  const setLevels = (node: GraphNode, level: number) => {
    node.level = level;
    node.children.forEach(child => setLevels(child, level + 1));
  }
  rootNodes.forEach(node => setLevels(node, 0));

  return rootNodes;
};

const calculatePositions = (nodes: GraphNode[]) => {
  const positions = new Map<string, { x: number, y: number }>();
  let y_offset = 0;
  
  const traverse = (node: GraphNode, x_pos: number, y_base: number): number => {
    let current_y = y_base;
    positions.set(node.id, { x: x_pos, y: current_y });
    
    let childrenHeight = 0;
    node.children.forEach((child, index) => {
      if(index > 0) {
        current_y += 120; // vertical spacing between sibling branches
      }
      childrenHeight += traverse(child, x_pos + 400, current_y) - y_base;
    });

    return y_base + childrenHeight + (node.children.length === 0 ? 120 : 0);
  };

  nodes.forEach(node => {
    y_offset = traverse(node, 50, y_offset);
  });
  
  return positions;
};

export function DiffGraph({ versions }: DiffGraphProps) {
  const graphTree = useMemo(() => buildTree(versions), [versions]);
  const positions = useMemo(() => calculatePositions(graphTree), [graphTree]);

  const allNodes: GraphNode[] = [];
  const queue = [...graphTree];
  while(queue.length > 0) {
    const node = queue.shift()!;
    allNodes.push(node);
    queue.push(...node.children);
  }

  const edges: {from: GraphNode, to: GraphNode}[] = [];
  allNodes.forEach(node => {
    node.children.forEach(child => {
        edges.push({from: node, to: child});
    })
  })

  return (
    <div className="relative w-full h-full">
      <svg width="100%" height="100%" className="absolute inset-0">
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="hsl(var(--border))" />
          </marker>
        </defs>
        <g>
          {edges.map(({ from, to }) => {
            const fromPos = positions.get(from.id);
            const toPos = positions.get(to.id);
            if (!fromPos || !toPos) return null;
            return (
              <line
                key={`${from.id}-${to.id}`}
                x1={fromPos.x + 350}
                y1={fromPos.y + 45}
                x2={toPos.x}
                y2={toPos.y + 45}
                stroke="hsl(var(--border))"
                strokeWidth="2"
                markerEnd="url(#arrow)"
              />
            );
          })}
        </g>
      </svg>
      {allNodes.map((node) => {
        const pos = positions.get(node.id);
        if(!pos) return null;
        return <VersionNode key={node.id} node={node} x={pos.x} y={pos.y} />;
      })}
       {versions.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground">No version history for this selection.</p>
          </div>
        )}
    </div>
  );
}
