
import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Project } from "@/types";

type LayoutProps = {
  children: React.ReactNode;
  searchTerm?: string;
  onSearchChange?: (term: string) => void;
  onProjectAdd?: (project: Project) => void;
};

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  searchTerm, 
  onSearchChange,
  onProjectAdd
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col">
        <Navbar 
          toggleSidebar={toggleSidebar} 
          searchTerm={searchTerm}
          onSearchChange={onSearchChange}
          onProjectAdd={onProjectAdd}
        />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="mx-auto w-full max-w-6xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
