
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Project, TeamMember, Location, generateUUID } from "@/types";
import { format } from "date-fns";
import { toast } from "sonner";
import { Plus } from "lucide-react";

type NewProjectDialogProps = {
  onProjectCreate?: (project: Project) => void;
};

const NewProjectDialog: React.FC<NewProjectDialogProps> = ({ onProjectCreate }) => {
  const [projectData, setProjectData] = useState({
    title: "",
    client: "",
    description: "",
    startDate: format(new Date(), "yyyy-MM-dd"),
    endDate: format(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), "yyyy-MM-dd"), // 30 days from now
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProjectData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCreateProject = () => {
    // Validate inputs
    if (!projectData.title || !projectData.client) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Create a default location and team
    const defaultLocation: Location = {
      lat: 0,
      lng: 0,
      address: "Not specified"
    };

    const defaultTeamMember: TeamMember = {
      id: generateUUID(),
      name: "Project Owner",
      role: "Project Manager"
    };

    const newProject: Project = {
      id: generateUUID(),
      ...projectData,
      location: defaultLocation,
      status: "PLANNING",
      progress: 0,
      team: [defaultTeamMember],
    };

    // Call the create handler if provided
    onProjectCreate?.(newProject);

    // Show success toast
    toast.success(`Project "${newProject.title}" created successfully`);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> New Project
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Project Title
            </Label>
            <Input
              id="title"
              name="title"
              placeholder="Enter project name"
              className="col-span-3"
              value={projectData.title}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="client" className="text-right">
              Client
            </Label>
            <Input
              id="client"
              name="client"
              placeholder="Enter client name"
              className="col-span-3"
              value={projectData.client}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input
              id="description"
              name="description"
              placeholder="Project description"
              className="col-span-3"
              value={projectData.description}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="startDate" className="text-right">
              Start Date
            </Label>
            <Input
              id="startDate"
              name="startDate"
              type="date"
              className="col-span-3"
              value={projectData.startDate}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="endDate" className="text-right">
              End Date
            </Label>
            <Input
              id="endDate"
              name="endDate"
              type="date"
              className="col-span-3"
              value={projectData.endDate}
              onChange={handleInputChange}
            />
          </div>
        </div>
        
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
          <Button onClick={handleCreateProject}>Create Project</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewProjectDialog;
