
import { useEffect, useState } from "react";
import SystemMonitor from "@/components/SystemMonitor";
import Terminal from "@/components/Terminal";
import Sidebar from "@/components/Sidebar";
import FileExplorer from "@/components/FileExplorer";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showMonitor, setShowMonitor] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return <div className={`min-h-screen transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
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

        {/* Right Sidebar - File Explorer */}
        <FileExplorer />
      </div>
    </div>;
};

export default Index;
