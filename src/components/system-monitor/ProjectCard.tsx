import React from 'react';
import { Cpu, Database, Activity, Timer } from "lucide-react";
import { DeployedProject } from './types';

interface ProjectCardProps {
  project: DeployedProject;
  getStatusColor: (value: number) => string;
  formatTime: (date: Date) => string;
}

export const ProjectCard = ({ project, getStatusColor, formatTime }: ProjectCardProps) => (
  <div className="h-[120px] p-2.5 rounded-lg border-2 border-mentat-border bg-mentat-secondary/20 backdrop-blur-[1px] shadow-[0_2px_10px_-4px_rgba(var(--mentat-border-rgb),0.2)] dark:shadow-[0_0_15px_-5px_rgba(var(--mentat-highlight-rgb),0.05)]">
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center gap-1.5 min-w-0">
        <div className={`w-1.5 h-1.5 shrink-0 rounded-full ${
          project.status === 'running' ? 'bg-green-400 shadow-[0_0_6px_rgba(74,222,128,0.4)]' :
          project.status === 'paused' ? 'bg-yellow-400 shadow-[0_0_6px_rgba(250,204,21,0.4)]' : 'bg-red-400 shadow-[0_0_6px_rgba(248,113,113,0.4)]'
        }`} />
        <span className="text-mentat-primary font-medium text-sm truncate">{project.name}</span>
      </div>
      {project.estimatedCompletion && (
        <div className="flex items-center gap-1 text-xs text-mentat-primary/60 shrink-0 bg-mentat-secondary/30 px-1.5 py-0.5 rounded border border-mentat-border/20 dark:border-mentat-highlight/5">
          <Timer className="w-3 h-3" />
          {formatTime(project.estimatedCompletion)}
        </div>
      )}
    </div>
    
    <div className="grid grid-cols-3 gap-1.5 mb-2">
      {Object.entries(project.resources).map(([key, value]) => (
        <div key={key} className="p-1 rounded bg-mentat-secondary/40 border border-mentat-border/20 dark:border-mentat-highlight/5">
          <div className="flex items-center justify-between mb-0.5">
            <div className="flex items-center gap-0.5">
              {key === 'cpu' && <Cpu className="w-3 h-3 text-mentat-primary/60" />}
              {key === 'memory' && <Database className="w-3 h-3 text-mentat-primary/60" />}
              {key === 'gpu' && <Activity className="w-3 h-3 text-mentat-primary/60" />}
              <span className="text-[10px] uppercase text-mentat-primary/60 font-medium">
                {key}
              </span>
            </div>
            <span className={`text-xs font-medium ${getStatusColor(value)}`}>
              {value.toFixed(0)}%
            </span>
          </div>
          <div className="h-1.5 bg-mentat-secondary/40 rounded-full overflow-hidden border border-mentat-border/10 dark:border-mentat-highlight/5">
            <div 
              className={`h-full rounded-full transition-all duration-300 ${getStatusColor(value)}`}
              style={{ width: `${value}%` }}
            />
          </div>
        </div>
      ))}
    </div>

    <div className="space-y-0.5">
      <div className="flex justify-between text-xs">
        <span className="text-mentat-primary/60">Progress</span>
        <span className="text-mentat-primary">{project.progress.toFixed(0)}%</span>
      </div>
      <div className="h-1.5 bg-mentat-secondary/40 rounded-full overflow-hidden border border-mentat-border/10 dark:border-mentat-highlight/5">
        <div 
          className="h-full bg-green-500 rounded-full transition-all duration-300"
          style={{ width: `${project.progress}%` }}
        />
      </div>
    </div>
  </div>
);

