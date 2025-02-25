
export interface DeployedProject {
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

