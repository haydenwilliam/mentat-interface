
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProjectCard from "./projects/ProjectCard";
import { demoProjects } from "./projects/types";

const ProjectsView = () => {
  return (
    <div className="flex-1 overflow-hidden p-4 bg-mentat-background">
      <div className="h-full max-w-5xl mx-auto border-2 border-mentat-border rounded-lg overflow-hidden flex flex-col">
        <div className="sticky top-0 bg-mentat-background p-4 border-b-2 border-mentat-border z-10">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-mentat-highlight">My Projects</h2>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1.5 hover:text-mentat-highlight bg-mentat-secondary/20 border-mentat-highlight"
            >
              <Plus className="w-3.5 h-3.5" />
              New Project
            </Button>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid gap-4">
            {demoProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsView;
