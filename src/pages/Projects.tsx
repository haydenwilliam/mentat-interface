
import { useState } from "react";
import ProjectsView from "@/components/ProjectsView";
import Sidebar from "@/components/ui/sidebar/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Projects = () => {
  const [activeView, setActiveView] = useState<'terminal' | 'projects' | 'monitor' | 'settings'>('projects');
  const navigate = useNavigate();

  const handleViewChange = (view: 'terminal' | 'projects' | 'monitor' | 'settings') => {
    if (view === 'terminal') {
      navigate('/');
    } else if (view === 'monitor' || view === 'settings') {
      // Navigate to the Index page with the specified view
      navigate('/?view=' + view);
    } else {
      setActiveView(view);
    }
  };

  return (
    <div className="min-h-screen flex h-screen">
      <Sidebar 
        onViewChange={handleViewChange}
        activeView={activeView}
      />

      <main className="flex-1 pl-6 pr-8 py-4 overflow-hidden flex flex-col">
        <ProjectsView />
      </main>
    </div>
  );
};

export default Projects;
