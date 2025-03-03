
import { useState } from "react";
import { Link, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  LayoutDashboard,
  MessageSquare,
  Settings,
  Users,
  Database,
  Home,
  ChevronLeft,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { DashboardGeneral } from "@/components/dashboard/DashboardGeneral";
import { DashboardMessages } from "@/components/dashboard/DashboardMessages";
import { DashboardSettings } from "@/components/dashboard/DashboardSettings";
import { DashboardUsers } from "@/components/dashboard/DashboardUsers";
import { DashboardData } from "@/components/dashboard/DashboardData";

const DashboardPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 border-b bg-background/90 backdrop-blur-md sticky top-0 z-20">
        <div className="flex items-center">
          <Link to="/">
            <Button variant="ghost" size="icon" className="mr-2">
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="font-bold text-lg">Dashboard</h1>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Sidebar for Mobile (Overlay) */}
      <div 
        className={cn(
          "fixed inset-0 bg-background/80 backdrop-blur-sm z-20 md:hidden transition-opacity duration-200",
          isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={closeSidebar}
      />

      {/* Sidebar */}
      <aside 
        className={cn(
          "bg-card text-card-foreground border-r w-64 flex flex-col transition-transform duration-200 ease-in-out md:relative fixed inset-y-0 left-0 z-30 md:translate-x-0",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-4 border-b">
          <h2 className="font-semibold text-xl flex items-center">
            <LayoutDashboard className="mr-2 h-5 w-5" />
            AI Chat Admin
          </h2>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          <DashboardLink 
            to="/dashboard" 
            icon={<LayoutDashboard className="h-5 w-5" />} 
            label="Overview" 
            active={isActive("/dashboard") && location.pathname === "/dashboard"} 
            onClick={closeSidebar}
          />
          <DashboardLink 
            to="/dashboard/messages" 
            icon={<MessageSquare className="h-5 w-5" />} 
            label="Messages" 
            active={isActive("/dashboard/messages")} 
            onClick={closeSidebar}
          />
          <DashboardLink 
            to="/dashboard/users" 
            icon={<Users className="h-5 w-5" />} 
            label="Users" 
            active={isActive("/dashboard/users")} 
            onClick={closeSidebar}
          />
          <DashboardLink 
            to="/dashboard/data" 
            icon={<Database className="h-5 w-5" />} 
            label="Data" 
            active={isActive("/dashboard/data")} 
            onClick={closeSidebar}
          />
          <DashboardLink 
            to="/dashboard/settings" 
            icon={<Settings className="h-5 w-5" />} 
            label="Settings" 
            active={isActive("/dashboard/settings")} 
            onClick={closeSidebar}
          />
        </nav>
        
        <div className="p-4 border-t mt-auto">
          <Link to="/" onClick={closeSidebar}>
            <Button variant="outline" className="w-full justify-start">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen max-w-full">
        {/* Desktop Header */}
        <header className="hidden md:flex items-center justify-between p-4 border-b bg-background/90 backdrop-blur-md sticky top-0 z-10">
          <h1 className="font-bold text-xl">Dashboard</h1>
          <div className="flex items-center gap-2">
            <Link to="/chat">
              <Button variant="outline" size="sm">
                <MessageSquare className="mr-2 h-4 w-4" />
                Chat
              </Button>
            </Link>
          </div>
        </header>

        {/* Mobile Tabs Navigation */}
        <div className="md:hidden px-4 py-2 border-b sticky top-[57px] bg-background/90 backdrop-blur-sm z-10">
          <Tabs 
            defaultValue="/dashboard" 
            value={
              location.pathname === "/dashboard" 
                ? "/dashboard" 
                : location.pathname
            }
            onValueChange={(value) => {
              navigate(value);
              closeSidebar();
            }}
            className="w-full"
          >
            <TabsList className="w-full justify-between">
              <TabsTrigger value="/dashboard" className="flex-1">
                <LayoutDashboard className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger value="/dashboard/messages" className="flex-1">
                <MessageSquare className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger value="/dashboard/users" className="flex-1">
                <Users className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger value="/dashboard/data" className="flex-1">
                <Database className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger value="/dashboard/settings" className="flex-1">
                <Settings className="h-4 w-4" />
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-4 md:p-6 overflow-auto animate-fade-in">
          <Routes>
            <Route path="/" element={<DashboardGeneral />} />
            <Route path="/messages" element={<DashboardMessages />} />
            <Route path="/users" element={<DashboardUsers />} />
            <Route path="/data" element={<DashboardData />} />
            <Route path="/settings" element={<DashboardSettings />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

interface DashboardLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const DashboardLink = ({ to, icon, label, active, onClick }: DashboardLinkProps) => {
  return (
    <Link to={to} onClick={onClick}>
      <div
        className={cn(
          "flex items-center py-2 px-3 rounded-md text-sm font-medium transition-colors",
          active
            ? "bg-primary/10 text-primary"
            : "text-muted-foreground hover:text-foreground hover:bg-accent"
        )}
      >
        <span className="mr-3">{icon}</span>
        {label}
      </div>
    </Link>
  );
};

export default DashboardPage;
