import React from "react";
import { Folder, Bot, Play, Settings, Share2, Edit } from "lucide-react";
import { Project } from "../projects/types";
import { useBuild } from "@/contexts/BuildContext";
import { useNavigate } from "react-router-dom";

interface ProjectInfoHeaderProps {
  currentProject: Project | null;
  setShowBuildView: (show: boolean) => void;
}

const ProjectInfoHeader = ({ currentProject, setShowBuildView }: ProjectInfoHeaderProps) => {
  const { startBuild, deployProject, shareProject, configureProject } = useBuild();
  const navigate = useNavigate();

  if (!currentProject) return null;

  const navigateToProjects = () => {
    navigate('/projects');
  };

  return (
    <div className="mentat-card mentat-content-padding flex items-center justify-between gap-2 mb-3">
      <div className="flex items-center gap-2">
        <div className="p-1.5 rounded-full bg-mentat-mid-tone/70 border-2 border-mentat-border/40">
          {currentProject.type === "software" && <Folder className="w-3.5 h-3.5 text-mentat-highlight" />}
          {currentProject.type === "agent" && <Bot className="w-3.5 h-3.5 text-mentat-highlight" />}
          {currentProject.type === "game" && <Play className="w-3.5 h-3.5 text-mentat-highlight" />}
        </div>
        <div>
          <button 
            onClick={navigateToProjects}
            className="text-sm font-medium text-mentat-highlight hover:underline"
          >
            {currentProject.name}
          </button>
          <div className="text-xs opacity-70">{currentProject.type}</div>
        </div>
      </div>
      <div className="flex gap-1">
        <button 
          onClick={() => {
            startBuild(currentProject);
            setShowBuildView(true);
          }}
          className="flex items-center gap-1.5 text-xs py-1 px-2 rounded bg-mentat-mid-tone/60 hover:bg-mentat-mid-tone/80 text-mentat-primary border-2 border-mentat-border/50"
          title="Start LLM code generation"
        >
          <Settings className="w-3 h-3" />
          <span>Build</span>
        </button>
        <button 
          onClick={() => {
            deployProject(currentProject);
          }}
          className="flex items-center gap-1.5 text-xs py-1 px-2 rounded bg-mentat-mid-tone/60 hover:bg-mentat-mid-tone/80 text-mentat-primary border-2 border-mentat-border/50"
          title="Run the generated code"
        >
          <Play className="w-3 h-3" />
          <span>Deploy</span>
        </button>
        <button 
          onClick={() => {
            shareProject(currentProject);
          }}
          className="flex items-center gap-1.5 text-xs py-1 px-2 rounded bg-mentat-mid-tone/60 hover:bg-mentat-mid-tone/80 text-mentat-primary border-2 border-mentat-border/50"
          title="Generate share link"
        >
          <Share2 className="w-3 h-3" />
          <span>Share</span>
        </button>
        <button 
          onClick={() => {
            configureProject(currentProject);
          }}
          className="flex items-center gap-1.5 text-xs py-1 px-2 rounded bg-mentat-mid-tone/60 hover:bg-mentat-mid-tone/80 text-mentat-primary border-2 border-mentat-border/50"
          title="Edit project settings"
        >
          <Edit className="w-3 h-3" />
          <span>Config</span>
        </button>
      </div>
    </div>
  );
};

export default ProjectInfoHeader;
