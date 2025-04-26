
import React from "react";
import { Link } from "react-router-dom";
import { Project } from "@/types";
import { formatDistanceToNow } from "date-fns";

type ProjectCardProps = {
  project: Project;
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const getStatusColor = (status: string) => {
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
    <Link
      to={`/project/${project.id}`}
      className="card-hover block rounded-lg border border-border bg-card p-5 shadow-sm"
    >
      <div className="mb-3 flex items-center justify-between">
        <span
          className={`status-badge ${getStatusColor(project.status)}`}
        >
          {project.status.replace("_", " ")}
        </span>
        <span className="text-sm text-muted-foreground">
          {formatDistanceToNow(new Date(project.endDate), { addSuffix: true })}
        </span>
      </div>

      <h3 className="mb-1 text-lg font-semibold">{project.title}</h3>
      <p className="mb-3 text-sm text-muted-foreground">
        Client: {project.client}
      </p>

      <div className="mb-4">
        <div className="flex items-center justify-between text-xs mb-1">
          <span>Progress</span>
          <span className="font-medium">{project.progress}%</span>
        </div>
        <div className="progress-bar" style={{ "--progress-width": `${project.progress}%` } as React.CSSProperties} />
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex -space-x-2">
          {project.team.slice(0, 3).map((member, idx) => (
            <div
              key={idx}
              className="relative h-8 w-8 rounded-full bg-primary text-xs font-medium text-primary-foreground flex items-center justify-center border-2 border-background"
              title={`${member.name} (${member.role})`}
            >
              {member.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
          ))}
          {project.team.length > 3 && (
            <div className="relative h-8 w-8 rounded-full bg-muted text-xs font-medium text-muted-foreground flex items-center justify-center border-2 border-background">
              +{project.team.length - 3}
            </div>
          )}
        </div>
        <span className="text-xs text-muted-foreground">
          {project.location.address}
        </span>
      </div>
    </Link>
  );
};

export default ProjectCard;
