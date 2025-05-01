
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, Bell, Search, LogIn, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import NewProjectDialog from "@/components/project/NewProjectDialog";
import { Project } from "@/types";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/use-toast";

type NavbarProps = {
  toggleSidebar: () => void;
  searchTerm?: string;
  onSearchChange?: (term: string) => void;
  onProjectAdd?: (project: Project) => void;
};

const Navbar: React.FC<NavbarProps> = ({ 
  toggleSidebar, 
  searchTerm = "", 
  onSearchChange = () => {}, 
  onProjectAdd = () => {} 
}) => {
  const navigate = useNavigate();
  const { currentUser, logout, isAuthenticated } = useAuth();
  const { toast } = useToast();

  const handleProjectCreate = (newProject: Project) => {
    // Add the new project to the dashboard
    onProjectAdd(newProject);
    
    toast({
      title: "Project created",
      description: `${newProject.title} has been created successfully`,
    });
    
    // Navigate to the dashboard
    navigate("/");
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
    navigate("/login");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
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
          <h1 className="text-xl font-semibold">Project Management</h1>
        </div>

        <div className="relative hidden flex-1 md:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search projects..."
            className="w-full rounded-md border border-input bg-background pl-8 pr-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <ThemeToggle />
          <Button variant="outline" size="icon">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Notifications</span>
          </Button>
          
          {isAuthenticated ? (
            <>
              <span className="hidden text-sm md:inline-block">
                {currentUser?.name} ({currentUser?.role === "1" ? "Admin" : currentUser?.role === "2" ? "Project Manager" : "Team Member"})
              </span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-1" />
                Logout
              </Button>
            </>
          ) : (
            <Button variant="outline" size="sm" onClick={handleLogin}>
              <LogIn className="h-4 w-4 mr-1" />
              Login
            </Button>
          )}
          
          <NewProjectDialog onProjectCreate={handleProjectCreate} />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
