
import React from "react";
import { Link } from "react-router-dom";
import { Kanban, ListCheck, Calendar, Users, FolderOpen } from "lucide-react";

type SidebarProps = {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
};

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, toggleSidebar }) => {
  const sidebarClasses = isSidebarOpen
    ? "translate-x-0"
    : "-translate-x-full md:translate-x-0";

  const menuItems = [
    { icon: <ListCheck size={20} />, label: "Dashboard", path: "/" },
    { icon: <Kanban size={20} />, label: "Kanban Board", path: "/" },
    { icon: <Calendar size={20} />, label: "Timeline", path: "/" },
    { icon: <Users size={20} />, label: "Team", path: "/" },
    { icon: <FolderOpen size={20} />, label: "Files", path: "/" },
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
            <span className="text-2xl font-bold text-primary">BuildFlow</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-3 py-4">
            {menuItems.map((item, idx) => (
              <Link
                key={idx}
                to={item.path}
                className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <span className="mr-3 text-sidebar-foreground">{item.icon}</span>
                {item.label}
              </Link>
            ))}
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
