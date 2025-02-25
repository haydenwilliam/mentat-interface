
import { Cpu, Activity, Database, Network, HardDrive, Timer, AlertTriangle } from "lucide-react";
import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, AreaChart, Area } from 'recharts';

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
      estimatedCompletion: new Date(Date.now() + 30 * 60000), // 30 minutes from now
      progress: 65
    },
    {
      id: "2",
      name: "Training Workflow",
      type: "workflow",
      status: "running",
      resources: { cpu: 85, memory: 70, gpu: 90 },
      estimatedCompletion: new Date(Date.now() + 120 * 60000), // 2 hours from now
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

      // Update deployed projects
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
    <div className="space-y-6 neo-grid p-6 rounded-lg border border-mentat-primary/20 backdrop-blur">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-mentat-primary animate-pulse"></div>
          <h2 className="text-mentat-primary text-sm font-bold tracking-wider uppercase">System Status Monitor</h2>
        </div>
        <div className="text-mentat-primary/60 text-xs">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>

      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <MonitorCard
          icon={<Cpu className="w-5 h-5" />}
          title="CPU Usage"
          value={`${cpuUsage.toFixed(1)}%`}
          chart={
            <ResponsiveContainer width="100%" height={60}>
              <AreaChart data={cpuHistory}>
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#00E5FF" 
                  fill="rgba(0, 229, 255, 0.1)"
                  strokeWidth={2}
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
          icon={<Database className="w-5 h-5" />}
          title="Memory"
          value={`${memoryUsage.toFixed(1)}%`}
          className={getStatusColor(memoryUsage)}
        />
        <MonitorCard
          icon={<Network className="w-5 h-5" />}
          title="Network"
          value={`${networkActivity.toFixed(1)} MB/s`}
          className={getStatusColor(networkActivity)}
        />
        <MonitorCard
          icon={<Activity className="w-5 h-5" />}
          title="GPU"
          value={`${gpuUsage.toFixed(1)}%`}
          className={getStatusColor(gpuUsage)}
        />
        <MonitorCard
          icon={<HardDrive className="w-5 h-5" />}
          title="Disk Usage"
          value={`${diskUsage.toFixed(1)}%`}
          className={getStatusColor(diskUsage)}
        />
        <MonitorCard
          icon={<Activity className="w-5 h-5" />}
          title="System Status"
          value="OPTIMAL"
          className="text-green-400"
        />
      </div>

      {/* Deployed Projects Section */}
      <div className="mt-8">
        <h3 className="text-mentat-primary text-sm font-bold tracking-wider uppercase mb-4">Deployed Projects</h3>
        <div className="space-y-4">
          {deployedProjects.map(project => (
            <div key={project.id} className="retro-container glow-border p-4 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    project.status === 'running' ? 'bg-green-400' :
                    project.status === 'paused' ? 'bg-yellow-400' : 'bg-red-400'
                  }`} />
                  <span className="text-mentat-highlight text-sm font-semibold">{project.name}</span>
                  <span className="text-xs text-mentat-primary/60 px-2 py-0.5 rounded-full border border-mentat-border">
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
              
              {/* Resource Usage Bars */}
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-mentat-primary/60">CPU</span>
                    <span className={getStatusColor(project.resources.cpu)}>{project.resources.cpu.toFixed(1)}%</span>
                  </div>
                  <div className="h-1 bg-mentat-secondary/20 rounded">
                    <div 
                      className={`h-full rounded ${getStatusColor(project.resources.cpu)}`}
                      style={{ width: `${project.resources.cpu}%` }}
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-mentat-primary/60">Memory</span>
                    <span className={getStatusColor(project.resources.memory)}>{project.resources.memory.toFixed(1)}%</span>
                  </div>
                  <div className="h-1 bg-mentat-secondary/20 rounded">
                    <div 
                      className={`h-full rounded ${getStatusColor(project.resources.memory)}`}
                      style={{ width: `${project.resources.memory}%` }}
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-mentat-primary/60">GPU</span>
                    <span className={getStatusColor(project.resources.gpu)}>{project.resources.gpu.toFixed(1)}%</span>
                  </div>
                  <div className="h-1 bg-mentat-secondary/20 rounded">
                    <div 
                      className={`h-full rounded ${getStatusColor(project.resources.gpu)}`}
                      style={{ width: `${project.resources.gpu}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-mentat-primary/60">Progress</span>
                  <span className="text-mentat-primary">{project.progress.toFixed(1)}%</span>
                </div>
                <div className="h-1 bg-mentat-secondary/20 rounded">
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

      <div className="grid grid-cols-2 gap-2 mt-4 text-xs text-mentat-primary/60">
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
          <span>All Systems Operational</span>
        </div>
        <div className="flex items-center gap-1 justify-end">
          <div className="w-1.5 h-1.5 rounded-full bg-mentat-primary animate-ping"></div>
          <span>Real-time Monitoring Active</span>
        </div>
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
  <div className="retro-container glow-border monitor-card backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:z-10">
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2">
        <div className="text-mentat-primary/80 transition-colors duration-300 hover:text-mentat-primary">
          {icon}
        </div>
        <span className="text-mentat-highlight/80 text-sm font-bold tracking-[0.2em] uppercase">{title}</span>
      </div>
      <div className="flex space-x-1">
        <div className="w-1 h-1 rounded-full bg-mentat-primary/60"></div>
        <div className="w-1 h-1 rounded-full bg-mentat-primary/40"></div>
        <div className="w-1 h-1 rounded-full bg-mentat-primary/20"></div>
      </div>
    </div>
    <div className={`text-3xl font-bold retro-text tracking-tight ${className}`}>{value}</div>
    {chart && (
      <div className="mt-4 opacity-80 hover:opacity-100 transition-opacity duration-300">
        {chart}
      </div>
    )}
  </div>
);

export default SystemMonitor;

