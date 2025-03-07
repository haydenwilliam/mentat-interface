import React, { useState } from 'react';
import { Cpu, Activity, Database, Network, HardDrive } from "lucide-react";
import { MonitorCard } from './MonitorCard';
import DetailedMetricsModal, { MetricData } from './DetailedMetricsModal';
import { ResponsiveContainer, AreaChart, Area, Tooltip } from 'recharts';

interface SystemMetricsProps {
  cpuUsage: number;
  memoryUsage: number;
  networkActivity: number;
  gpuUsage: number;
  diskUsage: number;
  cpuHistory: MetricData[];
  memoryHistory: MetricData[];
  networkHistory: MetricData[];
  gpuHistory: MetricData[];
  diskHistory: MetricData[];
  getStatusColor: (value: number) => string;
}

// Default primary metric for each category
const defaultPrimaryMetrics = {
  cpu: 'usage',           // Overall CPU utilization is most important for users
  memory: 'usage',        // Overall memory percentage is most useful at a glance
  network: 'Download Rate', // Download speed is what most users care about for performance
  gpu: 'usage',           // Overall GPU utilization is most important for performance monitoring
  disk: 'Active Time'     // Disk activity is more relevant to performance than space usage
};

// Fixed mock metrics data that would come from the backend
const metricDetails = {
  cpu: {
    description: "CPU usage indicates the percentage of processor resources currently being utilized. High usage may indicate intensive processing demands or potential performance bottlenecks.",
    additionalMetrics: {
      "Processes": "124",
      "Threads": "1,482",
      "Kernel Time": "3.2%",
      "User Time": "42.8%",
      "Process Queue": "2",
      "Context Switches": "12,548/sec",
      "System Calls": "23,456/sec",
      "Interrupt Requests": "875/sec"
    }
  },
  memory: {
    description: "Memory usage represents the percentage of available RAM currently in use by applications and the system. High usage may result in reduced system performance and increased reliance on virtual memory.",
    additionalMetrics: {
      "Total Memory": "16.0 GB",
      "Free Memory": "6.4 GB",
      "Used Memory": "9.6 GB",
      "Cached Memory": "3.2 GB",
      "Swap Usage": "0.5 GB",
      "Page Faults": "256/sec",
      "Page Reads": "24/sec",
      "Commit Charge": "68%"
    }
  },
  network: {
    description: "Network activity measures data transfer rates between your system and network connections. High activity is normal during file transfers, streaming, or when multiple internet-connected applications are running.",
    additionalMetrics: {
      "Download Rate": "3.2 MB/s",
      "Upload Rate": "0.8 MB/s",
      "Active Connections": "42",
      "TCP Connections": "38",
      "UDP Connections": "4",
      "Packets Received": "1,245/sec",
      "Packets Sent": "876/sec",
      "Errors": "0"
    },
    unit: "MB/s"
  },
  gpu: {
    description: "GPU usage shows the percentage of graphics processing resources currently in use. High usage is expected during gaming, video editing, and 3D applications, but unusual in standard productivity tasks.",
    additionalMetrics: {
      "Core Clock": "1,450 MHz",
      "Memory Clock": "7,000 MHz",
      "Temperature": "62°C",
      "VRAM Usage": "3.2 GB / 8.0 GB",
      "Power Draw": "120W",
      "Fan Speed": "45%",
      "Shader Units Active": "82%",
      "Encoding Load": "15%"
    }
  },
  disk: {
    description: "Disk usage indicates both storage capacity utilization and I/O activity. High usage or persistent activity can impact system responsiveness when accessing files or launching applications.",
    additionalMetrics: {
      "Read Rate": "28 MB/s",
      "Write Rate": "12 MB/s",
      "Active Time": "18%",
      "Queue Length": "0.8",
      "Available Space": "425 GB / 1 TB",
      "Fragmentation": "2%",
      "Response Time": "12 ms",
      "IOPS": "145"
    }
  }
};

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
}: SystemMetricsProps) => {
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
  const [primaryMetrics, setPrimaryMetrics] = useState(defaultPrimaryMetrics);

  // Handler for setting a primary metric
  const handleSetPrimaryMetric = (metricType: string, metricName: string) => {
    setPrimaryMetrics(prev => ({
      ...prev,
      [metricType]: metricName
    }));
  };

  // Get display value for a metric based on primary metric selection
  const getDisplayValue = (type: string) => {
    const primary = primaryMetrics[type as keyof typeof primaryMetrics];
    
    // First handle the usage case for backward compatibility
    if (primary === 'usage') {
      switch(type) {
        case 'cpu': return `${cpuUsage.toFixed(1)}%`;
        case 'memory': return `${memoryUsage.toFixed(1)}%`;
        case 'network': return `${networkActivity.toFixed(1)} MB/s`;
        case 'gpu': return `${gpuUsage.toFixed(1)}%`;
        case 'disk': return `${diskUsage.toFixed(1)}%`;
        default: return '';
      }
    } 
    // Handle the default metrics we've set
    else if (type === 'cpu' && primary === 'Kernel Time') {
      return `${(cpuUsage * 0.15).toFixed(1)}%`; // Simulate kernel time as a portion of total CPU
    }
    else if (type === 'memory' && primary === 'Memory Usage') {
      return `${(memoryUsage * 16 / 100).toFixed(1)} GB`; // Simulate used memory based on percentage
    }
    else if (type === 'network' && primary === 'Download Rate') {
      return `${(networkActivity * 0.8).toFixed(1)} MB/s`; // Simulate download as 80% of total network
    }
    else if (type === 'gpu' && primary === 'Temperature') {
      return `${(45 + gpuUsage * 0.4).toFixed(1)}°C`; // Simulate temperature based on GPU usage
    }
    else if (type === 'disk' && primary === 'Active Time') {
      return `${(diskUsage * 0.7).toFixed(1)}%`; // Simulate active time as portion of disk usage
    }
    // Return the selected additional metric if available
    else {
      const additionalMetrics = metricDetails[type as keyof typeof metricDetails]?.additionalMetrics || {};
      return additionalMetrics[primary] || '';
    }
  };

  // Get current value and history based on selected metric
  const getCurrentValue = () => {
    switch(selectedMetric) {
      case 'cpu': return cpuUsage;
      case 'memory': return memoryUsage;
      case 'network': return networkActivity;
      case 'gpu': return gpuUsage;
      case 'disk': return diskUsage;
      default: return 0;
    }
  };

  const getHistory = () => {
    switch(selectedMetric) {
      case 'cpu': return cpuHistory;
      case 'memory': return memoryHistory;
      case 'network': return networkHistory;
      case 'gpu': return gpuHistory;
      case 'disk': return diskHistory;
      default: return [];
    }
  };

  // Get icon for selected metric
  const getIcon = () => {
    switch(selectedMetric) {
      case 'cpu': return <Cpu className="w-6 h-6 text-mentat-primary" />;
      case 'memory': return <Database className="w-6 h-6 text-mentat-primary" />;
      case 'network': return <Network className="w-6 h-6 text-mentat-primary" />;
      case 'gpu': return <Activity className="w-6 h-6 text-mentat-primary" />;
      case 'disk': return <HardDrive className="w-6 h-6 text-mentat-primary" />;
      default: return null;
    }
  };

  // Get title for selected metric
  const getTitle = () => {
    switch(selectedMetric) {
      case 'cpu': return 'CPU';
      case 'memory': return 'Memory';
      case 'network': return 'Network';
      case 'gpu': return 'GPU';
      case 'disk': return 'Disk';
      default: return '';
    }
  };

  // Get unit for selected metric
  const getUnit = () => {
    if (!selectedMetric) return '%';
    
    const primary = primaryMetrics[selectedMetric as keyof typeof primaryMetrics];
    
    if (primary === 'usage') {
      return selectedMetric === 'network' ? 'MB/s' : '%';
    }
    
    // Return appropriate unit based on the primary metric
    if (selectedMetric === 'cpu') {
      if (primary === 'Kernel Time' || primary === 'User Time') return '%';
      if (primary === 'Context Switches' || primary === 'System Calls' || primary === 'Interrupt Requests') return '/sec';
      return '';
    }
    if (selectedMetric === 'memory') {
      if (primary === 'Page Faults' || primary === 'Page Reads') return '/sec';
      if (primary.includes('Memory') || primary === 'Memory Usage' || primary === 'Swap Usage') return 'GB';
      return '';
    }
    if (selectedMetric === 'network') {
      if (primary === 'Download Rate' || primary === 'Upload Rate') return 'MB/s';
      if (primary === 'Packets Received' || primary === 'Packets Sent') return '/sec';
      return '';
    }
    if (selectedMetric === 'gpu') {
      if (primary === 'usage' || primary === 'Fan Speed' || primary === 'Shader Units Active' || primary === 'Encoding Load') return '%';
      if (primary === 'Core Clock' || primary === 'Memory Clock') return 'MHz';
      if (primary === 'Temperature') return '°C';
      if (primary === 'Power Draw') return 'W';
      if (primary === 'VRAM Usage') return 'GB';
      return '';
    }
    if (selectedMetric === 'disk') {
      if (primary === 'usage' || primary === 'Active Time' || primary === 'Fragmentation') return '%';
      if (primary === 'Read Rate' || primary === 'Write Rate') return 'MB/s';
      if (primary === 'Response Time') return 'ms';
      if (primary === 'Available Space') return 'GB';
      return '';
    }
    
    return '%';
  };

  // Get additional metrics for selected metric
  const getAdditionalMetrics = () => {
    if (!selectedMetric) return {};
    return metricDetails[selectedMetric as keyof typeof metricDetails]?.additionalMetrics || {};
  };

  // Get description for selected metric
  const getDescription = () => {
    if (!selectedMetric) return '';
    return metricDetails[selectedMetric as keyof typeof metricDetails]?.description || '';
  };

  // Get display title for each card including primary metric
  const getCardTitle = (type: string, baseTitle: string) => {
    const primary = primaryMetrics[type as keyof typeof primaryMetrics];
    return `${baseTitle}: ${primary}`;
  };

  return (
    <>
      <div className="bg-mentat-secondary/10 rounded-xl p-5 border border-mentat-border/30">
        <div className="grid grid-cols-5 gap-4">
          <MonitorCard
            icon={<Cpu className="w-5 h-5" />}
            title={getCardTitle('cpu', 'CPU')}
            value={getDisplayValue('cpu')}
            className={getStatusColor(cpuUsage)}
            onClick={() => setSelectedMetric('cpu')}
          />
          <MonitorCard
            icon={<Database className="w-5 h-5" />}
            title={getCardTitle('memory', 'Memory')}
            value={getDisplayValue('memory')}
            className={getStatusColor(memoryUsage)}
            onClick={() => setSelectedMetric('memory')}
          />
          <MonitorCard
            icon={<Network className="w-5 h-5" />}
            title={getCardTitle('network', 'Network')}
            value={getDisplayValue('network')}
            className={getStatusColor(networkActivity)}
            onClick={() => setSelectedMetric('network')}
          />
          <MonitorCard
            icon={<Activity className="w-5 h-5" />}
            title={getCardTitle('gpu', 'GPU')}
            value={getDisplayValue('gpu')}
            className={getStatusColor(gpuUsage)}
            onClick={() => setSelectedMetric('gpu')}
          />
          <MonitorCard
            icon={<HardDrive className="w-5 h-5" />}
            title={getCardTitle('disk', 'Disk')}
            value={getDisplayValue('disk')}
            className={getStatusColor(diskUsage)}
            onClick={() => setSelectedMetric('disk')}
          />
        </div>
      </div>

      {/* Detailed Metrics Modal */}
      {selectedMetric && (
        <DetailedMetricsModal
          isOpen={selectedMetric !== null}
          onClose={() => setSelectedMetric(null)}
          title={getTitle()}
          icon={getIcon()}
          currentValue={getCurrentValue()}
          historyData={getHistory()}
          additionalMetrics={getAdditionalMetrics()}
          unit={getUnit()}
          detailedDescription={getDescription()}
          onSetPrimaryMetric={handleSetPrimaryMetric}
          primaryMetric={primaryMetrics[selectedMetric as keyof typeof primaryMetrics]}
        />
      )}
    </>
  );
};

const getChartColor = (value: number): string => {
  if (value >= 80) return "rgb(239, 68, 68)"; // red
  if (value >= 60) return "rgb(245, 158, 11)"; // amber
  return "rgb(34, 197, 94)"; // green
};

const createChart = (data: MetricData[], color: string = "rgb(34, 197, 94)") => (
  <ResponsiveContainer width="100%" height={35}>
    <AreaChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
      <Area 
        type="monotone" 
        dataKey="value" 
        stroke={color} 
        fill={`${color.replace(')', ', 0.1)')}`}
        strokeWidth={1.5}
      />
      <Tooltip 
        contentStyle={{ 
          background: 'rgba(0, 0, 0, 0.65)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '4px',
          fontSize: '12px',
          padding: '4px 8px'
        }}
        formatter={(value: number) => [`${value.toFixed(1)}%`, 'Value']}
        labelFormatter={() => ''}
      />
    </AreaChart>
  </ResponsiveContainer>
);

