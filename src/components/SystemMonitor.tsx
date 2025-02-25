
import { SystemMetrics } from "./system-monitor/SystemMetrics";
import { ProjectCard } from "./system-monitor/ProjectCard";
import { useSystemMonitor } from "@/hooks/useSystemMonitor";

const SystemMonitor = () => {
  const { metrics, deployedProjects, utils } = useSystemMonitor();

  return (
    <div className="h-full flex flex-col gap-4 p-4 bg-mentat-background/80 rounded-lg border border-mentat-border/20">
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

      <div className="flex-1 min-h-0">
        <h2 className="text-lg font-semibold mb-3 text-mentat-primary">Active Projects</h2>
        <div className="grid grid-cols-2 gap-3 h-[calc(100%-2rem)]">
          {deployedProjects.map(project => (
            <ProjectCard
              key={project.id}
              project={project}
              getStatusColor={utils.getStatusColor}
              formatTime={utils.formatTime}
            />
          ))}
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

