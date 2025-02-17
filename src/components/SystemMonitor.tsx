import { Cpu, Activity, Database, Network, HardDrive } from "lucide-react";
import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

const SystemMonitor = () => {
  const [cpuUsage, setCpuUsage] = useState(0);
  const [memoryUsage, setMemoryUsage] = useState(0);
  const [networkActivity, setNetworkActivity] = useState(0);
  const [gpuUsage, setGpuUsage] = useState(0);
  const [diskUsage, setDiskUsage] = useState(0);
  const [cpuHistory, setCpuHistory] = useState<{ time: number; value: number; }[]>([]);

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
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-4 neo-grid p-6 rounded-lg border border-mentat-primary/20 backdrop-blur">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-mentat-primary animate-pulse"></div>
          <h2 className="text-mentat-primary text-sm font-bold tracking-wider uppercase">System Status Monitor</h2>
        </div>
        <div className="text-mentat-primary/60 text-xs">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <MonitorCard
          icon={<Cpu className="w-5 h-5" />}
          title="CPU Usage"
          value={`${cpuUsage.toFixed(1)}%`}
          chart={
            <ResponsiveContainer width="100%" height={60}>
              <LineChart data={cpuHistory}>
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#00E5FF" 
                  strokeWidth={2}
                  dot={false}
                />
                <Tooltip 
                  contentStyle={{ 
                    background: 'rgba(0, 29, 33, 0.9)',
                    border: '1px solid rgba(0, 229, 255, 0.2)',
                    borderRadius: '4px'
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          }
        />
        <MonitorCard
          icon={<Database className="w-5 h-5" />}
          title="Memory"
          value={`${memoryUsage.toFixed(1)}%`}
        />
        <MonitorCard
          icon={<Network className="w-5 h-5" />}
          title="Network"
          value={`${networkActivity.toFixed(1)} MB/s`}
        />
        <MonitorCard
          icon={<Activity className="w-5 h-5" />}
          title="GPU"
          value={`${gpuUsage.toFixed(1)}%`}
        />
        <MonitorCard
          icon={<HardDrive className="w-5 h-5" />}
          title="Disk Usage"
          value={`${diskUsage.toFixed(1)}%`}
        />
        <MonitorCard
          icon={<Activity className="w-5 h-5" />}
          title="System Status"
          value="OPTIMAL"
        />
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
  chart 
}: { 
  icon: React.ReactNode; 
  title: string; 
  value: string;
  chart?: React.ReactNode;
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
    <div className="text-3xl font-bold retro-text tracking-tight">{value}</div>
    {chart && (
      <div className="mt-4 opacity-80 hover:opacity-100 transition-opacity duration-300">
        {chart}
      </div>
    )}
  </div>
);

export default SystemMonitor;
