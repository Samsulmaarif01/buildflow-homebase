
export type ProjectStatus = "PLANNING" | "IN_PROGRESS" | "REVIEW" | "COMPLETED";

export type TeamMember = {
  id: string; // UUID string format
  name: string;
  role: string;
};

export type Location = {
  lat: number;
  lng: number;
  address: string;
};

export type Project = {
  id: string; // UUID string format
  title: string;
  client: string;
  location: Location;
  status: ProjectStatus;
  progress: number;
  description: string;
  startDate: string;
  endDate: string;
  team: TeamMember[];
  landArea?: string; // Optional field for land area (LT)
  buildingArea?: string; // Optional field for building area (LB)
};

export type TaskStatus = "TO_DO" | "IN_PROGRESS" | "REVIEW" | "DONE";

export type Task = {
  id: string; // UUID string format
  projectId: string; // UUID string format reference to Project
  title: string;
  description: string;
  assignee: TeamMember;
  status: string;
  dueDate: string;
};

export type DiscussionReply = {
  id: string; // UUID string format
  author: TeamMember;
  content: string;
  timestamp: string;
};

export type Discussion = {
  id: string; // UUID string format
  projectId: string; // UUID string format reference to Project
  author: TeamMember;
  content: string;
  timestamp: string;
  replies: DiscussionReply[];
};

// Utility function to generate UUIDs
export const generateUUID = (): string => {
  // Implementation of RFC4122 version 4 compliant UUID
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};
