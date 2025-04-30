
import React from "react";
import { TeamMember } from "@/types";
import { Progress } from "@/components/ui/progress";

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

const ProjectProgress: React.FC<ProjectProgressProps> = ({ team }) => {
  //this data would come from a backend
  const memberProgress = team.map(member => ({
    member,
    progress: Math.floor(Math.random() * 100)
  }));

  return (
    <div className="space-y-4">
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
