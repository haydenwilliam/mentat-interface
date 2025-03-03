
import React from "react";
import { Folder, Play } from "lucide-react";
import { Project } from "../projects/types";
import { useNavigate } from "react-router-dom";

interface TerminalHeaderProps {
  currentDirectory: string;
  currentProject: Project | null;
  showBuildView: boolean;
  setShowBuildView: (show: boolean) => void;
  isBuilding: boolean;
}

const TerminalHeader = ({ 
  currentDirectory, 
  currentProject, 
  showBuildView, 
  setShowBuildView,
  isBuilding
}: TerminalHeaderProps) => {
  const navigate = useNavigate();

  const navigateToProjects = () => {
    navigate('/projects');
  };

  return (
    <div className="flex items-center justify-between w-full gap-2 px-3 py-1 bg-mentat-secondary/20 rounded-t-lg border-b border-mentat-border/30">
      <div className="flex items-center gap-2 text-mentat-primary">
        <Folder className="w-4 h-4" />
        <span className="text-xs font-mono">{currentDirectory}</span>
      </div>
      <div className="flex items-center gap-2">
        {currentProject && (
          <>
            <div 
              className="text-xs bg-mentat-secondary/40 px-2 py-0.5 rounded border border-mentat-border/30 cursor-pointer hover:bg-mentat-secondary/60 transition-colors"
              onClick={navigateToProjects}
            >
              <span className="opacity-70">Project: </span>
              <span className="text-mentat-highlight">{currentProject.name}</span>
            </div>
            <button 
              onClick={() => setShowBuildView(!showBuildView)}
              className={`flex items-center gap-1.5 text-xs py-0.5 px-2 rounded border ${
                showBuildView 
                  ? 'bg-mentat-highlight/10 text-mentat-highlight border-mentat-highlight/30' 
                  : 'bg-mentat-secondary/30 text-mentat-primary/70 border-mentat-border/30 hover:bg-mentat-secondary/50'
              }`}
            >
              <Play className="w-3 h-3" />
              {isBuilding ? "Building..." : "Build View"}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TerminalHeader;
