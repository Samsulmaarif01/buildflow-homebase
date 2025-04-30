
import React from "react";
import { TeamMember, ProjectStatus } from "@/types";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

type MemberProgressProps = {
  member: TeamMember;
  progress: number;
};

const MemberProgress: React.FC<MemberProgressProps> = ({ member, progress }) => {
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-1">
        <div>
          <span className="font-medium text-sm">{member.name}</span>
          <p className="text-xs text-muted-foreground">{member.role}</p>
        </div>
        <span className="text-sm font-medium">{progress}%</span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );
};

type ProjectProgressProps = {
  team: TeamMember[];
};

export type ProjectStatusInfo = {
  status: ProjectStatus;
  progress: number;
}

const ProjectProgress: React.FC<ProjectProgressProps> = ({ team }) => {
  //this data would come from a backend
  const memberProgress = team.map(member => ({
    member,
    progress: Math.floor(Math.random() * 100)
  }));
  
  // Calculate overall project progress based on team members' progress
  const overallProgress = memberProgress.length > 0
    ? Math.round(memberProgress.reduce((sum, mp) => sum + mp.progress, 0) / memberProgress.length)
    : 0;
  
  // Determine project status based on team members' progress
  const getProjectStatus = (): ProjectStatus => {
    if (memberProgress.length === 0) return "PLANNING";
    
    // If all members are at 100%, project is completed
    const allCompleted = memberProgress.every(mp => mp.progress === 100);
    if (allCompleted) return "COMPLETED";
    
    // If any member has started (progress > 0), project is in progress
    const anyStarted = memberProgress.some(mp => mp.progress > 0);
    if (anyStarted) return "IN_PROGRESS";
    
    // Default state is planning
    return "PLANNING";
  };
  
  const projectStatus = getProjectStatus();
  
  const getStatusColor = (status: ProjectStatus): string => {
    switch (status) {
      case "PLANNING":
        return "bg-sky-100 text-sky-800";
      case "IN_PROGRESS":
        return "bg-amber-100 text-amber-800";
      case "REVIEW":
        return "bg-purple-100 text-purple-800";
      case "COMPLETED":
        return "bg-emerald-100 text-emerald-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium">Overall Progress</span>
          <div className="flex items-center gap-2">
            <Badge className={getStatusColor(projectStatus)}>
              {projectStatus.replace("_", " ")}
            </Badge>
            <span className="text-sm font-medium">{overallProgress}%</span>
          </div>
        </div>
        <Progress value={overallProgress} className="h-2" />
      </div>
      
      <h3 className="font-semibold mb-2">Team Progress</h3>
      <div>
        {memberProgress.map((mp, idx) => (
          <MemberProgress 
            key={idx} 
            member={mp.member} 
            progress={mp.progress} 
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectProgress;
