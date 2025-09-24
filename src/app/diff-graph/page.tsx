import { DiffGraphView } from "@/components/diff-graph/diff-graph-view";
import { documents, versions } from "@/lib/data";

export default function DiffGraphPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="p-4 border-b bg-card">
        <h1 className="text-2xl font-bold tracking-tight">
          Document Version Graph
        </h1>
        <p className="text-sm text-muted-foreground">
          Visualizing the evolution of documents and contributions.
        </p>
      </header>
      <main className="flex-1 p-4 md:p-6">
        <DiffGraphView documents={documents} allVersions={versions} />
      </main>
    </div>
  );
}
