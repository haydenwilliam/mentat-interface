
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
  getStatusColor: (value: number) => string;
}

export const SystemMetrics = ({
  cpuUsage,
  memoryUsage,
  networkActivity,
  gpuUsage,
  diskUsage,
  cpuHistory,
  getStatusColor,
}: SystemMetricsProps) => (
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
);

