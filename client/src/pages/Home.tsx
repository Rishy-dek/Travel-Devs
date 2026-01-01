import { motion } from "framer-motion";
import { ArrowRight, Box, ShieldCheck, Zap, Layers } from "lucide-react";
import { Link } from "wouter";
import { CodeBlock } from "@/components/CodeBlock";

export default function Home() {
  const heroCode = `
#include <travel-devs.h>

int main() {
    // 1. Initialize environment context
    td_init();

    // 2. Get safe, portable asset path
    const char* icon_path = td_path(TD_ASSETS, "icon.png");
    
    // 3. Load config securely
    const char* api_key = td_config("API_KEY");
    
    // 4. Ensure environment is correct
    if (!td_require_state("linux-x64-gcc13")) {
        return 1; // Fails safely if env mismatch
    }

    printf("Ready to travel! Asset at: %s\\n", icon_path);
    return 0;
}`;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono font-medium mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                v0.1.0-alpha is now available
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
                Code that travels <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">
                  without baggage.
                </span>
              </h1>
              
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-xl">
                A lightweight C library to make your code, assets, and configs environment-aware. 
                Write once, run deterministically across containers, cloud, and local dev.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/docs" className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all hover:translate-y-[-2px] shadow-lg shadow-primary/25">
                  Get Started
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
                <Link href="/demo" className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold bg-secondary text-secondary-foreground border border-border/50 hover:bg-secondary/80 transition-all hover:translate-y-[-2px]">
                  Try Interactive Demo
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-600 rounded-xl blur opacity-20" />
              <CodeBlock 
                code={heroCode} 
                language="c" 
                title="main.c" 
                className="shadow-2xl" 
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-muted/20 border-y border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Travel-devs?</h2>
            <p className="text-muted-foreground">
              Stop fighting "it works on my machine". Built for systems programmers who need deterministic behavior.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={Box}
              title="Portable Assets"
              description="Resolve paths automatically based on environment (Docker, local, prod). No more relative path hell."
            />
            <FeatureCard 
              icon={ShieldCheck}
              title="Deterministic State"
              description="Enforce environment constraints via `td_require_state`. If the environment doesn't match, fail fast and safely."
            />
            <FeatureCard 
              icon={Zap}
              title="Zero Dependencies"
              description="Written in pure C99. Tiny footprint. Embeddable in any project. Bindings for Python, Rust, and Node soon."
            />
          </div>
        </div>
      </section>

      {/* Integration Example */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card border border-border/50 rounded-2xl p-8 md:p-12 overflow-hidden relative">
            <div className="absolute top-0 right-0 p-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            
            <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
              <div>
                <h2 className="text-3xl font-bold mb-6">Works where you work</h2>
                <div className="space-y-4">
                  <IntegrationItem title="Docker Containers" desc="Detects containerized environments automatically." />
                  <IntegrationItem title="CI/CD Pipelines" desc="Ensures build artifacts carry their context." />
                  <IntegrationItem title="Cross-Platform" desc="Seamless paths on Linux, macOS, and Windows." />
                </div>
              </div>
              <div className="bg-background/50 rounded-xl p-6 border border-border/50">
                <div className="flex items-center gap-4 mb-4 border-b border-border/50 pb-4">
                  <Layers className="text-primary w-6 h-6" />
                  <span className="font-mono font-bold">Supported Environments</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {['Ubuntu 20.04', 'Alpine Linux', 'macOS 14', 'Windows 11', 'AWS Lambda', 'Vercel'].map(env => (
                    <div key={env} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      {env}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description }: { icon: any, title: string, description: string }) {
  return (
    <div className="bg-card p-6 rounded-xl border border-border/50 hover:border-primary/50 transition-colors group">
      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}

function IntegrationItem({ title, desc }: { title: string, desc: string }) {
  return (
    <div className="flex gap-4">
      <div className="mt-1">
        <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold">
          <CheckIcon />
        </div>
      </div>
      <div>
        <h4 className="font-bold">{title}</h4>
        <p className="text-sm text-muted-foreground">{desc}</p>
      </div>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
