
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { BuildProvider } from "@/contexts/BuildContext";
import Index from "./pages/Index";
import Projects from "./pages/Projects";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";

const queryClient = new QueryClient();

// This component handles redirects based on URL parameters
const RouteHandler = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Parse the view parameter if it exists
    const params = new URLSearchParams(location.search);
    const view = params.get('view');
    
    // If on the index page with a view parameter, we'll handle it in the Index component
    if (location.pathname === '/' && view) {
      // The Index component will read the URL params
    }
  }, [location, navigate]);
  
  return null;
}

// Use HashRouter for Electron to avoid file path issues
const RouterProvider = ({ children }: { children: React.ReactNode }) => {
  // Use HashRouter for Electron
  const isElectron = window.navigator.userAgent.toLowerCase().includes('electron');
  
  return (
    <BrowserRouter>
      {children}
    </BrowserRouter>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BuildProvider>
        <Toaster />
        <Sonner />
        <RouterProvider>
          <RouteHandler />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/projects" element={<Projects />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </RouterProvider>
      </BuildProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
