import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  className?: string;
}

export function CodeBlock({ code, language = "c", title, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Very basic syntax highlighting simulation for C
  const highlightCode = (source: string) => {
    return source.split('\n').map((line, i) => {
      // Basic tokenizing logic for visual effect
      const highlightedLine = line
        .replace(/\/\/.*/g, '<span class="code-token-comment">$&</span>')
        .replace(/\b(int|void|char|const|return|if|else|while|for|struct)\b/g, '<span class="code-token-keyword">$1</span>')
        .replace(/\b(td_init|td_path|td_config|td_require_state|td_load|printf)\b/g, '<span class="code-token-function">$1</span>')
        .replace(/(".*?")/g, '<span class="code-token-string">$1</span>')
        .replace(/\b(\d+)\b/g, '<span class="code-token-number">$1</span>');

      return (
        <div key={i} className="table-row">
          <span className="table-cell text-right select-none text-muted-foreground/40 pr-4 border-r border-border/20 w-8">
            {i + 1}
          </span>
          <span className="table-cell pl-4 whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: highlightedLine || ' ' }} />
        </div>
      );
    });
  };

  return (
    <div className={cn("terminal-window my-6", className)}>
      <div className="terminal-header justify-between">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="terminal-dot bg-red-500/80" />
            <div className="terminal-dot bg-yellow-500/80" />
            <div className="terminal-dot bg-green-500/80" />
          </div>
          {title && (
            <span className="ml-3 text-xs text-muted-foreground font-medium flex items-center gap-1">
              <span className="opacity-50">file:</span> {title}
            </span>
          )}
        </div>
        <button
          onClick={handleCopy}
          className="text-xs flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <div className="p-4 overflow-x-auto bg-[#0d1117]">
        <code className="text-sm font-mono leading-relaxed table w-full">
          {highlightCode(code)}
        </code>
      </div>
    </div>
  );
}
