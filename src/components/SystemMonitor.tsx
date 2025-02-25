
import { Cpu, Activity, Database, Network, HardDrive, Timer } from "lucide-react";
import { useState, useEffect } from "react";
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts';

interface DeployedProject {
  id: string;
  name: string;
  type: 'agent' | 'workflow';
  status: 'running' | 'paused' | 'error';
  resources: {
    cpu: number;
    memory: number;
    gpu: number;
  };
  estimatedCompletion?: Date;
  progress: number;
}

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
    <div className="h-full grid grid-cols-3 gap-4 p-4 backdrop-blur bg-mentat-background/50">
      {/* System Metrics Panel */}
      <div className="col-span-1 space-y-4">
        <h2 className="text-mentat-primary text-sm font-bold tracking-wider uppercase mb-4">System Metrics</h2>
        <div className="grid grid-cols-1 gap-4">
          <MonitorCard
            icon={<Cpu className="w-4 h-4" />}
            title="CPU Usage"
            value={`${cpuUsage.toFixed(1)}%`}
            chart={
              <ResponsiveContainer width="100%" height={40}>
                <AreaChart data={cpuHistory}>
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#00E5FF" 
                    fill="rgba(0, 229, 255, 0.1)"
                    strokeWidth={1}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      background: 'rgba(0, 29, 33, 0.9)',
                      border: '1px solid rgba(0, 229, 255, 0.2)',
                      borderRadius: '4px'
                    }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            }
            className={getStatusColor(cpuUsage)}
          />
          <MonitorCard
            icon={<Database className="w-4 h-4" />}
            title="Memory"
            value={`${memoryUsage.toFixed(1)}%`}
            className={getStatusColor(memoryUsage)}
          />
          <MonitorCard
            icon={<Network className="w-4 h-4" />}
            title="Network"
            value={`${networkActivity.toFixed(1)} MB/s`}
            className={getStatusColor(networkActivity)}
          />
          <MonitorCard
            icon={<Activity className="w-4 h-4" />}
            title="GPU"
            value={`${gpuUsage.toFixed(1)}%`}
            className={getStatusColor(gpuUsage)}
          />
          <MonitorCard
            icon={<HardDrive className="w-4 h-4" />}
            title="Disk Usage"
            value={`${diskUsage.toFixed(1)}%`}
            className={getStatusColor(diskUsage)}
          />
        </div>
      </div>

      {/* Deployed Projects Panel */}
      <div className="col-span-2 border-l border-mentat-border/20 pl-4">
        <h2 className="text-mentat-primary text-sm font-bold tracking-wider uppercase mb-4">Active Projects</h2>
        <div className="grid grid-cols-1 gap-4">
          {deployedProjects.map(project => (
            <div key={project.id} className="border border-mentat-border/20 rounded-lg p-4 bg-mentat-secondary/5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    project.status === 'running' ? 'bg-green-400' :
                    project.status === 'paused' ? 'bg-yellow-400' : 'bg-red-400'
                  }`} />
                  <span className="text-mentat-highlight font-medium">{project.name}</span>
                  <span className="text-xs text-mentat-primary/60 px-2 py-0.5 rounded-full border border-mentat-border/20">
                    {project.type}
                  </span>
                </div>
                {project.estimatedCompletion && (
                  <div className="flex items-center gap-1 text-xs text-mentat-primary/60">
                    <Timer className="w-3 h-3" />
                    {formatTime(project.estimatedCompletion)}
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-3">
                {Object.entries(project.resources).map(([key, value]) => (
                  <div key={key} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-mentat-primary/60">{key.toUpperCase()}</span>
                      <span className={getStatusColor(value)}>{value.toFixed(1)}%</span>
                    </div>
                    <div className="h-1 bg-mentat-secondary/10 rounded">
                      <div 
                        className={`h-full rounded transition-all duration-300 ${getStatusColor(value)}`}
                        style={{ width: `${value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-mentat-primary/60">Progress</span>
                  <span className="text-mentat-primary">{project.progress.toFixed(1)}%</span>
                </div>
                <div className="h-1 bg-mentat-secondary/10 rounded">
                  <div 
                    className="h-full bg-mentat-primary rounded transition-all duration-300"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="col-span-3 flex items-center justify-between text-xs text-mentat-primary/60 border-t border-mentat-border/20 pt-2">
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
          <span>All Systems Operational</span>
        </div>
        <span>Last updated: {new Date().toLocaleTimeString()}</span>
      </div>
    </div>
  );
};

const MonitorCard = ({ 
  icon, 
  title, 
  value,
  chart,
  className = ''
}: { 
  icon: React.ReactNode; 
  title: string; 
  value: string;
  chart?: React.ReactNode;
  className?: string;
}) => (
  <div className="border border-mentat-border/20 rounded-lg p-3 bg-mentat-secondary/5">
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center gap-2">
        <div className="text-mentat-primary/80">
          {icon}
        </div>
        <span className="text-mentat-highlight/80 text-xs font-medium">{title}</span>
      </div>
    </div>
    <div className={`text-xl font-semibold ${className}`}>{value}</div>
    {chart && (
      <div className="mt-2 opacity-80">
        {chart}
      </div>
    )}
  </div>
);

export default SystemMonitor;

