'use server';

/**
 * @fileOverview AI-powered tool to refine thesis abstracts and titles.
 *
 * - refineAbstractAndTitle - A function that refines the thesis abstract and title.
 * - RefineAbstractAndTitleInput - The input type for the refineAbstractAndTitle function.
 * - RefineAbstractAndTitleOutput - The return type for the refineAbstractAndTitle function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RefineAbstractAndTitleInputSchema = z.object({
  title: z.string().describe('The current title of the thesis.'),
  abstract: z.string().describe('The current abstract of the thesis.'),
});
export type RefineAbstractAndTitleInput = z.infer<typeof RefineAbstractAndTitleInputSchema>;

const RefineAbstractAndTitleOutputSchema = z.object({
  refinedTitle: z.string().describe('The refined title of the thesis.'),
  refinedAbstract: z.string().describe('The refined abstract of the thesis.'),
});
export type RefineAbstractAndTitleOutput = z.infer<typeof RefineAbstractAndTitleOutputSchema>;

export async function refineAbstractAndTitle(input: RefineAbstractAndTitleInput): Promise<RefineAbstractAndTitleOutput> {
  return refineAbstractAndTitleFlow(input);
}

const refineAbstractAndTitlePrompt = ai.definePrompt({
  name: 'refineAbstractAndTitlePrompt',
  input: {schema: RefineAbstractAndTitleInputSchema},
  output: {schema: RefineAbstractAndTitleOutputSchema},
  prompt: `You are an expert academic editor. Your task is to help students refine their thesis titles and abstracts.

  Instructions:
  1.  Improve the clarity, conciseness, and impact of the title and abstract.
  2.  Suggest changes based on current academic trends and keywords.
  3.  Ensure the refined title and abstract accurately reflect the thesis content.
  4.  Use language that is appropriate for an academic audience.

  Current Title: {{{title}}}
  Current Abstract: {{{abstract}}}

  Refined Title: (Provide a refined version of the title here)
  Refined Abstract: (Provide a refined version of the abstract here)`,
});

const refineAbstractAndTitleFlow = ai.defineFlow(
  {
    name: 'refineAbstractAndTitleFlow',
    inputSchema: RefineAbstractAndTitleInputSchema,
    outputSchema: RefineAbstractAndTitleOutputSchema,
  },
  async input => {
    const {output} = await refineAbstractAndTitlePrompt(input);
    return output!;
  }
);
