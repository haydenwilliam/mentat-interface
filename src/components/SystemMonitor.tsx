
import { useState, useEffect } from "react";
import { SystemMetrics } from "./system-monitor/SystemMetrics";
import { ProjectCard } from "./system-monitor/ProjectCard";
import { DeployedProject } from "./system-monitor/types";

const SystemMonitor = () => {
  const [cpuUsage, setCpuUsage] = useState(0);
  const [memoryUsage, setMemoryUsage] = useState(0);
  const [networkActivity, setNetworkActivity] = useState(0);
  const [gpuUsage, setGpuUsage] = useState(0);
  const [diskUsage, setDiskUsage] = useState(0);
  const [cpuHistory, setCpuHistory] = useState<{ time: number; value: number; }[]>([]);
  const [deployedProjects, setDeployedProjects] = useState<DeployedProject[]>([
    {
      id: "1",
      name: "Data Processing Agent",
      type: "agent",
      status: "running",
      resources: { cpu: 45, memory: 60, gpu: 30 },
      estimatedCompletion: new Date(Date.now() + 30 * 60000),
      progress: 65
    },
    {
      id: "2",
      name: "Training Workflow",
      type: "workflow",
      status: "running",
      resources: { cpu: 85, memory: 70, gpu: 90 },
      estimatedCompletion: new Date(Date.now() + 120 * 60000),
      progress: 30
    }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newCpuUsage = Math.random() * 100;
      setCpuUsage(newCpuUsage);
      setMemoryUsage(Math.random() * 100);
      setNetworkActivity(Math.random() * 100);
      setGpuUsage(Math.random() * 100);
      setDiskUsage(Math.random() * 100);
      
      setCpuHistory(prev => [
        ...prev.slice(-20),
        { time: Date.now(), value: newCpuUsage }
      ]);

      setDeployedProjects(prev => 
        prev.map(project => ({
          ...project,
          progress: Math.min(100, project.progress + Math.random() * 2),
          resources: {
            cpu: Math.random() * 100,
            memory: Math.random() * 100,
            gpu: Math.random() * 100
          }
        }))
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (value: number) => {
    if (value >= 80) return "text-red-500";
    if (value >= 60) return "text-orange-400";
    return "text-green-400";
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = date.getTime() - now.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    return hours > 0 ? `${hours}h ${minutes % 60}m` : `${minutes}m`;
  };

  return (
    <div className="h-full flex flex-col gap-6 p-6 bg-mentat-background/80 rounded-lg border border-mentat-border/20">
      <SystemMetrics
        cpuUsage={cpuUsage}
        memoryUsage={memoryUsage}
        networkActivity={networkActivity}
        gpuUsage={gpuUsage}
        diskUsage={diskUsage}
        cpuHistory={cpuHistory}
        getStatusColor={getStatusColor}
      />

      <div className="flex-1">
        <h2 className="text-mentat-primary text-sm font-semibold mb-4">Active Projects</h2>
        <div className="space-y-4">
          {deployedProjects.map(project => (
            <ProjectCard
              key={project.id}
              project={project}
              getStatusColor={getStatusColor}
              formatTime={formatTime}
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

