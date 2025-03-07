import React from 'react';
import { ExternalLink } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, Tooltip } from 'recharts';

interface MonitorCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  chart?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const MonitorCard = ({ 
  icon, 
  title, 
  value,
  chart,
  className = '',
  onClick
}: MonitorCardProps) => (
  <div 
    className={`mentat-card h-[130px] p-3.5 bg-mentat-secondary/30 border border-mentat-border/30 relative group transition-all duration-200 ${onClick ? 'cursor-pointer hover:bg-mentat-secondary/40 hover:border-mentat-border/50 hover:shadow-lg transform hover:-translate-y-0.5' : ''}`}
    onClick={onClick}
  >
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center gap-2">
        <div className="text-mentat-highlight">
          {icon}
        </div>
        <span className="text-mentat-highlight text-sm font-medium">{title}</span>
      </div>

      {onClick && (
        <div className="opacity-40 group-hover:opacity-100 transition-opacity duration-200">
          <ExternalLink className="w-3 h-3 text-mentat-highlight/70 group-hover:text-mentat-highlight" />
        </div>
      )}
    </div>
    <div className={`text-xl font-semibold ${className} mb-1`}>{value}</div>
    {chart && (
      <div className="mt-3">
        {chart}
      </div>
    )}
    {onClick && (
      <div className="absolute inset-0 bg-mentat-primary/5 opacity-0 group-hover:opacity-100 rounded-[inherit] pointer-events-none transition-opacity duration-200"></div>
    )}
  </div>
);

