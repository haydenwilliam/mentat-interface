
import { useEffect, useState } from "react";
import SystemMonitor from "@/components/SystemMonitor";
import Terminal from "@/components/Terminal";
import Sidebar from "@/components/ui/sidebar/sidebar";
import FileExplorer from "@/components/FileExplorer";
import ProjectsView from "@/components/ProjectsView";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showFileExplorer, setShowFileExplorer] = useState(true);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [activeView, setActiveView] = useState<'terminal' | 'projects' | 'monitor'>('terminal');

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleViewChange = (view: 'terminal' | 'projects' | 'monitor') => {
    setActiveView(view);
  };

  const handleAddToContext = (path: string) => {
    setSelectedFiles(prev => {
      if (prev.includes(path)) {
        return prev.filter(p => p !== path);
      }
      return [...prev, path];
    });
  };

  // Only show file explorer when in terminal view
  const shouldShowFileExplorer = activeView === 'terminal';

  return (
    <div className={`min-h-screen transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <div className="flex h-screen">
        <Sidebar 
          onViewChange={handleViewChange}
          activeView={activeView}
        />

        <main className="flex-1 pl-6 pr-8 py-4 overflow-hidden flex flex-col">
          {activeView === 'terminal' && <Terminal />}
          {activeView === 'projects' && <ProjectsView />}
          {activeView === 'monitor' && <SystemMonitor />}
        </main>

        {shouldShowFileExplorer && (
          <Collapsible open={showFileExplorer} className="relative">
            <div className="relative flex">
              <CollapsibleTrigger 
                onClick={() => setShowFileExplorer(!showFileExplorer)} 
                className="absolute left-0 top-4 -translate-x-full z-20 p-1.5 bg-mentat-secondary/20 border-l border-t border-b border-mentat-border rounded-l-md hover:bg-mentat-secondary/30 transition-colors duration-200 py-[4px]"
              >
                {showFileExplorer ? 
                  <ChevronRight className="w-4 h-4 text-mentat-primary/80" /> : 
                  <ChevronLeft className="w-4 h-4 text-mentat-primary/80" />
                }
              </CollapsibleTrigger>
              
              <CollapsibleContent className="h-screen">
                <FileExplorer onAddToContext={handleAddToContext} />
              </CollapsibleContent>
            </div>
          </Collapsible>
        )}
      </div>
    </div>
  );
};

export default Index;
