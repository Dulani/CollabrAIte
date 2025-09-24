# CollabrAIte

CollabrAIte is a modern, collaborative document editing platform designed to streamline the writing and review process. It leverages AI to provide intelligent suggestions and features a unique version control system that visualizes the evolution of a document.

## Features

- **Structured Document Editing**: Work on documents within a guided, step-by-step workflow.
- **AI-Powered Suggestions**: Get intelligent feedback from an integrated AI assistant to improve your writing.
- **AI Contribution Control**: Easily lock or unlock AI-based changes on a per-document basis.
- **Visual Diff Graph**: Explore the complete version history of your documents in an intuitive, top-to-bottom branching graph.
- **Flexible History View**: Toggle between viewing the history of individual documents or a concatenated view of all documents combined.
- **Component-Based UI**: Built with modern, reusable React components for a clean and maintainable codebase.

## Technology Stack

- **Framework**: [Next.js](https://nextjs.org/) (with App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/)
- **AI Integration**: [Genkit](https://firebase.google.com/docs/genkit)
- **Deployment**: Firebase App Hosting

## Getting Started

Follow these instructions to get the project up and running on your local machine for development and testing.

### Prerequisites

- [Node.js](https://nodejs.org/) (v20 or later)
- [npm](https://www.npmjs.com/)

### Installation

1. Clone the repository to your local machine.
2. Install the necessary packages:
   ```bash
   npm install
   ```

### Running the Application

This project requires two separate processes to run concurrently in development: the Next.js frontend and the Genkit AI server.

1. **Start the Next.js development server:**
   ```bash
   npm run dev
   ```
   Your application will be available at `http://localhost:9002`.

2. **Start the Genkit development server:**
   In a separate terminal, run the following command to start the Genkit server, which powers the AI features. The `--watch` flag will automatically restart the server when you make changes to your AI flows.
   ```bash
   npm run genkit:watch
   ```

This provides a solid foundation for any new developer joining the project. What would you like to work on next?