
import { formatDistanceToNow } from "date-fns";
import { Project } from "./types";

interface StatusDisplayProps {
  project: Project;
}

const StatusDisplay = ({ project }: StatusDisplayProps) => {
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

export default StatusDisplay;
