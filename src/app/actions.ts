'use server';

import { z } from 'zod';
import { generateMotivationalStory } from '@/ai/flows/generate-motivational-story';

const storySchema = z.object({
  category: z.string(),
});

export async function handleGenerateStory(values: z.infer<typeof storySchema>) {
  const validatedFields = storySchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: 'Invalid fields!',
    };
  }

  try {
    const result = await generateMotivationalStory({ category: validatedFields.data.category });
    return { success: result.story };
  } catch (error) {
    return {
      error: 'Failed to generate story. Please try again.',
    };
  }
}

const feedbackSchema = z.object({
    role: z.enum(["student", "teacher"]),
    feedback: z.string().min(10, { message: 'Feedback must be at least 10 characters.'}),
});

export async function handleFeedbackSubmit(values: z.infer<typeof feedbackSchema>) {
    const validatedFields = feedbackSchema.safeParse(values);

    if (!validatedFields.success) {
        return {
            error: "Invalid fields!"
        };
    }
    
    console.log("New Feedback Submitted:", validatedFields.data);

    return { success: "Thank you for your feedback!" };
}
