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
    <div className="mentat-header">
      <div className="flex items-center space-x-2">
        <div className="flex items-center">
          <Folder className="w-4 h-4 text-mentat-primary opacity-70" />
          <ChevronRight className="w-3 h-3 text-mentat-primary opacity-70" />
          <span className="text-sm text-mentat-primary opacity-90">
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
                ? "bg-mentat-mid-tone bg-opacity-60 text-mentat-highlight border-2 border-mentat-highlight border-opacity-30" 
                : "bg-mentat-secondary bg-opacity-80 text-mentat-primary opacity-90 hover:bg-mentat-mid-tone hover:bg-opacity-40 border-2 border-mentat-border border-opacity-40"
            }`}
          >
            {showBuildView ? 'Build Panel' : 'Show Build Panel'}
          </button>
        )}
      </div>
    </div>
  );
};

export default TerminalHeader;
