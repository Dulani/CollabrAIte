
import type { User, Document, Version, Task } from './types';

export const users: User[] = [
  { id: '1', name: 'Alice', avatarUrl: 'https://picsum.photos/seed/user1/40/40' },
  { id: '2', name: 'Bob', avatarUrl: 'https://picsum.photos/seed/user2/40/40' },
  { id: '3', name: 'Charlie', avatarUrl: 'https://picsum.photos/seed/user3/40/40' },
  { id: '4', name: 'David', avatarUrl: 'https://picsum.photos/seed/user4/40/40' },
  { id: 'ai', name: 'CollabrAIte Bot', avatarUrl: 'https://picsum.photos/seed/ai/40/40' },
];

export const documents: Document[] = [
  {
    id: 'doc1',
    title: 'Step 1: Identify Relevant Historical Analogues',
    content: `The first stage is to select past technologies whose governance challenges share similarities with the target technology in question. These analogues should be chosen based on factors like risk profile, societal impact, pace of development, and geopolitical context. Gather background information, timelines, and a clear mapping of stakeholders to anchor later comparative analysis.`,
    ownerId: '1',
    collaboratorIds: [],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    aiLocked: false,
  },
  {
    id: 'doc2',
    title: 'Step 2: Map Past Governance Mechanisms',
    content: `Once the analogues are identified, examine the specific governance tools and methods that were applied to manage them. This can include international treaties and organizations, national legislation, industry self-regulation, hybrid public-private frameworks, and enforcement models. The aim is to catalogue these measures in a structured way that makes them comparable across cases.`,
    ownerId: '1',
    collaboratorIds: [],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 11).toISOString(),
    aiLocked: false,
  },
  {
    id: 'doc3',
    title: 'Step 3: Extract Transferable Principles',
    content: `From the governance mechanisms, distill the core principles and strategies that could be adapted to your target technology. These may include norm-setting processes, stakeholder coordination structures, technical safeguards, and approaches to risk tiering. Focus on understanding why these principles worked (or failed) in their original context so you can assess their applicability.`,
    ownerId: '1',
    collaboratorIds: [],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 10).toISOString(),
    aiLocked: true,
  },
  {
    id: 'doc4',
    title: 'Step 4: Apply to Scenario Modelling',
    content: `Develop plausible future scenarios for your target technology—such as high-risk, low-risk, and internationally fragmented contexts—and embed the extracted governance principles into each scenario. Evaluate how well they fit, their potential impact, and any weaknesses or unintended effects. This step bridges historical insight with forward-looking policy thinking.`,
    ownerId: '1',
    collaboratorIds: [],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    aiLocked: false,
  },
  {
    id: 'doc5',
    title: 'Step 5: Perform Comparative Analysis',
    content: `Bring together the insights from multiple analogues and scenarios to identify recurring patterns, common success factors, and systematic weaknesses. Equally important, flag the limits of analogy—situations where differences in technology or context mean a governance approach will not translate effectively. This step sets the foundation for a unified strategic picture.`,
    ownerId: '1',
    collaboratorIds: [],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
    aiLocked: false,
  },
  {
    id: 'doc6',
    title: 'Step 6: Develop Recommendations',
    content: `Translate the comparative insights into a set of actionable governance proposals tailored to the target technology. These should balance innovation incentives with safety requirements, and include both short-term and long-term strategies. Recommendations should also specify measurable criteria for success, as well as clear responsible actors for implementation.`,
    ownerId: '1',
    collaboratorIds: [],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 10).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    aiLocked: false,
  },
  {
    id: 'doc7',
    title: 'Step 7: Synthesize and Harmonize',
    content: `Integrate all findings, analyses, and recommendations into a coherent, well-structured document that is accessible to the intended audience. Ensure consistency in definitions, terminology, and tone across sections. Include an executive summary or policy brief to facilitate rapid understanding by decision-makers.`,
    ownerId: '1',
    collaboratorIds: [],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    aiLocked: false,
  },
  {
    id: 'doc8',
    title: 'Step 8: Quality Assurance and Validation',
    content: `Before finalizing the work, conduct a thorough validation process. This includes fact-checking historical references, verifying the plausibility of scenarios, and stress-testing recommendations for real-world feasibility. Seek feedback from domain experts and revise based on their critique to ensure high reliability and credibility.`,
    ownerId: '1',
    collaboratorIds: [],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 1).toISOString(),
    aiLocked: false,
  },
  {
    id: 'doc9',
    title: 'Meta Step 9: Iteration and Refinement Loop',
    content: `Treat the process as cyclical rather than linear. If quality checks, expert feedback, or new data reveal gaps, outdated assumptions, or promising unexplored angles, return to the relevant earlier step(s) and refine the work. This loop ensures that the research remains adaptive to evolving technology landscapes, stakeholder input, and emerging risks over time.`,
    ownerId: '1',
    collaboratorIds: [],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
    updatedAt: new Date().toISOString(),
    aiLocked: false,
  },
];

const doc1_v0 = documents.find(d => d.id === 'doc1')!.content;
const doc1_v1 = doc1_v0.replace('The first stage', 'The initial phase');
const doc1_v2_ai = doc1_v1.replace('share similarities', 'have resemblances');
const doc1_v3_bob = doc1_v1.replace('risk profile, societal impact, pace of development, and geopolitical context', 'risk, impact, speed, and geopolitical factors');

const doc2_v0 = documents.find(d => d.id === 'doc2')!.content;
const doc2_v1_charlie = doc2_v0.replace('examine', 'analyze');

export const versions: Version[] = [
  {
    id: 'v1',
    parentId: 'root',
    documentId: 'doc1',
    editor: users[0], // Alice
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 11.5).toISOString(),
    contentBefore: doc1_v0,
    contentAfter: doc1_v1,
    summary: 'Rephrased the opening sentence.',
  },
  {
    id: 'v2',
    parentId: 'v1',
    documentId: 'doc1',
    editor: users[4], // AI
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 11).toISOString(),
    contentBefore: doc1_v1,
    contentAfter: doc1_v2_ai,
    summary: 'AI suggestion to improve wording.',
  },
  {
    id: 'v3',
    parentId: 'v1',
    documentId: 'doc1',
    editor: users[1], // Bob
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 10).toISOString(),
    contentBefore: doc1_v1,
    contentAfter: doc1_v3_bob,
    summary: 'Simplified the list of factors for brevity.',
  },
  {
    id: 'v4',
    parentId: 'root',
    documentId: 'doc2',
    editor: users[2], // Charlie
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 9).toISOString(),
    contentBefore: doc2_v0,
    contentAfter: doc2_v1_charlie,
    summary: 'Changed "examine" to "analyze" for a more formal tone.',
  },
];

export const tasks: Task[] = [
  {
    id: 'task1',
    documentId: 'doc1',
    title: 'Review historical analogues',
    assignee: users[1], // Bob
    status: 'In Progress',
    description: 'Check if the selected analogues are the most relevant ones.',
  },
  {
    id: 'task2',
    documentId: 'doc1',
    title: 'Fact-check timelines',
    assignee: users[2], // Charlie
    status: 'To Do',
    description: 'Verify the dates and timelines for the chosen analogues.',
  },
  {
    id: 'task3',
    documentId: 'doc3',
    title: 'Finalize transferable principles',
    assignee: users[0], // Alice
    status: 'Done',
    description: 'The principles have been extracted and are ready for review.',
  },
];
