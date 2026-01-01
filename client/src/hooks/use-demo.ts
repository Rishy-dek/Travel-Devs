import { useQuery, useMutation } from "@tanstack/react-query";
import { api, type DemoResponse, type SnippetResponse } from "@shared/routes";

// Hook to fetch snippets (for documentation or examples)
export function useSnippets() {
  return useQuery({
    queryKey: [api.snippets.list.path],
    queryFn: async () => {
      const res = await fetch(api.snippets.list.path);
      if (!res.ok) throw new Error("Failed to fetch snippets");
      // Use the Zod schema from shared routes to validate response
      return api.snippets.list.responses[200].parse(await res.json());
    },
  });
}

// Hook to run the demo simulation
export function useRunDemo() {
  return useMutation({
    mutationFn: async () => {
      // Simulate network delay for effect if needed, but the backend is fast
      const res = await fetch(api.demo.run.path, {
        method: api.demo.run.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });

      if (!res.ok) {
        throw new Error("Failed to run demo");
      }

      const data = await res.json();
      return api.demo.run.responses[200].parse(data);
    },
  });
}
