import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Boxes, 
  BarChart3, 
  Users, 
  FileSpreadsheet, 
  Settings, 
  LogOut, 
  Menu, 
  MessageSquareMore 
} from "lucide-react";

interface NavLinkProps {
  to: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  isCollapsed: boolean;
  isActive: boolean;
}

export default function Sidebar() {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Check if the current path matches or starts with the given path
  const isActive = (path: string): boolean => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <div
      className={`relative h-screen border-r pt-16 bg-white dark:bg-gray-900 transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      <div className="absolute right-0 top-6 flex h-6 w-6 -translate-x-1/2 translate-y-2 items-center justify-center rounded-full border bg-white dark:bg-gray-900">
        <button 
          className="h-4 w-4 flex items-center justify-center bg-transparent border-none cursor-pointer" 
          onClick={toggleSidebar}
        >
          <Menu className="h-4 w-4" />
          <span className="sr-only">Toggle Sidebar</span>
        </button>
      </div>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="mt-3 space-y-1">
            <NavLink
              to="/dashboard/u"
              icon={BarChart3}
              title="Dashboard"
              isCollapsed={isCollapsed}
              isActive={isActive("/dashboard/u")}
            />
            <NavLink
              to="/dashboard/campaigns"
              icon={Boxes}
              title="Campaigns"
              isCollapsed={isCollapsed}
              isActive={isActive("/campaigns")}
            />
            <NavLink
              to="/dashboard/linkedin-message"
              icon={MessageSquareMore}
              title="LinkedIn Message"
              isCollapsed={isCollapsed}
              isActive={isActive("/linkedin-message")}
            />
            <NavLink
              to="/leads"
              icon={Users}
              title="Leads"
              isCollapsed={isCollapsed}
              isActive={isActive("/leads")}
            />
            <NavLink
              to="/reports"
              icon={FileSpreadsheet}
              title="Reports"
              isCollapsed={isCollapsed}
              isActive={isActive("/reports")}
            />
          </div>
        </div>
        <div className="px-3 py-2">
          <div className="mt-3 space-y-1">
            <NavLink
              to="/settings"
              icon={Settings}
              title="Settings"
              isCollapsed={isCollapsed}
              isActive={isActive("/settings")}
            />
            <button 
              className={`flex items-center rounded-lg px-3 py-2 text-sm transition-all hover:text-blue-600 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 w-full ${
                isCollapsed ? "px-2 justify-center" : ""
              }`}
              onClick={() => alert("Logout functionality to be implemented")}
            >
              <LogOut className="h-4 w-4" />
              {!isCollapsed && <span className="ml-2 font-medium">Logout</span>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function NavLink({ to, icon: Icon, title, isCollapsed, isActive }: NavLinkProps) {
  return (
    <Link
      to={to}
      className={`flex items-center rounded-lg px-3 py-2 text-sm transition-all hover:text-blue-600 
      ${isActive 
        ? "bg-blue-50 dark:bg-gray-800 text-blue-600 shadow-sm" 
        : "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"}
      ${isCollapsed ? "px-2 justify-center" : ""}`}
    >
      <Icon className={`h-4 w-4 ${isActive ? "text-blue-600" : ""}`} />
      {!isCollapsed && <span className="ml-2 font-medium">{title}</span>}
    </Link>
  );
}