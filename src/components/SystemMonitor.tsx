
import { SystemMetrics } from "./system-monitor/SystemMetrics";
import { ProjectCard } from "./system-monitor/ProjectCard";
import { useSystemMonitor } from "@/hooks/useSystemMonitor";
import { useBuild } from "@/contexts/BuildContext";

const SystemMonitor = () => {
  const { metrics, utils } = useSystemMonitor();
  const { deployedProjects } = useBuild();

  return (
    <div className="h-full flex flex-col gap-4 p-4 rounded-lg border-2 border-mentat-border">
      <SystemMetrics
        cpuUsage={metrics.cpuUsage}
        memoryUsage={metrics.memoryUsage}
        networkActivity={metrics.networkActivity}
        gpuUsage={metrics.gpuUsage}
        diskUsage={metrics.diskUsage}
        cpuHistory={metrics.cpuHistory}
        memoryHistory={metrics.memoryHistory}
        networkHistory={metrics.networkHistory}
        gpuHistory={metrics.gpuHistory}
        diskHistory={metrics.diskHistory}
        getStatusColor={utils.getStatusColor}
      />

      <div className="flex-1 min-h-0 overflow-hidden">
        <h2 className="text-lg font-semibold mb-3 text-mentat-primary">Active Projects</h2>
        <div className="grid grid-cols-2 gap-3 h-[256px] overflow-y-auto pr-1">
          {deployedProjects.length > 0 ? (
            deployedProjects.map(project => (
              <ProjectCard
                key={project.id}
                project={{
                  id: project.id,
                  name: project.name,
                  type: project.type === "agent" ? "agent" : "workflow",
                  status: "running",
                  resources: {
                    cpu: Math.floor(Math.random() * 100),
                    memory: Math.floor(Math.random() * 100),
                    gpu: Math.floor(Math.random() * 100)
                  },
                  estimatedCompletion: new Date(Date.now() + 30 * 60000),
                  progress: project.progress || 75
                }}
                getStatusColor={utils.getStatusColor}
                formatTime={utils.formatTime}
              />
            ))
          ) : (
            <div className="col-span-2 flex items-center justify-center h-full text-mentat-primary/60">
              <p>No active projects. Deploy a project to see it here.</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-mentat-primary/60 border-t border-mentat-border/20 pt-3">
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
          <span>All Systems Operational</span>
        </div>
        <span>Last updated: {new Date().toLocaleTimeString()}</span>
      </div>
    </div>
  );
};

export default SystemMonitor;
