import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Index from "./pages/Index";
import GroupData from "./pages/GroupData";
import DigitalAdvertising from "./pages/DigitalAdvertising";
import NotFound from "./pages/NotFound";
import EmailGate from "./components/EmailGate";
import { hasEmailAccess, setEmailAccessCookie } from "./services/emailAccessService";
import { useVisitTracking } from "./hooks/useVisitTracking";

const queryClient = new QueryClient();

// Separate component to use the visit tracking hook (needs Router context)
const AppRoutes = () => {
  useVisitTracking();
  
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/group-data" element={<GroupData />} />
      <Route path="/digital-advertising" element={<DigitalAdvertising />} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => {
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isCheckingAccess, setIsCheckingAccess] = useState(true);

  useEffect(() => {
    // Check if user already has access
    const accessGranted = hasEmailAccess();
    if (accessGranted) {
      setIsEmailVerified(true);
    }
    setIsCheckingAccess(false);
  }, []);

  const handleAccessGranted = () => {
    setEmailAccessCookie();
    setIsEmailVerified(true);
  };

  if (isCheckingAccess) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="h-8 w-8 mx-auto border-4 border-t-blue-600 border-b-blue-600 border-l-transparent border-r-transparent rounded-full animate-spin"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {!isEmailVerified ? (
          <EmailGate onAccessGranted={handleAccessGranted} />
        ) : (
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
