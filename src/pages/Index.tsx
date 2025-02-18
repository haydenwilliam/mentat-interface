
import { useEffect, useState } from "react";
import SystemMonitor from "@/components/SystemMonitor";
import Terminal from "@/components/Terminal";
import Sidebar from "@/components/Sidebar";
import FileExplorer from "@/components/FileExplorer";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showMonitor, setShowMonitor] = useState(false);
  const [showFileExplorer, setShowFileExplorer] = useState(true);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleAddToContext = (path: string) => {
    setSelectedFiles(prev => {
      if (prev.includes(path)) {
        return prev.filter(p => p !== path);
      }
      return [...prev, path];
    });
  };

  return (
    <div className={`min-h-screen transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <div className="flex h-screen">
        {/* Left Sidebar */}
        <Sidebar onMonitorToggle={() => setShowMonitor(!showMonitor)} />

        {/* Main Content */}
        <main className="flex-1 p-4 overflow-hidden flex flex-col">
          <header className="mb-4">
            <h1 className="text-2xl font-bold retro-text">MENTAT</h1>
            <p className="text-mentat-highlight/60 text-sm">Mission Control</p>
          </header>

          <Collapsible open={showMonitor}>
            <CollapsibleContent className="mb-4">
              <SystemMonitor />
            </CollapsibleContent>
          </Collapsible>

          <Terminal />
        </main>

        {/* Right Sidebar - File Explorer with Toggle */}
        <Collapsible open={showFileExplorer} className="relative">
          <CollapsibleTrigger
            onClick={() => setShowFileExplorer(!showFileExplorer)}
            className="absolute left-0 top-4 -translate-x-full z-20 p-1.5 bg-mentat-secondary/20 
              border-l border-t border-b border-mentat-border rounded-l-md 
              hover:bg-mentat-secondary/30 transition-colors duration-200 
              px-[6px] py-[6px] mx-0 my-[9px]"
          >
            {showFileExplorer ? (
              <ChevronRight className="w-4 h-4 text-mentat-primary/80" />
            ) : (
              <ChevronLeft className="w-4 h-4 text-mentat-primary/80" />
            )}
          </CollapsibleTrigger>
          <CollapsibleContent className="h-screen">
            <FileExplorer onAddToContext={handleAddToContext} />
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
};

export default Index;
