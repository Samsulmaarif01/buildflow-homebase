
export type ProjectStatus = "PLANNING" | "IN_PROGRESS" | "REVIEW" | "COMPLETED";

export type TeamMember = {
  id: string;
  name: string;
  role: string;
};

export type Location = {
  lat: number;
  lng: number;
  address: string;
};

export type Project = {
  id: string;
  title: string;
  client: string;
  location: Location;
  status: ProjectStatus;
  progress: number;
  description: string;
  startDate: string;
  endDate: string;
  team: TeamMember[];
};

export type TaskStatus = "TO_DO" | "IN_PROGRESS" | "REVIEW" | "DONE";

export type Task = {
  id: string;
  projectId: string;
  title: string;
  description: string;
  assignee: TeamMember;
  status: string;
  dueDate: string;
};

export type DiscussionReply = {
  id: string;
  author: TeamMember;
  content: string;
  timestamp: string;
};

export type Discussion = {
  id: string;
  projectId: string;
  author: TeamMember;
  content: string;
  timestamp: string;
  replies: DiscussionReply[];
};
