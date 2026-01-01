import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { exec } from "child_process";
import path from "path";
import fs from "fs";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.get(api.snippets.list.path, async (req, res) => {
    const snippets = await storage.getSnippets();
    res.json(snippets);
  });

  app.post(api.demo.run.path, async (req, res) => {
    const cDir = path.join(process.cwd(), "c_src");
    
    // Compile using make
    exec("make", { cwd: cDir }, (compileError, compileStdout, compileStderr) => {
      if (compileError) {
        return res.json({
          success: false,
          output: `Compilation Failed:\n${compileStderr || compileStdout}`,
          error: compileError.message
        });
      }

      // Run the example
      exec("./main", { cwd: cDir }, (runError, runStdout, runStderr) => {
        if (runError) {
           return res.json({
            success: false,
            output: `Runtime Error:\n${runStderr || runStdout}`,
            error: runError.message
          });
        }
        
        res.json({
          success: true,
          output: runStdout
        });
      });
    });
  });

  // Seed data function
  async function seedSnippets() {
    const existing = await storage.getSnippets();
    if (existing.length === 0) {
      await storage.createSnippet({
        title: "Cross-Platform Build",
        code: `// Windows:
// > mingw32-make

// macOS / Linux:
// $ make`,
        description: "The build system automatically detects your OS and applies correct compiler flags.",
        language: "bash"
      });
      await storage.createSnippet({
        title: "Initialize Library",
        code: `if (td_init() != 0) {
    fprintf(stderr, "Failed to initialize Travel-devs\\n");
    return 1;
}`,
        description: "Always initialize the library before using any other functions.",
        language: "c"
      });
      await storage.createSnippet({
        title: "Load Asset",
        code: `const char* asset_path = td_path(TD_ASSETS);
printf("Assets are located at: %s\\n", asset_path);

void* icon = td_load("icon.png");
if (icon) {
    printf("Icon loaded successfully!\\n");
    td_free_resource(icon);
}`,
        description: "Resolves the asset path based on the current environment.",
        language: "c"
      });
    }
  }
  
  // Call seed
  seedSnippets();

  return httpServer;
}
