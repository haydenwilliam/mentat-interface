
import { Cpu, Activity, Database, Network, HardDrive, Gpu } from "lucide-react";
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
    // Simulate system monitoring
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
    <div className="space-y-4">
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
          icon={<Gpu className="w-5 h-5" />}
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
  <div className="retro-container glow-border">
    <div className="flex items-center justify-between mb-2">
      <span className="text-mentat-highlight/80 text-sm">{title}</span>
      {icon}
    </div>
    <div className="text-2xl font-bold retro-text">{value}</div>
    {chart && <div className="mt-2">{chart}</div>}
  </div>
);

export default SystemMonitor;
