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
    title: 'Project Phoenix: Q3 Strategy',
    content: `Project Phoenix: Q3 Strategy

Introduction
This document outlines the strategic initiatives for Project Phoenix for the third quarter. Our primary focus is on market expansion and product innovation.

1. Market Expansion
- Target new demographic in the APAC region.
- Launch localized marketing campaigns.
- Establish partnerships with regional distributors.

2. Product Innovation
- Develop and integrate AI-powered features.
- Enhance user interface based on feedback from Q2.
- Begin R&D for version 3.0.

3. Financial Projections
- [Placeholder for financial data]

Conclusion
By focusing on these key areas, we aim to achieve a 20% growth in user acquisition and a 15% increase in revenue for Q3.`,
    ownerId: '1',
    collaboratorIds: ['2', '3'],
    createdAt: '2024-07-28T10:00:00Z',
    updatedAt: '2024-07-29T14:30:00Z',
  },
  {
    id: 'doc2',
    title: 'Team Onboarding Manual',
    content: `Welcome to the team! This manual will guide you through the onboarding process.`,
    ownerId: '2',
    collaboratorIds: ['1'],
    createdAt: '2024-07-25T09:00:00Z',
    updatedAt: '2024-07-25T09:00:00Z',
  },
  {
    id: 'doc3',
    title: 'Meeting Notes - 2024-07-22',
    content: `Attendees: Alice, Bob. Discussion points: Q3 roadmap, budget allocation.`,
    ownerId: '1',
    collaboratorIds: ['2'],
    createdAt: '2024-07-22T11:00:00Z',
    updatedAt: '2024-07-22T11:45:00Z',
  },
];

export const versions: Version[] = [
    {
        id: 'v1',
        documentId: 'doc1',
        editor: users.find(u => u.id === '2')!,
        timestamp: '2024-07-29T11:05:00Z',
        summary: 'Added details to market expansion section.',
        contentBefore: `1. Market Expansion
- Target new demographic.
- Launch marketing campaigns.`,
        contentAfter: `1. Market Expansion
- Target new demographic in the APAC region.
- Launch localized marketing campaigns.
- Establish partnerships with regional distributors.`
    },
    {
        id: 'v2',
        documentId: 'doc1',
        editor: users.find(u => u.id === 'ai')!,
        timestamp: '2024-07-29T12:20:00Z',
        summary: 'Reworded introduction for clarity and impact.',
        contentBefore: `Introduction
This document is for Project Phoenix for the third quarter.`,
        contentAfter: `Introduction
This document outlines the strategic initiatives for Project Phoenix for the third quarter. Our primary focus is on market expansion and product innovation.`
    },
    {
        id: 'v3',
        documentId: 'doc1',
        editor: users.find(u => u.id === '3')!,
        timestamp: '2024-07-29T14:30:00Z',
        summary: 'Added R&D point to product innovation.',
        contentBefore: `2. Product Innovation
- Develop and integrate AI-powered features.
- Enhance user interface based on feedback from Q2.`,
        contentAfter: `2. Product Innovation
- Develop and integrate AI-powered features.
- Enhance user interface based on feedback from Q2.
- Begin R&D for version 3.0.`
    }
];


export const tasks: Task[] = [
  {
    id: 'task1',
    documentId: 'doc1',
    title: 'Flesh out financial projections',
    description: 'Please add the estimated budget and revenue forecasts for the APAC expansion.',
    assignee: users.find(u => u.id === '3')!,
    status: 'In Progress',
  },
  {
    id: 'task2',
    documentId: 'doc1',
    title: 'Review product innovation section',
    description: 'Check if the AI features listed are feasible within the Q3 timeframe.',
    assignee: users.find(u => u.id === '2')!,
    status: 'To Do',
  },
   {
    id: 'task3',
    documentId: 'doc1',
    title: 'Finalize Q3 Strategy',
    description: 'Perform a final review of the entire document for clarity, consistency, and completeness.',
    assignee: users.find(u => u.id === '1')!,
    status: 'To Do',
  },
];
