'use server';

/**
 * @fileOverview A motivational story generation AI agent.
 *
 * - generateMotivationalStory - A function that handles the story generation process.
 * - GenerateMotivationalStoryInput - The input type for the generateMotivationalStory function.
 * - GenerateMotivationalStoryOutput - The return type for the generateMotivationalStory function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateMotivationalStoryInputSchema = z.object({
  category: z
    .string()
    .describe(
      'The category or theme for the motivational story (e.g., perseverance, teamwork, creativity)'
    ),
});
export type GenerateMotivationalStoryInput = z.infer<
  typeof GenerateMotivationalStoryInputSchema
>;

const GenerateMotivationalStoryOutputSchema = z.object({
  story: z.string().describe('The generated motivational story.'),
});
export type GenerateMotivationalStoryOutput = z.infer<
  typeof GenerateMotivationalStoryOutputSchema
>;

export async function generateMotivationalStory(
  input: GenerateMotivationalStoryInput
): Promise<GenerateMotivationalStoryOutput> {
  return generateMotivationalStoryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateMotivationalStoryPrompt',
  input: {schema: GenerateMotivationalStoryInputSchema},
  output: {schema: GenerateMotivationalStoryOutputSchema},
  prompt: `You are a motivational story writer for elementary school students.

  Write a short, engaging, and age-appropriate motivational story based on the following category:

  Category: {{{category}}}
  `,
});

const generateMotivationalStoryFlow = ai.defineFlow(
  {
    name: 'generateMotivationalStoryFlow',
    inputSchema: GenerateMotivationalStoryInputSchema,
    outputSchema: GenerateMotivationalStoryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
