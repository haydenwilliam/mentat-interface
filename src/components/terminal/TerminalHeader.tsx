
import React from "react";
import { Project } from "../projects/types";
import { useBuild } from "@/contexts/BuildContext";
import { Folder, Terminal, ChevronRight } from "lucide-react";

interface TerminalHeaderProps {
  currentDirectory: string;
  currentProject: Project | null;
  showBuildView: boolean;
  setShowBuildView: (show: boolean) => void;
  isBuilding: boolean;
  navigateToProjects: () => void;
}

const TerminalHeader: React.FC<TerminalHeaderProps> = ({
  currentDirectory,
  currentProject,
  showBuildView,
  setShowBuildView,
  isBuilding,
  navigateToProjects
}) => {
  const { stopBuild } = useBuild();

  const handleToggleBuildView = () => {
    if (showBuildView && isBuilding) {
      if (window.confirm("Exit build view? The build process will continue in the background.")) {
        setShowBuildView(false);
      }
    } else {
      setShowBuildView(!showBuildView);
    }
  };

  return (
    <div className="flex items-center justify-between py-2 px-3 border-b border-mentat-border">
      <div className="flex items-center space-x-2">
        <div className="flex items-center">
          <Folder className="w-4 h-4 text-mentat-primary/60" />
          <ChevronRight className="w-3 h-3 text-mentat-primary/60" />
          <span className="text-sm text-mentat-primary/80">
            {currentDirectory}
          </span>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        {currentProject && (
          <button 
            onClick={navigateToProjects}
            className="flex items-center gap-1 text-sm text-mentat-highlight hover:underline"
          >
            <Folder className="w-3.5 h-3.5" />
            Projects
          </button>
        )}
        
        {currentProject && (
          <button
            onClick={handleToggleBuildView}
            className={`text-xs px-2 py-0.5 rounded ${
              showBuildView 
                ? "bg-mentat-secondary/40 text-mentat-highlight" 
                : "bg-mentat-secondary/20 text-mentat-primary/80 hover:bg-mentat-secondary/30"
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default TerminalHeader;
