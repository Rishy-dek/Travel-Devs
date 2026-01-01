import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/40 py-12 bg-background/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-primary text-xl">Travel-devs</span>
              <span className="text-muted-foreground text-sm">v0.1.0-alpha</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              The lightweight C library for environment-portable assets and configurations.
            </p>
          </div>
          
          <div className="flex items-center gap-8">
            <div className="text-sm text-muted-foreground">
              <span className="block font-medium text-foreground mb-2">Resources</span>
              <ul className="space-y-1">
                <li><a href="/docs" className="hover:text-primary transition-colors">Documentation</a></li>
                <li><a href="/demo" className="hover:text-primary transition-colors">Live Demo</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">API Reference</a></li>
              </ul>
            </div>
            <div className="text-sm text-muted-foreground">
              <span className="block font-medium text-foreground mb-2">Community</span>
              <ul className="space-y-1">
                <li><a href="#" className="hover:text-primary transition-colors">GitHub</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Discord</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Twitter</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border/20 flex justify-between items-center text-xs text-muted-foreground">
          <p>© 2024 Travel-devs. Open source under MIT License.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-destructive" /> by Developers for Developers
          </p>
        </div>
      </div>
    </footer>
  );
}
