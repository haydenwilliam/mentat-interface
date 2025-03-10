import React from "react";
import { Settings, Play, Share2, MoreVertical, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import StatusDisplay from "./StatusDisplay";
import { Project } from "./types";
import { useBuild } from "@/contexts/BuildContext";
import { useNavigate } from "react-router-dom";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const { startBuild, setCurrentProject, deployProject, shareProject, configureProject } = useBuild();
  const navigate = useNavigate();

  const handleBuild = () => {
    setCurrentProject(project);
    startBuild(project);
    navigate('/');
  };

  const handleDeploy = () => {
    setCurrentProject(project);
    deployProject(project);
    navigate('/');
  };

  const handleShare = () => {
    setCurrentProject(project);
    shareProject(project);
  };

  const handleConfigure = () => {
    setCurrentProject(project);
    configureProject(project);
    // In a full implementation, this would open a configuration modal or page
  };

  return (
    <div
      className="mentat-card mentat-content-padding hover:bg-mentat-secondary/30 transition-colors h-[140px] flex flex-col"
    >
      <div className="flex flex-col flex-1 min-h-0">
        <div className="flex items-start justify-between mb-2">
          <div className="space-y-1 min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-medium text-mentat-primary truncate">{project.name}</h3>
              <span className="inline-block px-1.5 py-0.5 text-[11px] rounded-full bg-mentat-secondary/40 text-mentat-highlight shrink-0">
                {project.type}
              </span>
            </div>
            <p className="text-sm text-mentat-primary/80 line-clamp-2">{project.description}</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-7 w-7 p-0 bg-mentat-secondary/40 hover:bg-mentat-secondary/50 border-mentat-border"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-36 bg-mentat-background border-mentat-border">
              <DropdownMenuItem 
                className="flex items-center gap-2 text-mentat-primary"
                onClick={handleBuild}
                title="Start LLM code generation"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Build</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="flex items-center gap-2 text-mentat-primary"
                onClick={handleDeploy}
                title="Run the generated code"
              >
                <Play className="w-3.5 h-3.5" />
                <span>Deploy</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="flex items-center gap-2 text-mentat-primary"
                onClick={handleShare}
                title="Generate share link"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="flex items-center gap-2 text-mentat-primary"
                onClick={handleConfigure}
                title="Edit project settings"
              >
                <Edit className="w-3.5 h-3.5" />
                <span>Configure</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="mt-auto pt-2">
          <StatusDisplay project={project} />
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
