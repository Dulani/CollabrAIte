export type User = {
  id: string;
  name: string;
  avatarUrl: string;
};

export type Document = {
  id: string;
  title: string;
  content: string;
  ownerId: string;
  collaboratorIds: string[];
  createdAt: string;
  updatedAt: string;
  aiLocked: boolean;
};

export type Version = {
  id: string;
  parentId: string; // ID of the parent version, 'root' for initial commits
  documentId: string;
  editor: User;
  timestamp: string;
  contentBefore: string;
  contentAfter: string;
  summary: string;
};

export type Task = {
  id: string;
  documentId: string;
  title: string;
  assignee: User;
  status: 'To Do' | 'In Progress' | 'Done';
  description: string;
};
