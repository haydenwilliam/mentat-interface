
import { useState, useEffect } from "react";
import { DeployedProject } from "@/components/system-monitor/types";

export const useSystemMonitor = () => {
  const [cpuUsage, setCpuUsage] = useState(0);
  const [memoryUsage, setMemoryUsage] = useState(0);
  const [networkActivity, setNetworkActivity] = useState(0);
  const [gpuUsage, setGpuUsage] = useState(0);
  const [diskUsage, setDiskUsage] = useState(0);
  
  const [cpuHistory, setCpuHistory] = useState<{ time: number; value: number; }[]>([]);
  const [memoryHistory, setMemoryHistory] = useState<{ time: number; value: number; }[]>([]);
  const [networkHistory, setNetworkHistory] = useState<{ time: number; value: number; }[]>([]);
  const [gpuHistory, setGpuHistory] = useState<{ time: number; value: number; }[]>([]);
  const [diskHistory, setDiskHistory] = useState<{ time: number; value: number; }[]>([]);
  
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
    },
    {
      id: "3",
      name: "Analysis Pipeline",
      type: "workflow",
      status: "running",
      resources: { cpu: 55, memory: 40, gpu: 75 },
      estimatedCompletion: new Date(Date.now() + 45 * 60000),
      progress: 80
    },
    {
      id: "4",
      name: "Inference Service",
      type: "agent",
      status: "running",
      resources: { cpu: 70, memory: 85, gpu: 95 },
      estimatedCompletion: new Date(Date.now() + 60 * 60000),
      progress: 25
    },
    {
      id: "5",
      name: "Model Optimization",
      type: "workflow",
      status: "running",
      resources: { cpu: 65, memory: 75, gpu: 85 },
      estimatedCompletion: new Date(Date.now() + 90 * 60000),
      progress: 45
    },
    {
      id: "6",
      name: "Data Validation",
      type: "agent",
      status: "running",
      resources: { cpu: 35, memory: 50, gpu: 20 },
      estimatedCompletion: new Date(Date.now() + 15 * 60000),
      progress: 90
    }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newCpuUsage = Math.random() * 100;
      const newMemoryUsage = Math.random() * 100;
      const newNetworkActivity = Math.random() * 100;
      const newGpuUsage = Math.random() * 100;
      const newDiskUsage = Math.random() * 100;
      
      setCpuUsage(newCpuUsage);
      setMemoryUsage(newMemoryUsage);
      setNetworkActivity(newNetworkActivity);
      setGpuUsage(newGpuUsage);
      setDiskUsage(newDiskUsage);
      
      const now = Date.now();
      const updateHistory = (prev: { time: number; value: number; }[], newValue: number) => 
        [...prev.slice(-20), { time: now, value: newValue }];
      
      setCpuHistory(prev => updateHistory(prev, newCpuUsage));
      setMemoryHistory(prev => updateHistory(prev, newMemoryUsage));
      setNetworkHistory(prev => updateHistory(prev, newNetworkActivity));
      setGpuHistory(prev => updateHistory(prev, newGpuUsage));
      setDiskHistory(prev => updateHistory(prev, newDiskUsage));

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

  return {
    metrics: {
      cpuUsage,
      memoryUsage,
      networkActivity,
      gpuUsage,
      diskUsage,
      cpuHistory,
      memoryHistory,
      networkHistory,
      gpuHistory,
      diskHistory
    },
    deployedProjects,
    utils: {
      getStatusColor,
      formatTime
    }
  };
};
