# **App Name**: CollabrAIte

## Core Features:

- User Authentication: Secure user authentication and authorization to ensure only authorized users can access and modify documents.
- Document Management: Users can create, edit, and manage documents, storing the content (and revisions) on the local disk of the Nextjs server instance.
- Collaborative Editing: Enable real-time collaborative editing with multiple users, each having their own cursor and view of the document. Use operational transforms to avoid the need for database synchronization.
- AI-Powered Suggestion Tool: An LLM (Gemini) acts as a collaborative editor, providing suggestions and edits.  It takes user requests, and selectively incorporates changes according to those user requests. This feature uses reasoning to decide when or if to incorporate a suggested edit.
- Version History: Maintain a detailed version history of each document, allowing users to revert to previous versions, view diffs, and track changes over time.
- Task Assignment: Assign specific tasks related to the document to different users. Tasks can be defined as instructions that are related to specific parts of the text (text ranges), with a defined set of allowable LLM "tool" categories for assistance.
- Diff Display: Visually represent the changes proposed by each user (and LLM), allowing for easy comparison and acceptance/rejection of modifications.  Render the edits as an edit graph similar to https://google-research.github.io/score/172492931_study.html

## Style Guidelines:

- Primary color: Electric Blue (#7DF9FF), a vibrant and modern hue evoking innovation and collaboration.
- Background color: Light gray (#E0E0E0), providing a clean and neutral backdrop for the text.
- Accent color: Deep Purple (#6A0DAD), used for interactive elements and to draw attention to key features.
- Body and headline font: 'Inter', a sans-serif font offering a modern, machined look suitable for both headlines and body text.
- Use clean, geometric icons to represent actions like 'edit,' 'save,' 'history,' and 'AI suggestion'.
- Employ a clean, modular layout with clearly defined sections for document content, user tasks, and version history.
- Incorporate subtle animations to highlight user actions and provide feedback on editing suggestions and LLM integration.