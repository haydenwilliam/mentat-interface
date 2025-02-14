
import { Cpu, Activity, Database, Network } from "lucide-react";
import { useState, useEffect } from "react";

const SystemMonitor = () => {
  const [cpuUsage, setCpuUsage] = useState(0);
  const [memoryUsage, setMemoryUsage] = useState(0);
  const [networkActivity, setNetworkActivity] = useState(0);

  useEffect(() => {
    // Simulate system monitoring
    const interval = setInterval(() => {
      setCpuUsage(Math.random() * 100);
      setMemoryUsage(Math.random() * 100);
      setNetworkActivity(Math.random() * 100);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <MonitorCard
        icon={<Cpu className="w-5 h-5" />}
        title="CPU Usage"
        value={`${cpuUsage.toFixed(1)}%`}
      />
      <MonitorCard
        icon={<Database className="w-5 h-5" />}
        title="Memory"
        value={`${memoryUsage.toFixed(1)}%`}
      />
      <MonitorCard
        icon={<Network className="w-5 h-5" />}
        title="Network"
        value={`${networkActivity.toFixed(1)} KB/s`}
      />
      <MonitorCard
        icon={<Activity className="w-5 h-5" />}
        title="System Status"
        value="OPTIMAL"
      />
    </div>
  );
};

const MonitorCard = ({ icon, title, value }: { icon: React.ReactNode; title: string; value: string }) => (
  <div className="retro-container glow-border">
    <div className="flex items-center justify-between mb-2">
      <span className="text-mentat-highlight/80 text-sm">{title}</span>
      {icon}
    </div>
    <div className="text-2xl font-bold retro-text">{value}</div>
  </div>
);

export default SystemMonitor;
