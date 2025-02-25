
import { Cpu, Activity, Database, Network, HardDrive, Timer } from "lucide-react";
import { useState, useEffect } from "react";
import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis } from 'recharts';

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
    <div className="h-full flex flex-col gap-6 p-6 bg-mentat-background/80 rounded-lg border border-mentat-border/20">
      {/* System Metrics Panel */}
      <div className="grid grid-cols-5 gap-4">
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
                  stroke="rgb(34, 197, 94)" 
                  fill="rgba(34, 197, 94, 0.1)"
                  strokeWidth={1}
                />
                <Tooltip 
                  contentStyle={{ 
                    background: 'rgba(0, 0, 0, 0.8)',
                    border: 'none',
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

      {/* Deployed Projects Panel */}
      <div className="flex-1">
        <h2 className="text-mentat-primary text-sm font-semibold mb-4">Active Projects</h2>
        <div className="space-y-4">
          {deployedProjects.map(project => (
            <div key={project.id} className="p-4 rounded-lg border border-mentat-border/20 bg-mentat-secondary/5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    project.status === 'running' ? 'bg-green-400' :
                    project.status === 'paused' ? 'bg-yellow-400' : 'bg-red-400'
                  }`} />
                  <span className="text-mentat-primary font-medium">{project.name}</span>
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
              
              {/* Updated Resource Usage Display */}
              <div className="grid grid-cols-3 gap-4 mb-3">
                {Object.entries(project.resources).map(([key, value]) => (
                  <div key={key} className="p-2 rounded bg-mentat-secondary/10">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-1.5">
                        {key === 'cpu' && <Cpu className="w-3 h-3 text-mentat-primary/60" />}
                        {key === 'memory' && <Database className="w-3 h-3 text-mentat-primary/60" />}
                        {key === 'gpu' && <Activity className="w-3 h-3 text-mentat-primary/60" />}
                        <span className="text-xs font-medium text-mentat-primary/80">{key.toUpperCase()}</span>
                      </div>
                      <span className={`text-xs font-medium ${getStatusColor(value)}`}>
                        {value.toFixed(1)}%
                      </span>
                    </div>
                    <div className="h-1.5 bg-mentat-secondary/20 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-300 ${getStatusColor(value)}`}
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
                <div className="h-1.5 bg-mentat-secondary/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-500 rounded-full transition-all duration-300"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>
            </div>
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
  <div className="p-4 rounded-lg border border-mentat-border/20 bg-mentat-secondary/5">
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
      <div className="mt-2">
        {chart}
      </div>
    )}
  </div>
);

export default SystemMonitor;
