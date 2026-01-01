import { z } from 'zod';
import { insertSnippetSchema, snippets } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  snippets: {
    list: {
      method: 'GET' as const,
      path: '/api/snippets',
      responses: {
        200: z.array(z.custom<typeof snippets.$inferSelect>()),
      },
    },
  },
  demo: {
    run: {
      method: 'POST' as const,
      path: '/api/demo/run',
      input: z.object({}), 
      responses: {
        200: z.object({
          output: z.string(),
          error: z.string().optional(),
          success: z.boolean(),
        }),
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}

export type SnippetResponse = z.infer<typeof api.snippets.list.responses[200]>[number];
export type DemoResponse = z.infer<typeof api.demo.run.responses[200]>;
