
import { Cog, Play, Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";

interface Project {
  id: string;
  name: string;
  description: string;
  type: "software" | "agent" | "game";
  status: "ready" | "in-progress" | "completed";
  progress?: number;
  eta?: Date;
  completedAt?: Date;
  outcome?: "success" | "failure" | "partial";
}

const demoProjects: Project[] = [
  {
    id: "1",
    name: "Email Assistant",
    description: "An AI-powered email assistant that helps manage and respond to your emails efficiently",
    type: "agent",
    status: "in-progress",
    progress: 65,
    eta: new Date(Date.now() + 7 * 60 * 1000) // 7 minutes from now
  },
  {
    id: "2",
    name: "Adventure Quest",
    description: "A classic RPG with immersive storytelling and strategic combat",
    type: "game",
    status: "ready"
  },
  {
    id: "3",
    name: "Data Analytics Tool for Excel",
    description: "Advanced data analysis and visualization tools integrated with Microsoft Excel",
    type: "software",
    status: "completed",
    completedAt: new Date(2025, 1, 15), // Feb 15, 2025
    outcome: "success"
  }
];

const ProjectsView = () => {
  const getStatusDisplay = (project: Project) => {
    switch (project.status) {
      case "in-progress":
        return (
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
            <div className="flex flex-col">
              <span className="text-xs text-mentat-primary/60">
                In Progress ({project.progress}%)
              </span>
              {project.eta && (
                <span className="text-[11px] text-mentat-primary/40">
                  ETA: {formatDistanceToNow(project.eta, { addSuffix: true })}
                </span>
              )}
            </div>
          </div>
        );
      case "completed":
        return (
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
            <div className="flex flex-col">
              <span className="text-xs text-mentat-primary/60 capitalize">
                {project.outcome || "Completed"}
              </span>
              {project.completedAt && (
                <span className="text-[11px] text-mentat-primary/40">
                  {formatDistanceToNow(project.completedAt, { addSuffix: true })}
                </span>
              )}
            </div>
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            <span className="text-xs text-mentat-primary/60 capitalize">{project.status}</span>
          </div>
        );
    }
  };

  return (
    <div className="flex-1 overflow-auto p-4 bg-mentat-background">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-mentat-highlight">My Projects</h2>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1.5 hover:text-mentat-highlight bg-mentat-secondary/20 border-mentat-highlight"
          >
            <Play className="w-3.5 h-3.5" />
            New Project
          </Button>
        </div>
        
        <div className="grid gap-4">
          {demoProjects.map((project) => (
            <div
              key={project.id}
              className="border border-mentat-border bg-mentat-secondary/10 rounded-lg p-4 hover:bg-mentat-secondary/20 transition-colors min-h-[160px] w-full"
            >
              <div className="flex items-start justify-between h-full">
                <div className="space-y-2 flex flex-col min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-medium text-mentat-primary truncate">{project.name}</h3>
                    <span className="inline-block px-1.5 py-0.5 text-[11px] rounded-full bg-mentat-secondary/30 text-mentat-highlight whitespace-nowrap">
                      {project.type}
                    </span>
                  </div>
                  <p className="text-sm text-mentat-primary/80 line-clamp-2">{project.description}</p>
                  <div className="mt-auto">
                    {getStatusDisplay(project)}
                  </div>
                </div>
                <div className="flex gap-1 ml-4 shrink-0">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1 px-2 py-1 h-7 text-xs bg-mentat-secondary/30 hover:bg-mentat-secondary/40 border-mentat-border"
                  >
                    <Cog className="w-3 h-3" />
                    Build
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1 px-2 py-1 h-7 text-xs bg-mentat-secondary/30 hover:bg-mentat-secondary/40 border-mentat-border"
                  >
                    <Play className="w-3 h-3" />
                    Deploy
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1 px-2 py-1 h-7 text-xs bg-mentat-secondary/30 hover:bg-mentat-secondary/40 border-mentat-border"
                  >
                    <Share className="w-3 h-3" />
                    Share
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsView;
