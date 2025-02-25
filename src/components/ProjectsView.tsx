
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
    eta: new Date(2024, 3, 30) // April 30, 2024
  },
  {
    id: "2",
    name: "Adventure Quest",
    description: "A classic RPG with immersive storytelling and strategic combat",
    type: "game",
    status: "completed",
    completedAt: new Date(2024, 2, 15), // March 15, 2024
    outcome: "success"
  },
  {
    id: "3",
    name: "Data Analytics Tool for Excel",
    description: "Advanced data analysis and visualization tools integrated with Microsoft Excel",
    type: "software",
    status: "ready"
  }
];

const ProjectsView = () => {
  const getStatusDisplay = (project: Project) => {
    switch (project.status) {
      case "in-progress":
        return (
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-yellow-500" />
            <div className="flex flex-col">
              <span className="text-sm text-mentat-primary/60">
                In Progress ({project.progress}%)
              </span>
              {project.eta && (
                <span className="text-xs text-mentat-primary/40">
                  ETA: {formatDistanceToNow(project.eta, { addSuffix: true })}
                </span>
              )}
            </div>
          </div>
        );
      case "completed":
        return (
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <div className="flex flex-col">
              <span className="text-sm text-mentat-primary/60 capitalize">
                {project.outcome || "Completed"}
              </span>
              {project.completedAt && (
                <span className="text-xs text-mentat-primary/40">
                  {formatDistanceToNow(project.completedAt, { addSuffix: true })}
                </span>
              )}
            </div>
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <span className="text-sm text-mentat-primary/60 capitalize">{project.status}</span>
          </div>
        );
    }
  };

  return (
    <div className="flex-1 overflow-auto p-6 bg-mentat-background">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-semibold text-mentat-highlight">My Projects</h2>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2 hover:text-mentat-highlight bg-mentat-secondary/20 border-mentat-highlight"
          >
            <Play className="w-4 h-4" />
            New Project
          </Button>
        </div>
        
        <div className="grid gap-6">
          {demoProjects.map((project) => (
            <div
              key={project.id}
              className="border border-mentat-border bg-mentat-secondary/10 rounded-lg p-6 hover:bg-mentat-secondary/20 transition-colors hover:border-mentat-highlight"
              style={{
                boxShadow: '0 0 10px rgba(0, 229, 255, 0.2), inset 0 0 10px rgba(0, 229, 255, 0.1)'
              }}
            >
              <div className="flex items-start justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-medium text-mentat-primary">{project.name}</h3>
                    <span className="inline-block px-2 py-1 text-xs rounded-full bg-mentat-secondary/30 text-mentat-highlight">
                      {project.type}
                    </span>
                  </div>
                  <p className="text-mentat-primary/80">{project.description}</p>
                  {getStatusDisplay(project)}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2 hover:text-mentat-highlight bg-mentat-secondary/20"
                  >
                    <Cog className="w-4 h-4" />
                    Build
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2 hover:text-mentat-highlight bg-mentat-secondary/20"
                  >
                    <Play className="w-4 h-4" />
                    Deploy
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2 hover:text-mentat-highlight bg-mentat-secondary/20"
                  >
                    <Share className="w-4 h-4" />
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
