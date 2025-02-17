
import { useEffect, useState } from "react";
import SystemMonitor from "@/components/SystemMonitor";
import Terminal from "@/components/Terminal";
import Chat from "@/components/Chat";
import Sidebar from "@/components/Sidebar";
import FileExplorer from "@/components/FileExplorer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Terminal as TerminalIcon, MessageSquare } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showMonitor, setShowMonitor] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className={`min-h-screen transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <div className="flex h-screen">
        {/* Left Sidebar */}
        <Sidebar onMonitorToggle={() => setShowMonitor(!showMonitor)} />

        {/* Main Content */}
        <main className="flex-1 p-4 overflow-hidden flex flex-col">
          <header className="mb-4">
            <h1 className="text-2xl font-bold retro-text">MENTAT</h1>
            <p className="text-mentat-highlight/60 text-sm">Advanced Computing Interface</p>
          </header>

          <Collapsible open={showMonitor}>
            <CollapsibleContent className="mb-4">
              <SystemMonitor />
            </CollapsibleContent>
          </Collapsible>

          <div className="flex-1 retro-container">
            <Tabs defaultValue="terminal" className="h-full flex flex-col">
              <TabsList className="w-full justify-start bg-mentat-secondary/20 border-b border-mentat-border">
                <TabsTrigger 
                  value="terminal"
                  className="data-[state=active]:bg-mentat-secondary/30 data-[state=active]:text-mentat-primary gap-2"
                >
                  <TerminalIcon className="w-4 h-4" />
                  Terminal
                </TabsTrigger>
                <TabsTrigger 
                  value="chat"
                  className="data-[state=active]:bg-mentat-secondary/30 data-[state=active]:text-mentat-primary gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  Chat
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="terminal" className="flex-1 mt-0 h-full">
                <Terminal />
              </TabsContent>
              
              <TabsContent value="chat" className="flex-1 mt-0 h-full">
                <Chat />
              </TabsContent>
            </Tabs>
          </div>
        </main>

        {/* Right Sidebar - File Explorer */}
        <FileExplorer />
      </div>

      <div className="fixed top-0 left-0 w-full h-1 overflow-hidden pointer-events-none">
        <div className="w-full h-full bg-mentat-primary/10 animate-scan-line" />
      </div>
    </div>
  );
};

export default Index;
