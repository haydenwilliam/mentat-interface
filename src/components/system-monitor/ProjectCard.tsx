
import React from 'react';
import { Cpu, Database, Activity, Timer } from "lucide-react";
import { DeployedProject } from './types';

interface ProjectCardProps {
  project: DeployedProject;
  getStatusColor: (value: number) => string;
  formatTime: (date: Date) => string;
}

export const ProjectCard = ({ project, getStatusColor, formatTime }: ProjectCardProps) => (
  <div className="p-4 rounded-lg border border-mentat-border/20 bg-mentat-secondary/5">
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
);

