'use server';

/**
 * @fileOverview Document outline generation flow.
 *
 * - generateDocumentOutline - A function that generates a document outline from a given topic or prompt.
 * - GenerateDocumentOutlineInput - The input type for the generateDocumentOutline function.
 * - GenerateDocumentOutlineOutput - The return type for the generateDocumentOutline function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateDocumentOutlineInputSchema = z.object({
  topic: z.string().describe('The topic or prompt for generating the document outline.'),
});

export type GenerateDocumentOutlineInput = z.infer<typeof GenerateDocumentOutlineInputSchema>;

const GenerateDocumentOutlineOutputSchema = z.object({
  outline: z.string().describe('The generated document outline.'),
});

export type GenerateDocumentOutlineOutput = z.infer<typeof GenerateDocumentOutlineOutputSchema>;

export async function generateDocumentOutline(input: GenerateDocumentOutlineInput): Promise<GenerateDocumentOutlineOutput> {
  return generateDocumentOutlineFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateDocumentOutlinePrompt',
  input: {schema: GenerateDocumentOutlineInputSchema},
  output: {schema: GenerateDocumentOutlineOutputSchema},
  prompt: `You are an expert document architect. Please generate a detailed and well-structured document outline for the following topic: {{{topic}}}. The outline should include main sections and subsections.
`,
});

const generateDocumentOutlineFlow = ai.defineFlow(
  {
    name: 'generateDocumentOutlineFlow',
    inputSchema: GenerateDocumentOutlineInputSchema,
    outputSchema: GenerateDocumentOutlineOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
