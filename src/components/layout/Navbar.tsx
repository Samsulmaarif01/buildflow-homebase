
import React from "react";
import { Menu, Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import NewProjectDialog from "@/components/project/NewProjectDialog";
import { Project } from "@/types";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

type NavbarProps = {
  toggleSidebar: () => void;
};

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const handleProjectCreate = (newProject: Project) => {
    // In a real app, you'd likely dispatch this to a state management system 
    // or send it to an API. For now, we'll just log it.
    console.log("New Project Created:", newProject);
    // You could also update the projects list in your data source
  };

  return (
    <header className="sticky top-0 z-10 border-b border-border bg-background">
      <div className="flex h-16 items-center px-4 md:px-6">
        <Button
          variant="ghost"
          size="icon"
          className="mr-2 md:hidden"
          onClick={toggleSidebar}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>

        <div className="hidden md:flex md:flex-1">
          <h1 className="text-xl font-semibold">Project Dashboard</h1>
        </div>

        <div className="relative hidden flex-1 md:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search projects..."
            className="w-full rounded-md border border-input bg-background pl-8 pr-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <ThemeToggle />
          <Button variant="outline" size="icon">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Notifications</span>
          </Button>
          <NewProjectDialog onProjectCreate={handleProjectCreate} />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
