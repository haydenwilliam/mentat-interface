
import { Play, Upload, Share } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Project {
  id: string;
  name: string;
  description: string;
  type: "software" | "agent" | "game";
  status: "ready" | "in-progress" | "completed";
}

const demoProjects: Project[] = [
  {
    id: "1",
    name: "Smart Assistant Agent",
    description: "An AI-powered assistant capable of natural language processing and task automation",
    type: "agent",
    status: "completed"
  },
  {
    id: "2",
    name: "Virtual Reality Game",
    description: "An immersive VR experience built with Unity and custom shaders",
    type: "game",
    status: "ready"
  },
  {
    id: "3",
    name: "Code Analysis Tool",
    description: "Automated code review and analysis software using machine learning",
    type: "software",
    status: "in-progress"
  }
];

const ProjectsView = () => {
  return (
    <div className="flex-1 overflow-auto p-6">
      <h2 className="text-2xl font-semibold text-mentat-highlight mb-6">My Projects</h2>
      <div className="grid gap-6">
        {demoProjects.map((project) => (
          <div
            key={project.id}
            className="border border-mentat-border bg-mentat-secondary/10 rounded-lg p-6 hover:bg-mentat-secondary/20 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-medium text-mentat-primary">{project.name}</h3>
                <span className="inline-block px-2 py-1 text-xs rounded-full bg-mentat-secondary/30 text-mentat-highlight mt-2">
                  {project.type}
                </span>
                <p className="mt-3 text-mentat-primary/80">{project.description}</p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 hover:text-mentat-highlight"
                >
                  <Play className="w-4 h-4" />
                  Build
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 hover:text-mentat-highlight"
                >
                  <Upload className="w-4 h-4" />
                  Deploy
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 hover:text-mentat-highlight"
                >
                  <Share className="w-4 h-4" />
                  Share
                </Button>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${
                project.status === 'completed' ? 'bg-green-500' :
                project.status === 'in-progress' ? 'bg-yellow-500' :
                'bg-blue-500'
              }`} />
              <span className="text-sm text-mentat-primary/60 capitalize">{project.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsView;
