
import React from 'react';
import { Cpu, Activity, Database, Network, HardDrive } from "lucide-react";
import { MonitorCard } from './MonitorCard';
import { ResponsiveContainer, AreaChart, Area, Tooltip } from 'recharts';

interface SystemMetricsProps {
  cpuUsage: number;
  memoryUsage: number;
  networkActivity: number;
  gpuUsage: number;
  diskUsage: number;
  cpuHistory: { time: number; value: number; }[];
  memoryHistory: { time: number; value: number; }[];
  networkHistory: { time: number; value: number; }[];
  gpuHistory: { time: number; value: number; }[];
  diskHistory: { time: number; value: number; }[];
  getStatusColor: (value: number) => string;
}

const createChart = (data: { time: number; value: number; }[]) => (
  <ResponsiveContainer width="100%" height={25}>
    <AreaChart data={data}>
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
        formatter={(value: number) => [`${value.toFixed(1)}%`]}
        labelFormatter={() => ''}
      />
    </AreaChart>
  </ResponsiveContainer>
);

export const SystemMetrics = ({
  cpuUsage,
  memoryUsage,
  networkActivity,
  gpuUsage,
  diskUsage,
  cpuHistory,
  memoryHistory,
  networkHistory,
  gpuHistory,
  diskHistory,
  getStatusColor,
}: SystemMetricsProps) => (
  <div>
    <h2 className="text-lg font-semibold mb-3 text-mentat-primary">System Health</h2>
    <div className="grid grid-cols-5 gap-3">
      <MonitorCard
        icon={<Cpu className="w-4 h-4" />}
        title="CPU Usage"
        value={`${cpuUsage.toFixed(1)}%`}
        chart={createChart(cpuHistory)}
        className={getStatusColor(cpuUsage)}
      />
      <MonitorCard
        icon={<Database className="w-4 h-4" />}
        title="Memory"
        value={`${memoryUsage.toFixed(1)}%`}
        chart={createChart(memoryHistory)}
        className={getStatusColor(memoryUsage)}
      />
      <MonitorCard
        icon={<Network className="w-4 h-4" />}
        title="Network"
        value={`${networkActivity.toFixed(1)} MB/s`}
        chart={createChart(networkHistory)}
        className={getStatusColor(networkActivity)}
      />
      <MonitorCard
        icon={<Activity className="w-4 h-4" />}
        title="GPU"
        value={`${gpuUsage.toFixed(1)}%`}
        chart={createChart(gpuHistory)}
        className={getStatusColor(gpuUsage)}
      />
      <MonitorCard
        icon={<HardDrive className="w-4 h-4" />}
        title="Disk Usage"
        value={`${diskUsage.toFixed(1)}%`}
        chart={createChart(diskHistory)}
        className={getStatusColor(diskUsage)}
      />
    </div>
  </div>
);

