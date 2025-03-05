
import React from "react";
import { Project } from "../projects/types";
import { useBuild } from "@/contexts/BuildContext";
import { Folder, Terminal, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface TerminalHeaderProps {
  currentDirectory: string;
  currentProject: Project | null;
  showBuildView: boolean;
  setShowBuildView: (show: boolean) => void;
  isBuilding: boolean;
}

const TerminalHeader: React.FC<TerminalHeaderProps> = ({
  currentDirectory,
  currentProject,
  showBuildView,
  setShowBuildView,
  isBuilding
}) => {
  const { stopBuild } = useBuild();
  const navigate = useNavigate();

  const handleToggleBuildView = () => {
    if (showBuildView && isBuilding) {
      if (window.confirm("Exit build view? The build process will continue in the background.")) {
        setShowBuildView(false);
      }
    } else {
      setShowBuildView(!showBuildView);
    }
  };

  const navigateToProjects = () => {
    navigate('/projects');
  };

  return (
    <div className="flex items-center justify-between py-2 px-3 border-b-2 border-mentat-border/50 bg-mentat-secondary/70 shadow-md">
      <div className="flex items-center space-x-2">
        <div className="flex items-center">
          <Folder className="w-4 h-4 text-mentat-primary/70" />
          <ChevronRight className="w-3 h-3 text-mentat-primary/70" />
          <span className="text-sm text-mentat-primary/90">
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
                ? "bg-mentat-mid-tone/60 text-mentat-highlight border-2 border-mentat-highlight/30" 
                : "bg-mentat-secondary/80 text-mentat-primary/90 hover:bg-mentat-mid-tone/40 border-2 border-mentat-border/40"
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
