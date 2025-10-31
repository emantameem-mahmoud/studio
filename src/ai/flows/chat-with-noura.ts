
'use server';
/**
 * @fileoverview A chatbot flow for Noura, the smart assistant.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { ChatWithNouraInputSchema, type ChatWithNouraInput, ChatWithNouraOutputSchema, type ChatWithNouraOutput } from '@/ai/schema/chat-with-noura';


const nouraPrompt = ai.definePrompt({
    name: 'nouraPrompt',
    input: { schema: ChatWithNouraInputSchema },
    output: { schema: z.string() },
    prompt: `
        You are Noura, a friendly and helpful AI assistant for the Northern Elementary School for Girls.
        Your personality is cheerful, encouraging, and knowledgeable about school activities, especially in IT and computing.
        You are speaking with a student in Arabic. Keep your responses concise, friendly, and appropriate for an elementary school student.
        Here is the conversation history:
        {{#each history}}
            {{#if (eq role 'user')}}
                User: {{{content}}}
            {{else}}
                Noura: {{{content}}}
            {{/if}}
        {{/each}}
    `
});

const chatWithNouraFlow = ai.defineFlow(
    {
        name: 'chatWithNouraFlow',
        inputSchema: ChatWithNouraInputSchema,
        outputSchema: ChatWithNouraOutputSchema,
    },
    async (input) => {
        const { output } = await nouraPrompt(input);
        return output || "أ抱歉،我不太明白。你能再说一遍吗？"; // Fallback response in Arabic
    }
);


export async function chatWithNoura(input: ChatWithNouraInput): Promise<ChatWithNouraOutput> {
  return chatWithNouraFlow(input);
}
