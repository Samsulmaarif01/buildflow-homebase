
import React from "react";
import { Project } from "@/types";
import { format } from "date-fns";
import { Calendar, Users } from "lucide-react";
import ProjectMap from "./ProjectMap";
import ProjectProgress from "./ProjectProgress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ProjectDetailProps = {
  project: Project;
};

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project }) => {
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
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold md:text-3xl">{project.title}</h1>
          <p className="text-muted-foreground">Client: {project.client}</p>
        </div>
        {/* Status badge will now be shown in ProjectProgress component */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Project Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{project.description}</p>
            
            <div className="mt-4 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div className="text-sm">
                  <span className="font-medium">Timeline: </span>
                  <span>
                    {format(new Date(project.startDate), "MMM d, yyyy")} - {format(new Date(project.endDate), "MMM d, yyyy")}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <div className="text-sm">
                  <span className="font-medium">Team Size: </span>
                  <span>{project.team.length} members</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Location</CardTitle>
          </CardHeader>
          <CardContent>
            <ProjectMap location={project.location} />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Project Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <ProjectProgress team={project.team} />
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectDetail;
