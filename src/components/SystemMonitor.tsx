import { SystemMetrics } from "./system-monitor/SystemMetrics";
import { ProjectCard } from "./system-monitor/ProjectCard";
import { useSystemMonitor } from "@/hooks/useSystemMonitor";
import { useBuild } from "@/contexts/BuildContext";
import { typography } from "../styles/fontSchema";
import "../styles/scrollAnimation.css";

const SystemMonitor = () => {
  const { metrics, utils } = useSystemMonitor();
  const { deployedProjects } = useBuild();

  return (
    <div className="h-full w-full p-6 relative">
      {/* Subtle background pattern - works for both light/dark */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.02] dark:opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, var(--mentat-border) 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }}
      />

      <div className="h-full w-full rounded-xl border-[3px] border-mentat-border bg-mentat-background/90 backdrop-blur-[2px] overflow-hidden flex flex-col shadow-[0_4px_20px_-8px_rgba(var(--mentat-border-rgb),0.3)] dark:shadow-[0_0_30px_-5px_rgba(var(--mentat-highlight-rgb),0.07)]">
        {/* Fixed Header */}
        <div className="px-6 py-6 border-b-[3px] border-mentat-border/30 bg-gradient-to-r from-mentat-secondary/50 to-mentat-secondary/10 backdrop-blur-sm">
          <h1 className={`${typography.pageTitle}`}>
            System Monitor
          </h1>
          <p className={`${typography.bodyText} text-mentat-highlight max-w-2xl`}>
            Monitor system resources and running projects
          </p>
        </div>
        
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden px-4 py-8 bg-gradient-to-b from-mentat-background to-[rgba(var(--mentat-secondary-rgb),0.05)] dark:from-mentat-background dark:to-[rgba(var(--mentat-highlight-rgb),0.03)] flex flex-col gap-6">
          <div>
            <h2 className={`${typography.sectionTitle} text-mentat-highlight mb-4`}>System Health</h2>
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
          </div>

          <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <h2 className={`${typography.sectionTitle} text-mentat-highlight`}>Active Projects</h2>
              <div className="px-2 py-1 text-xs bg-mentat-secondary/40 text-mentat-primary/80 rounded-md border border-mentat-border/30 dark:border-mentat-highlight/10 shadow-sm">
                {deployedProjects.length} active
              </div>
            </div>
            
            <div className="flex-1 min-h-0 max-h-[300px] overflow-y-auto pr-2 scroll-bounce">
              <div className="grid grid-cols-2 gap-4 pb-1">
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
                  <div className="col-span-2 flex flex-col items-center justify-center h-[270px] text-mentat-primary/60 bg-mentat-secondary/10 rounded-lg border-2 border-dashed border-mentat-border/50 dark:border-mentat-highlight/10 p-8">
                    <p className="text-lg mb-2">No active projects</p>
                    <p className="text-sm text-center">Deploy a project from the terminal to see it here.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-mentat-primary/60 border-t-2 border-mentat-border/20 pt-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.5)]"></div>
              <span>All Systems Operational</span>
            </div>
            <span>Last updated: {new Date().toLocaleTimeString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemMonitor;
