import { CodeBlock } from "@/components/CodeBlock";
import { Link } from "wouter";
import { ArrowLeft, Book, Code, Settings } from "lucide-react";

export default function Docs() {
  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar for Docs */}
      <aside className="w-64 border-r border-border/40 hidden md:block sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
        <div className="p-6">
          <h5 className="font-bold text-sm text-foreground mb-4 uppercase tracking-wider">Getting Started</h5>
          <ul className="space-y-1 mb-8">
            <li><a href="#installation" className="block px-3 py-2 text-sm rounded-md bg-primary/10 text-primary font-medium">Installation</a></li>
            <li><a href="#quickstart" className="block px-3 py-2 text-sm rounded-md text-muted-foreground hover:bg-muted/50 hover:text-foreground">Quick Start</a></li>
            <li><a href="#concepts" className="block px-3 py-2 text-sm rounded-md text-muted-foreground hover:bg-muted/50 hover:text-foreground">Core Concepts</a></li>
          </ul>

          <h5 className="font-bold text-sm text-foreground mb-4 uppercase tracking-wider">API Reference</h5>
          <ul className="space-y-1">
            <li><a href="#td_init" className="block px-3 py-2 text-sm rounded-md text-muted-foreground hover:bg-muted/50 hover:text-foreground font-mono">td_init()</a></li>
            <li><a href="#td_path" className="block px-3 py-2 text-sm rounded-md text-muted-foreground hover:bg-muted/50 hover:text-foreground font-mono">td_path()</a></li>
            <li><a href="#td_config" className="block px-3 py-2 text-sm rounded-md text-muted-foreground hover:bg-muted/50 hover:text-foreground font-mono">td_config()</a></li>
            <li><a href="#td_require_state" className="block px-3 py-2 text-sm rounded-md text-muted-foreground hover:bg-muted/50 hover:text-foreground font-mono">td_require_state()</a></li>
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 md:p-12 max-w-4xl mx-auto">
        <div className="mb-12">
          <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold mb-4">Documentation</h1>
          <p className="text-xl text-muted-foreground">
            Complete reference guide for the Travel-devs C library.
          </p>
        </div>

        <section id="installation" className="mb-16 scroll-mt-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              <Settings className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold">Installation</h2>
          </div>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Travel-devs is a single-header-file library in its simplest form, or can be linked as a shared object.
          </p>
          <CodeBlock 
            code={`git clone https://github.com/travel-devs/core.git
cd core
make install`} 
            language="bash" 
            title="bash"
          />
        </section>

        <section id="api-reference" className="mb-16 scroll-mt-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              <Code className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold">API Reference</h2>
          </div>

          <div className="space-y-12">
            {/* td_init */}
            <div id="td_init" className="scroll-mt-24 border border-border/50 rounded-xl p-6 bg-card/50">
              <h3 className="text-xl font-mono font-bold text-primary mb-2">int td_init(void)</h3>
              <p className="text-muted-foreground mb-4">
                Initializes the library, detecting the current environment context (OS, container status, path roots).
              </p>
              <div className="mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Returns</span>
                <p className="font-mono text-sm mt-1">0 on success, non-zero error code on failure.</p>
              </div>
              <CodeBlock 
                code={`if (td_init() != 0) {
    fprintf(stderr, "Failed to initialize travel-devs\\n");
    return 1;
}`} 
                language="c" 
                title="example.c"
              />
            </div>

            {/* td_path */}
            <div id="td_path" className="scroll-mt-24 border border-border/50 rounded-xl p-6 bg-card/50">
              <h3 className="text-xl font-mono font-bold text-primary mb-2">const char* td_path(TD_ResourceType type, const char* filename)</h3>
              <p className="text-muted-foreground mb-4">
                Resolves a portable path for a resource. Automatically handles <code>/usr/share</code> vs local <code>./assets</code> vs container mounts.
              </p>
              <CodeBlock 
                code={`// Get path to 'config.json' in the configuration directory
const char* cfg_path = td_path(TD_CONFIG, "config.json");

// Get path to 'sprite.png' in the assets directory
const char* img_path = td_path(TD_ASSETS, "sprite.png");`} 
                language="c" 
                title="example.c"
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
