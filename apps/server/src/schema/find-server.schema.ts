import { z } from 'zod';

export const serverSchema = z.object({
  url: z.string().url(),
  priority: z.number().int().positive(), // Assuming priority should be a positive integer
});

// Define the Zod schema for an array of server objects
export const serversSchema = z.array(serverSchema);

export type ServerSchema = z.infer<typeof serverSchema>;
