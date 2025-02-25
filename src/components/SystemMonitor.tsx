
import { SystemMetrics } from "./system-monitor/SystemMetrics";
import { ProjectCard } from "./system-monitor/ProjectCard";
import { useSystemMonitor } from "@/hooks/useSystemMonitor";

const SystemMonitor = () => {
  const { metrics, deployedProjects, utils } = useSystemMonitor();

  return (
    <div className="h-full flex flex-col gap-6 p-6 bg-mentat-background/80 rounded-lg border border-mentat-border/20">
      <SystemMetrics
        cpuUsage={metrics.cpuUsage}
        memoryUsage={metrics.memoryUsage}
        networkActivity={metrics.networkActivity}
        gpuUsage={metrics.gpuUsage}
        diskUsage={metrics.diskUsage}
        cpuHistory={metrics.cpuHistory}
        getStatusColor={utils.getStatusColor}
      />

      <div className="flex-1">
        <h2 className="text-mentat-primary text-sm font-semibold mb-4">Active Projects</h2>
        <div className="space-y-4">
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

      <div className="flex items-center justify-between text-xs text-mentat-primary/60 border-t border-mentat-border/20 pt-4">
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
