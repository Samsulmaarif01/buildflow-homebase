
import React from "react";
import { Project } from "@/types";
import ProjectCard from "./ProjectCard";

type ProjectGridProps = {
  projects: Project[];
};

const ProjectGrid: React.FC<ProjectGridProps> = ({ projects }) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};

export default ProjectGrid;
