"use client";

import { useState } from "react";
import type { AnalysisResult } from "@/lib/schema";
import { toMarkdown } from "@/lib/to-markdown";

type Props = {
  result: AnalysisResult;
  canExport: boolean;
};

function download(markdown: string) {
  const url = URL.createObjectURL(new Blob([markdown], { type: "text/markdown" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = "meeting-recap.md";
  link.click();
  URL.revokeObjectURL(url);
}

export function ResultActions({ result, canExport }: Props) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(toMarkdown(result));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={copy}
        className="rounded-lg border border-border px-3 py-1.5 text-sm font-medium hover:bg-background"
      >
        {copied ? "Copied" : "Copy"}
      </button>
      {canExport ? (
        <button
          type="button"
          onClick={() => download(toMarkdown(result))}
          className="rounded-lg border border-border px-3 py-1.5 text-sm font-medium hover:bg-background"
        >
          Export to Markdown
        </button>
      ) : (
        <a href="#pricing" className="text-sm text-muted underline-offset-4 hover:underline">
          Export to Markdown is a Pro feature
        </a>
      )}
    </div>
  );
}
