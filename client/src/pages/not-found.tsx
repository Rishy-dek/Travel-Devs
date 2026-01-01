import { Link } from "wouter";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-4">
      <div className="bg-card w-full max-w-md p-8 rounded-xl border border-border shadow-2xl text-center">
        <div className="mx-auto w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mb-6">
          <AlertTriangle className="w-8 h-8 text-destructive" />
        </div>
        
        <h1 className="text-2xl font-bold mb-2 text-foreground">404 Page Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The requested resource could not be found in this environment context.
        </p>

        <Link href="/" className="inline-flex items-center justify-center w-full px-4 py-3 rounded-lg font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
          Return to Safe State
        </Link>
      </div>
    </div>
  );
}
