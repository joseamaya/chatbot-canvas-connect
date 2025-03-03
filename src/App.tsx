
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

// Pages
import LandingPage from "./pages/LandingPage";
import ChatPage from "./pages/ChatPage";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";

// Context
import { ChatContextProvider } from "./contexts/ChatContext";
import { AuthProvider } from "./contexts/AuthContext";

// Components
import { MobileNavigation } from "./components/MobileNavigation";
import { ProtectedRoute } from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <ChatContextProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AuthProvider>
              <div className="relative min-h-screen">
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/chat" element={<ChatPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/dashboard/*" element={
                    <ProtectedRoute>
                      <DashboardPage />
                    </ProtectedRoute>
                  } />
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <MobileNavigation isOpen={isNavOpen} setIsOpen={setIsNavOpen} />
              </div>
            </AuthProvider>
          </BrowserRouter>
        </TooltipProvider>
      </ChatContextProvider>
    </QueryClientProvider>
  );
};

export default App;
