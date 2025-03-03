
import { Home, MessageSquare, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface MobileNavigationProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export function MobileNavigation({ isOpen, setIsOpen }: MobileNavigationProps) {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden border-t bg-background/80 backdrop-blur-md">
      <nav className="flex justify-around items-center py-2">
        <NavItem 
          to="/" 
          label="Home" 
          icon={<Home className="h-5 w-5" />} 
          active={isActive("/")} 
        />
        <NavItem 
          to="/chat" 
          label="Chat" 
          icon={<MessageSquare className="h-5 w-5" />} 
          active={isActive("/chat")} 
        />
        <NavItem 
          to="/dashboard" 
          label="Dashboard" 
          icon={<Settings className="h-5 w-5" />} 
          active={location.pathname.startsWith("/dashboard")} 
        />
      </nav>
    </div>
  );
}

interface NavItemProps {
  to: string;
  label: string;
  icon: React.ReactNode;
  active: boolean;
}

function NavItem({ to, label, icon, active }: NavItemProps) {
  return (
    <Link 
      to={to} 
      className={cn(
        "flex flex-col items-center justify-center px-4 py-2 rounded-md transition-colors",
        active ? "text-primary" : "text-muted-foreground"
      )}
    >
      {icon}
      <span className="text-xs mt-1">{label}</span>
    </Link>
  );
}
