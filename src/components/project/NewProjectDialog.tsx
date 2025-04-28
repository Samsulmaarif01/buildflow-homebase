
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Project, TeamMember, Location, generateUUID, ProjectStatus } from "@/types";
import { format } from "date-fns";
import { toast } from "sonner";
import { Plus, MapPin, User } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProjectMap from "./ProjectMap";

type NewProjectDialogProps = {
  onProjectCreate?: (project: Project) => void;
};

const TeamMembers = [
  { id: "1", name: "John Smith", role: "Project Manager" },
  { id: "2", name: "Sarah Johnson", role: "Architect" },
  { id: "3", name: "Mike Chen", role: "Civil Engineer" },
  { id: "4", name: "Emma Davis", role: "Electrical Engineer" },
  { id: "5", name: "Tom Wilson", role: "Mechanical Engineer" },
  { id: "6", name: "Diana Rodriguez", role: "Interior Designer" }
];

const NewProjectDialog: React.FC<NewProjectDialogProps> = ({ onProjectCreate }) => {
  const navigate = useNavigate();
  const [projectData, setProjectData] = useState({
    title: "",
    client: "",
    landArea: "",
    buildingArea: "",
    description: "",
    status: "PLANNING" as ProjectStatus,
    startDate: format(new Date(), "yyyy-MM-dd"),
    endDate: format(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), "yyyy-MM-dd"), // 30 days from now
  });

  const [location, setLocation] = useState<Location>({
    lat: -6.1754,
    lng: 106.8272,
    address: "Jakarta, Indonesia" // Default location
  });

  const [selectedTeamMembers, setSelectedTeamMembers] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProjectData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleStatusChange = (value: string) => {
    setProjectData(prev => ({
      ...prev,
      status: value as ProjectStatus
    }));
  };

  const handleTeamMemberToggle = (memberId: string) => {
    setSelectedTeamMembers(prev => {
      if (prev.includes(memberId)) {
        return prev.filter(id => id !== memberId);
      } else {
        return [...prev, memberId];
      }
    });
  };

  const handleCreateProject = () => {
    // Validate inputs
    if (!projectData.title || !projectData.client) {
      toast.error("Please fill in all required fields");
      return;
    }

    const selectedMembers = TeamMembers.filter(member => 
      selectedTeamMembers.includes(member.id)
    );

    // Create new project
    const newProject: Project = {
      id: generateUUID(),
      ...projectData,
      location: location,
      progress: 0,
      team: selectedMembers.length > 0 ? selectedMembers : [{
        id: generateUUID(),
        name: "Project Owner",
        role: "Project Manager"
      }],
    };

    // Call the create handler if provided
    onProjectCreate?.(newProject);

    // Show success toast
    toast.success(`Project "${newProject.title}" created successfully`);
    
    // Close the dialog
    setOpen(false);
    
    // Navigate to the dashboard (if not already there)
    navigate("/");
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> New Project
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-3xl overflow-y-auto max-h-[90vh]">
        <AlertDialogHeader>
          <AlertDialogTitle>Create New Project</AlertDialogTitle>
          <AlertDialogDescription>
            Fill in the project details below. Required fields are marked with an asterisk (*).
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Project Title *
            </Label>
            <Input
              id="title"
              name="title"
              placeholder="Enter project name"
              className="col-span-3"
              value={projectData.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="client" className="text-right">
              Client *
            </Label>
            <Input
              id="client"
              name="client"
              placeholder="Enter client name"
              className="col-span-3"
              value={projectData.client}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="landArea" className="text-right">
              Land Area (LT)
            </Label>
            <Input
              id="landArea"
              name="landArea"
              placeholder="e.g., 200 m²"
              className="col-span-3"
              value={projectData.landArea}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="buildingArea" className="text-right">
              Building Area (LB)
            </Label>
            <Input
              id="buildingArea"
              name="buildingArea"
              placeholder="e.g., 150 m²"
              className="col-span-3"
              value={projectData.buildingArea}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="description" className="text-right pt-2">
              Description
            </Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Project description"
              className="col-span-3 min-h-[100px]"
              value={projectData.description}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Project Status
            </Label>
            <Select
              value={projectData.status}
              onValueChange={handleStatusChange}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PLANNING">Planning</SelectItem>
                <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                <SelectItem value="REVIEW">Review</SelectItem>
                <SelectItem value="COMPLETED">Completed</SelectItem>
              </SelectContent>
            </Select>
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
          
          <div className="grid grid-cols-4 items-start gap-4">
            <Label className="text-right pt-2">
              Location
            </Label>
            <div className="col-span-3 h-[200px] rounded-md border overflow-hidden">
              <ProjectMap location={location} />
            </div>
          </div>
          
          <div className="grid grid-cols-4 items-start gap-4">
            <Label className="text-right pt-2">
              Team Members
            </Label>
            <div className="col-span-3 space-y-2">
              {TeamMembers.map((member) => (
                <div
                  key={member.id}
                  className={`flex items-center gap-2 p-2 rounded-md cursor-pointer border ${
                    selectedTeamMembers.includes(member.id)
                      ? "bg-primary/10 border-primary"
                      : "bg-background border-input"
                  }`}
                  onClick={() => handleTeamMemberToggle(member.id)}
                >
                  <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                    <User className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-medium">{member.name}</p>
                    <p className="text-xs text-muted-foreground">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleCreateProject}>Create Project</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default NewProjectDialog;
