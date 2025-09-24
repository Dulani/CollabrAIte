'use server';

/**
 * @fileOverview This file defines a Genkit flow for getting AI-powered suggestions for document edits.
 *
 * The flow takes a document and instructions as input, and returns AI-generated suggestions for edits.
 * - getAiSuggestions - The main function to call to get AI suggestions.
 * - GetAiSuggestionsInput - The input type for the getAiSuggestions function.
 * - GetAiSuggestionsOutput - The return type for the getAiSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GetAiSuggestionsInputSchema = z.object({
  documentContent: z.string().describe('The content of the document to be edited.'),
  instructions: z.string().describe('Instructions for the AI on how to edit the document.'),
});
export type GetAiSuggestionsInput = z.infer<typeof GetAiSuggestionsInputSchema>;

const GetAiSuggestionsOutputSchema = z.object({
  suggestedEdits: z.string().describe('AI-generated suggestions for edits to the document.'),
});
export type GetAiSuggestionsOutput = z.infer<typeof GetAiSuggestionsOutputSchema>;

export async function getAiSuggestions(input: GetAiSuggestionsInput): Promise<GetAiSuggestionsOutput> {
  return getAiSuggestionsFlow(input);
}

const getAiSuggestionsPrompt = ai.definePrompt({
  name: 'getAiSuggestionsPrompt',
  input: {schema: GetAiSuggestionsInputSchema},
  output: {schema: GetAiSuggestionsOutputSchema},
  prompt: `You are a collaborative editor. A user will provide document content, and instructions on how to edit the document.

  Your job is to take these instructions and generate suggestions based on them to improve the document.

  Document Content: {{{documentContent}}}
  Instructions: {{{instructions}}}

  Suggested Edits:`,
});

const getAiSuggestionsFlow = ai.defineFlow(
  {
    name: 'getAiSuggestionsFlow',
    inputSchema: GetAiSuggestionsInputSchema,
    outputSchema: GetAiSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await getAiSuggestionsPrompt(input);
    return output!;
  }
);
