
import React from 'react';
import { ResponsiveContainer, AreaChart, Area, Tooltip } from 'recharts';

interface MonitorCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  chart?: React.ReactNode;
  className?: string;
}

export const MonitorCard = ({ 
  icon, 
  title, 
  value,
  chart,
  className = ''
}: MonitorCardProps) => (
  <div className="p-2.5 rounded-lg border border-mentat-border/20 bg-mentat-secondary/5">
    <div className="flex items-center justify-between mb-1">
      <div className="flex items-center gap-1.5">
        <div className="text-mentat-primary/80">
          {icon}
        </div>
        <span className="text-mentat-highlight/80 text-xs font-medium">{title}</span>
      </div>
    </div>
    <div className={`text-lg font-semibold ${className}`}>{value}</div>
    {chart && (
      <div className="mt-1">
        {chart}
      </div>
    )}
  </div>
);

