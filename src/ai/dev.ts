import { config } from 'dotenv';
config();

import '@/ai/flows/generate-document-outline.ts';
import '@/ai/flows/get-ai-suggestions.ts';
import '@/ai/flows/summarize-document.ts';