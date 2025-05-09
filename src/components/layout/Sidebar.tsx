
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Kanban, ListCheck, Calendar, Users, FolderOpen } from "lucide-react";


type SidebarProps = {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
};

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, toggleSidebar }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  const sidebarClasses = isSidebarOpen
    ? "translate-x-0"
    : "-translate-x-full md:translate-x-0";

  const menuItems = [
    { icon: <ListCheck size={20} />, label: "Dashboard", path: "/" },
    { icon: <Kanban size={20} />, label: "Kanban Board", path: "/kanban" },
    { icon: <Calendar size={20} />, label: "Timeline", path: "/timeline" },
    { icon: <Users size={20} />, label: "Team", path: "/team" },
    { icon: <FolderOpen size={20} />, label: "Files", path: "/files" },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-30 h-full w-64 transform bg-sidebar transition-transform duration-300 ease-in-out md:relative md:z-0 ${sidebarClasses}`}
      >
        <div className="flex h-full flex-col border-r border-border">
          {/* Logo */}
          <div className="flex h-16 items-center justify-center border-b border-border px-6">
            <span className="text-2xl font-bold text-primary">RHI Build</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-3 py-4">
            {menuItems.map((item, idx) => {
              const isActive = currentPath === item.path;
              return (
                <Link
                  key={idx}
                  to={item.path}
                  className={`flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  }`}
                  onClick={() => {
                    if (window.innerWidth < 768) {
                      toggleSidebar();
                    }
                  }}
                >
                  <span className={`mr-3 ${isActive ? "text-sidebar-accent-foreground" : "text-sidebar-foreground"}`}>
                    {item.icon}
                  </span>
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* User info */}
          <div className="border-t border-border p-4">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-primary" />
              <div>
                <p className="text-sm font-medium">Admin User</p>
                <p className="text-xs text-muted-foreground">Project Manager</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
