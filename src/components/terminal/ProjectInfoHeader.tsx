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
    <div className="flex items-center justify-between gap-2 p-2 rounded-lg bg-mentat-mid-tone/15 border-2 border-mentat-border/40 mb-3 shadow-md">
      <div className="flex items-center gap-2">
        <div className="p-1.5 rounded-full bg-mentat-secondary/50 border border-mentat-border/40">
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
          className="flex items-center gap-1.5 text-xs py-1 px-2 rounded bg-mentat-secondary/40 hover:bg-mentat-secondary/60 text-mentat-primary border border-mentat-border/50"
          title="Start LLM code generation"
        >
          <Settings className="w-3 h-3" />
          Build
        </button>
        <button 
          onClick={() => {
            deployProject(currentProject);
            setShowBuildView(true);
          }}
          className="flex items-center gap-1.5 text-xs py-1 px-2 rounded bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/30"
          title="Run the generated code"
        >
          <Play className="w-3 h-3" />
          Deploy
        </button>
        <button 
          onClick={() => {
            shareProject(currentProject);
          }}
          className="flex items-center gap-1.5 text-xs py-1 px-2 rounded bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 border border-purple-500/30"
          title="Generate share link"
        >
          <Share2 className="w-3 h-3" />
          Share
        </button>
        <button 
          onClick={() => {
            configureProject(currentProject);
          }}
          className="flex items-center gap-1.5 text-xs py-1 px-2 rounded bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/30"
          title="Edit project settings"
        >
          <Edit className="w-3 h-3" />
          Configure
        </button>
      </div>
    </div>
  );
};

export default ProjectInfoHeader;
