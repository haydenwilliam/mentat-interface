
import { Cog, Plus, Play, Share } from "lucide-react";
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
    eta: new Date(Date.now() + 7 * 60 * 1000)
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
    completedAt: new Date(2025, 1, 15),
    outcome: "success"
  },
  {
    id: "4",
    name: "Smart Calendar",
    description: "AI-powered calendar that optimizes your schedule and suggests meeting times",
    type: "agent",
    status: "in-progress",
    progress: 30,
    eta: new Date(Date.now() + 14 * 60 * 1000)
  },
  {
    id: "5",
    name: "Virtual Reality Game",
    description: "Immersive VR experience with stunning graphics and innovative gameplay",
    type: "game",
    status: "in-progress",
    progress: 85,
    eta: new Date(Date.now() + 3 * 60 * 1000)
  },
  {
    id: "6",
    name: "Code Generator",
    description: "Advanced code generation tool powered by machine learning",
    type: "software",
    status: "completed",
    completedAt: new Date(2025, 2, 1),
    outcome: "success"
  },
  {
    id: "7",
    name: "Document Parser",
    description: "Intelligent document parsing and analysis system",
    type: "agent",
    status: "ready"
  },
  {
    id: "8",
    name: "Mobile Strategy Game",
    description: "Turn-based strategy game optimized for mobile devices",
    type: "game",
    status: "in-progress",
    progress: 45,
    eta: new Date(Date.now() + 10 * 60 * 1000)
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
    <div className="flex-1 overflow-hidden p-4 bg-mentat-background">
      <div className="h-full max-w-5xl mx-auto border border-mentat-border rounded-lg overflow-hidden flex flex-col">
        <div className="sticky top-0 bg-mentat-background p-4 border-b border-mentat-border z-10">
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
              <div
                key={project.id}
                className="border border-mentat-border bg-mentat-secondary/20 rounded-lg p-4 hover:bg-mentat-secondary/30 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-medium text-mentat-primary">{project.name}</h3>
                      <span className="inline-block px-1.5 py-0.5 text-[11px] rounded-full bg-mentat-secondary/40 text-mentat-highlight">
                        {project.type}
                      </span>
                    </div>
                    <p className="text-sm text-mentat-primary/80">{project.description}</p>
                    {getStatusDisplay(project)}
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1 px-2 py-1 h-7 text-xs bg-mentat-secondary/40 hover:bg-mentat-secondary/50 border-mentat-border"
                    >
                      <Cog className="w-3 h-3" />
                      Build
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1 px-2 py-1 h-7 text-xs bg-mentat-secondary/40 hover:bg-mentat-secondary/50 border-mentat-border"
                    >
                      <Play className="w-3 h-3" />
                      Deploy
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1 px-2 py-1 h-7 text-xs bg-mentat-secondary/40 hover:bg-mentat-secondary/50 border-mentat-border"
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
    </div>
  );
};

export default ProjectsView;

