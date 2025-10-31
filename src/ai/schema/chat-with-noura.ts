import { z } from 'zod';

export const ChatMessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});
export type ChatMessage = z.infer<typeof ChatMessageSchema>;

export const ChatWithNouraInputSchema = z.object({
  history: z.array(ChatMessageSchema),
});
export type ChatWithNouraInput = z.infer<typeof ChatWithNouraInputSchema>;

export const ChatWithNouraOutputSchema = z.string();
export type ChatWithNouraOutput = z.infer<typeof ChatWithNouraOutputSchema>;
