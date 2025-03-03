
import { useBuild } from "@/contexts/BuildContext";
import { Play, Square, Terminal as TerminalIcon, Upload, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const BuildTerminal = () => {
  const { 
    currentProject, 
    isBuilding, 
    isDeploying,
    buildLogs, 
    startBuild, 
    stopBuild, 
    deployProject,
    shareProject 
  } = useBuild();

  if (!currentProject) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-mentat-primary/60">
        <TerminalIcon className="w-10 h-10 mb-3 opacity-30" />
        <p className="text-sm">No project selected. Use the projects view or /project command to select a project.</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="flex items-center justify-between p-2 bg-mentat-secondary/30 border-b border-mentat-border">
        <div className="flex items-center gap-2">
          <TerminalIcon className="w-4 h-4 text-mentat-highlight" />
          <span className="font-medium text-sm">
            Project: <span className="text-mentat-highlight">{currentProject.name}</span>
            <span className="ml-2 text-xs opacity-70">({currentProject.type})</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          {isBuilding ? (
            <Button 
              variant="outline" 
              size="sm" 
              className="h-7 bg-red-500/10 hover:bg-red-500/20 text-red-400 border-red-500/30"
              onClick={stopBuild}
            >
              <Square className="w-3.5 h-3.5 mr-1" />
              Stop Build
            </Button>
          ) : (
            <Button 
              variant="outline" 
              size="sm" 
              className="h-7 bg-green-500/10 hover:bg-green-500/20 text-green-400 border-green-500/30"
              onClick={() => startBuild(currentProject)}
              disabled={isDeploying}
            >
              <Play className="w-3.5 h-3.5 mr-1" />
              Build
            </Button>
          )}
          
          <Button 
            variant="outline" 
            size="sm" 
            className="h-7 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border-blue-500/30"
            onClick={() => deployProject(currentProject)}
            disabled={isBuilding || isDeploying}
          >
            <Upload className="w-3.5 h-3.5 mr-1" />
            Deploy
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="h-7 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 border-purple-500/30"
            onClick={() => shareProject(currentProject)}
          >
            <Share2 className="w-3.5 h-3.5 mr-1" />
            Share
          </Button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-3 font-mono text-sm bg-black/20">
        {buildLogs.map((log, index) => (
          <div key={index} className="mb-1">
            <span className="text-gray-400">[{new Date().toLocaleTimeString()}]</span>{" "}
            <span className={
              log.includes("completed") || log.includes("successfully") ? "text-green-400" : 
              log.includes("error") || log.includes("terminated") ? "text-red-400" : 
              log.includes("deployment") || log.includes("deployed") ? "text-blue-400" :
              log.includes("share") ? "text-purple-400" :
              "text-mentat-primary"
            }>{log}</span>
          </div>
        ))}
        {isBuilding && (
          <div className="mt-2 flex items-center gap-2">
            <div className="animate-pulse w-2 h-2 rounded-full bg-green-500"></div>
            <span className="text-green-400">Building in progress...</span>
          </div>
        )}
        {isDeploying && (
          <div className="mt-2 flex items-center gap-2">
            <div className="animate-pulse w-2 h-2 rounded-full bg-blue-500"></div>
            <span className="text-blue-400">Deployment in progress...</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuildTerminal;
