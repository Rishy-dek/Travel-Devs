import { useState, useEffect, useRef } from "react";
import { useRunDemo } from "@/hooks/use-demo";
import { CodeBlock } from "@/components/CodeBlock";
import { Play, RotateCcw, Terminal as TerminalIcon, Loader2, Server, Cpu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Demo() {
  const { mutate: runDemo, isPending, data } = useRunDemo();
  const [logs, setLogs] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll logs
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const handleRun = () => {
    setLogs([]); // Clear previous logs
    runDemo(undefined, {
      onSuccess: (response) => {
        // Simulate streaming log effect
        const lines = response.output.split('\n');
        lines.forEach((line, index) => {
          setTimeout(() => {
            setLogs(prev => [...prev, line]);
          }, index * 150); // Stagger lines for effect
        });
      },
      onError: (err) => {
        setLogs(prev => [...prev, `Error: ${err.message}`]);
      }
    });
  };

  const demoCode = `
// demo.c
#include <travel-devs.h>
#include <stdio.h>

int main() {
    printf("[INIT] Starting Travel-devs Demo...\\n");
    
    // Initialize library
    if (td_init() != 0) {
        printf("[ERROR] Init failed!\\n");
        return 1;
    }
    printf("[OK] Environment detected: REPLIT_CONTAINER\\n");

    // Check environment state requirement
    printf("[CHECK] Verifying environment state...\\n");
    if (td_require_state("linux-x64")) {
        printf("[OK] Environment matches 'linux-x64'\\n");
    }

    // Resolve an asset path
    const char* asset = td_path(TD_ASSETS, "data.bin");
    printf("[PATH] Resolved asset: %s\\n", asset);

    printf("[SUCCESS] Demo completed successfully.\\n");
    return 0;
}`;

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Interactive Demo</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Experience the library in action. This demo runs the C code on the server and streams the deterministic output back to this terminal interface.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 h-[600px]">
          {/* Left Column: Code Editor View */}
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <CodeBlockIcon />
                <span className="font-bold">Source Code</span>
              </div>
              <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">Read-only</span>
            </div>
            
            <div className="flex-1 bg-card border border-border/50 rounded-xl overflow-hidden shadow-xl flex flex-col">
              <div className="bg-muted/30 border-b border-border/50 p-3 flex items-center gap-2">
                <div className="flex gap-1.5 mr-4">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <span className="text-xs text-muted-foreground font-mono">demo.c</span>
              </div>
              <div className="flex-1 p-0 overflow-auto bg-[#0d1117]">
                <CodeBlock 
                  code={demoCode} 
                  language="c" 
                  className="my-0 border-none shadow-none bg-transparent" 
                />
              </div>
            </div>
          </div>

          {/* Right Column: Terminal Output */}
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <TerminalIcon className="w-5 h-5 text-primary" />
                <span className="font-bold">Output Terminal</span>
              </div>
              
              <button
                onClick={handleRun}
                disabled={isPending}
                className="flex items-center gap-2 px-4 py-2 rounded-md font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/20 hover:shadow-primary/40 active:scale-95"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Running...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" />
                    Run Code
                  </>
                )}
              </button>
            </div>

            <div className="flex-1 bg-black border border-border/50 rounded-xl overflow-hidden shadow-xl flex flex-col relative font-mono text-sm">
              <div className="bg-muted/20 border-b border-border/20 p-3 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">bash - 80x24</span>
                <div className="flex items-center gap-2">
                  <Cpu className="w-3 h-3 text-muted-foreground" />
                  <span className="text-[10px] text-muted-foreground">x86_64-linux-gnu</span>
                </div>
              </div>

              <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-1 font-mono text-sm leading-relaxed scroll-smooth">
                {logs.length === 0 && !isPending && (
                  <div className="h-full flex flex-col items-center justify-center text-muted-foreground/30">
                    <Server className="w-12 h-12 mb-4 opacity-20" />
                    <p>Ready to execute.</p>
                  </div>
                )}

                {logs.map((log, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex gap-3"
                  >
                    <span className="text-muted-foreground/30 select-none">$</span>
                    <span className={log.includes("[ERROR]") ? "text-red-400" : log.includes("[SUCCESS]") ? "text-green-400 font-bold" : "text-gray-300"}>
                      {log}
                    </span>
                  </motion.div>
                ))}
                
                {isPending && (
                   <motion.div 
                     initial={{ opacity: 0 }} 
                     animate={{ opacity: 1 }} 
                     className="flex gap-2 items-center text-muted-foreground/50 mt-2"
                   >
                     <span className="animate-pulse">_</span>
                   </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Status Indicator */}
        <div className="mt-8 grid grid-cols-3 gap-4">
           <StatusCard label="Compilation" status="Ready" color="bg-green-500" />
           <StatusCard label="Environment" status="Connected" color="bg-blue-500" />
           <StatusCard label="Memory Safety" status="Checked" color="bg-purple-500" />
        </div>
      </div>
    </div>
  );
}

function StatusCard({ label, status, color }: { label: string, status: string, color: string }) {
  return (
    <div className="bg-card border border-border/40 p-4 rounded-lg flex items-center justify-between">
      <span className="text-muted-foreground text-sm font-medium">{label}</span>
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${color} animate-pulse`} />
        <span className="text-sm font-bold">{status}</span>
      </div>
    </div>
  );
}

function CodeBlockIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}
