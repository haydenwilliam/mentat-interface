import React, { useState, useEffect } from 'react';
import { XCircle, Info, Clock, ChevronDown } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// Types for metric data
export interface MetricData {
  time: number;
  value: number;
}

interface DetailedMetricsModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  icon: React.ReactNode;
  currentValue: number;
  historyData: MetricData[];
  additionalMetrics?: {
    [key: string]: string | number;
  };
  unit?: string;
  detailedDescription?: string;
  onSetPrimaryMetric?: (metricType: string, metricName: string) => void;
  primaryMetric?: string;
}

// Component for metric tooltips
const MetricTooltip = ({ title, description, position = 'left' }: { title: string, description: string, position?: 'left' | 'right' }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  return (
    <div className="relative inline-flex items-center">
      <button
        className={`p-1 -m-1 rounded-full text-mentat-primary/70 hover:text-mentat-highlight transition-all duration-200 hover:scale-110 hover:shadow-glow ${isVisible ? 'text-mentat-highlight shadow-glow' : ''}`}
        onClick={() => setIsVisible(!isVisible)}
        onMouseLeave={() => setIsVisible(false)}
      >
        <Info className="w-4 h-4" />
      </button>
      
      {isVisible && (
        <div className={`absolute z-50 bottom-full ${position === 'left' ? 'left-0' : 'right-0'} transform -translate-y-2 w-72 p-4 rounded-lg bg-mentat-background/60 border-2 border-mentat-border/80 shadow-lg backdrop-blur-md`}>
          <h4 className="font-medium text-mentat-highlight mb-2 text-sm">{title}</h4>
          <p className="text-mentat-primary/90 leading-relaxed text-sm">{description}</p>
          <div className={`absolute bottom-0 ${position === 'left' ? 'left-4' : 'right-4'} transform translate-y-1/2 rotate-45 w-3 h-3 bg-mentat-background/60 border-r-2 border-b-2 border-mentat-border/80`}></div>
        </div>
      )}
    </div>
  );
};

// Tooltips data for additional metrics
const metricTooltips: Record<string, Record<string, string>> = {
  cpu: {
    "Processes": "Independent programs currently running on your computer, each performing specific functions.",
    "Threads": "Smaller tasks within processes that can run simultaneously, improving efficiency and responsiveness.",
    "Kernel Time": "Time spent by your processor handling core system operations and hardware management.",
    "User Time": "Time spent by your processor running your applications and programs.",
    "Process Queue": "Number of programs waiting for processor time, which can indicate processing bottlenecks.",
    "Context Switches": "Frequency at which your computer shifts between different processes, affecting efficiency.",
    "System Calls": "Frequency of requests from programs to the operating system for specific services.",
    "Interrupt Requests": "Frequency of time-critical signals from hardware components requiring immediate attention."
  },
  memory: {
    "Total Memory": "Total amount of RAM installed on your system for temporary data storage and program execution.",
    "Free Memory": "Amount of RAM not currently in use and available for new programs or operations.",
    "Memory Usage": "Amount of RAM currently occupied by running programs and system processes.",
    "Cached Memory": "RAM used to store recently accessed data for faster retrieval if needed again.",
    "Swap Usage": "Hard drive space being used as virtual memory when RAM becomes full.",
    "Page Faults": "Frequency of instances when the processor needs data not currently in RAM.",
    "Page Reads": "Frequency of data being transferred from storage to RAM."
  },
  network: {
    "Download Rate": "Speed at which your computer is receiving data from the internet or local network.",
    "Upload Rate": "Speed at which your computer is sending data to the internet or local network.",
    "Active Connections": "Number of open communication channels between your computer and other devices or servers.",
    "TCP Connections": "Number of reliable, error-checked network connections with delivery confirmation.",
    "UDP Connections": "Number of faster but less reliable network connections used for time-sensitive data.",
    "Packets Received": "Rate at which your computer is receiving units of network data.",
    "Packets Sent": "Rate at which your computer is sending units of network data.",
    "Errors": "Number of failed network data transmissions, potentially indicating connectivity issues."
  },
  gpu: {
    "Core Clock": "Operating speed of your graphics processor, affecting rendering performance.",
    "Memory Clock": "Operating speed of your graphics card's dedicated memory.",
    "Temperature": "Current operating temperature of your graphics processor.",
    "VRAM Usage": "Amount of video memory being used by graphics-intensive applications.",
    "Power Draw": "Amount of electricity your graphics card is consuming.",
    "Fan Speed": "Speed at which cooling fans are operating to maintain safe GPU temperatures.",
    "Shader Units Active": "Percentage of graphics processing cores currently working.",
    "Encoding Load": "Portion of graphics processing power being used for video conversion tasks."
  },
  disk: {
    "Read Rate": "Speed at which data is being retrieved from your storage drives.",
    "Write Rate": "Speed at which data is being saved to your storage drives.",
    "Active Time": "Percentage of time your drives are busy processing read/write operations.",
    "Queue Length": "Number of pending read/write operations waiting to be processed.",
    "Available Space": "Amount of unused storage capacity on your drive.",
    "Fragmentation": "Degree to which files are scattered across your drive, potentially affecting access speed.",
    "Response Time": "Average time it takes for your drive to begin fulfilling read/write requests.",
    "IOPS": "Input/Output Operations Per Second - the number of read/write actions your drive handles each second."
  }
};

// Reference to the metric descriptions for the "About this metric" section
const metricDetails = {
  cpu: {
    description: "CPU usage indicates the percentage of processor resources currently being utilized. High usage may indicate intensive processing demands or potential performance bottlenecks.",
    metrics: {
      "usage": {
        description: "Percentage of total CPU capacity currently being used. Sustained high values indicate potential performance issues.",
        unit: "%"
      },
      "Processes": {
        description: "Independent programs currently running on your computer. Sudden increases may indicate background tasks launching.",
        unit: ""
      },
      "Threads": {
        description: "Smaller tasks within processes that can run simultaneously. Modern applications often use multiple threads for better performance.",
        unit: ""
      },
      "Kernel Time": {
        description: "Time spent by your processor handling core system operations. High values may indicate system-level activity or driver issues.",
        unit: "%"
      },
      "User Time": {
        description: "Time spent by your processor running your applications. Reflects CPU time used by your applications rather than the system.",
        unit: "%"
      },
      "Process Queue": {
        description: "Number of programs waiting for processor time. A consistently high queue indicates your CPU can't keep up with demands.",
        unit: ""
      },
      "Context Switches": {
        description: "Frequency at which your computer shifts between different processes. Very high rates can reduce efficiency due to overhead.",
        unit: "/sec"
      },
      "System Calls": {
        description: "Frequency of requests from programs to the operating system. Spikes often correlate with intensive I/O operations.",
        unit: "/sec"
      },
      "Interrupt Requests": {
        description: "Frequency of time-critical signals from hardware components. Unusually high values could indicate hardware issues.",
        unit: "/sec"
      }
    }
  },
  memory: {
    description: "Memory usage represents the percentage of available RAM currently in use by applications and the system. High usage may result in reduced system performance and increased reliance on virtual memory.",
    metrics: {
      "usage": {
        description: "Percentage of total RAM currently in use. Consistent high values indicate you might benefit from more RAM.",
        unit: "%"
      },
      "Total Memory": {
        description: "Total amount of RAM installed on your system. This value remains constant as it represents your hardware capacity.",
        unit: "GB"
      },
      "Free Memory": {
        description: "Amount of RAM not currently in use. Low free memory may lead to performance degradation.",
        unit: "GB"
      },
      "Memory Usage": {
        description: "Absolute amount of RAM currently occupied by running programs and the system. Sudden increases may indicate memory leaks or new applications.",
        unit: "GB"
      },
      "Cached Memory": {
        description: "RAM used to store recently accessed data for faster retrieval. Higher values generally improve system performance.",
        unit: "GB"
      },
      "Swap Usage": {
        description: "Hard drive space being used as virtual memory when RAM is full. Increasing values often correlate with lower performance.",
        unit: "GB"
      },
      "Page Faults": {
        description: "Frequency of instances when the processor needs data not in RAM. High rates may indicate memory pressure.",
        unit: "/sec"
      },
      "Page Reads": {
        description: "Frequency of data being transferred from storage to RAM. Spikes indicate the system is actively moving data from disk to memory.",
        unit: "/sec"
      }
    }
  },
  network: {
    description: "Network activity measures data transfer rates between your system and network connections. High activity is normal during file transfers, streaming, or when multiple internet-connected applications are running.",
    metrics: {
      "usage": {
        description: "Total network throughput (combined upload and download). Spikes correlate with network-intensive tasks.",
        unit: "MB/s"
      },
      "Download Rate": {
        description: "Speed at which your computer is receiving data from the network. Typically the most important metric for streaming and browsing.",
        unit: "MB/s"
      },
      "Upload Rate": {
        description: "Speed at which your computer is sending data to the network. Important for video conferencing, cloud backups, and file sharing.",
        unit: "MB/s"
      },
      "Active Connections": {
        description: "Number of open communication channels to other devices or servers. Many connections are normal for web browsing and online applications.",
        unit: ""
      },
      "TCP Connections": {
        description: "Number of reliable, error-checked network connections. Most web traffic and file transfers use TCP.",
        unit: ""
      },
      "UDP Connections": {
        description: "Number of faster but less reliable network connections. Often used for streaming media and online gaming.",
        unit: ""
      },
      "Packets Received": {
        description: "Rate at which your computer is receiving units of network data. Useful for diagnosing network issues.",
        unit: "/sec"
      },
      "Packets Sent": {
        description: "Rate at which your computer is sending units of network data. Can indicate upload activity patterns.",
        unit: "/sec"
      },
      "Errors": {
        description: "Number of failed network data transmissions. Consistent errors may indicate connectivity problems or hardware issues.",
        unit: ""
      }
    }
  },
  gpu: {
    description: "GPU usage shows the percentage of graphics processing resources currently in use. High usage is expected during gaming, video editing, and 3D applications, but unusual in standard productivity tasks.",
    metrics: {
      "usage": {
        description: "Percentage of GPU processing power currently in use. Sustained high usage is normal during gaming or rendering.",
        unit: "%"
      },
      "Core Clock": {
        description: "Operating speed of your graphics processor. Modern GPUs often adjust clock speed dynamically based on load and temperature.",
        unit: "MHz"
      },
      "Memory Clock": {
        description: "Operating speed of your graphics card's dedicated memory. Affects texture loading and frame buffer performance.",
        unit: "MHz"
      },
      "Temperature": {
        description: "Current operating temperature of your graphics processor. Values over 80°C may indicate cooling issues.",
        unit: "°C"
      },
      "VRAM Usage": {
        description: "Amount of video memory being used by graphics-intensive applications. Higher usage is normal for high-resolution gaming and professional graphics work.",
        unit: "GB"
      },
      "Power Draw": {
        description: "Amount of electricity your graphics card is consuming. Fluctuates based on workload, with peaks during intensive rendering.",
        unit: "W"
      },
      "Fan Speed": {
        description: "Speed at which cooling fans are operating. Increases with temperature to maintain optimal operating conditions.",
        unit: "%"
      },
      "Shader Units Active": {
        description: "Percentage of graphics processing cores currently working. Higher values indicate more graphically demanding workloads.",
        unit: "%"
      },
      "Encoding Load": {
        description: "Portion of graphics processing power being used for video conversion tasks. Spikes during video rendering or streaming.",
        unit: "%"
      }
    }
  },
  disk: {
    description: "Disk usage indicates both storage capacity utilization and I/O activity. High usage or persistent activity can impact system responsiveness when accessing files or launching applications.",
    metrics: {
      "usage": {
        description: "Percentage of disk capacity currently filled with data. Values approaching 100% can cause performance issues and space-related errors.",
        unit: "%"
      },
      "Read Rate": {
        description: "Speed at which data is being retrieved from your storage drives. Higher values indicate intensive file access operations.",
        unit: "MB/s"
      },
      "Write Rate": {
        description: "Speed at which data is being saved to your storage drives. Spikes occur during file saving, downloads, and installations.",
        unit: "MB/s"
      },
      "Active Time": {
        description: "Percentage of time your drives are busy processing read/write operations. Consistently high values may indicate a bottleneck.",
        unit: "%"
      },
      "Queue Length": {
        description: "Number of pending read/write operations waiting to be processed. Values consistently above 2 suggest your drive can't keep up with demands.",
        unit: ""
      },
      "Available Space": {
        description: "Amount of unused storage capacity on your drive. Critical for system health and performance.",
        unit: "GB"
      },
      "Fragmentation": {
        description: "Degree to which files are scattered across your drive. Higher values may reduce access speed, particularly on mechanical drives.",
        unit: "%"
      },
      "Response Time": {
        description: "Average time it takes for your drive to begin fulfilling read/write requests. Lower values provide a more responsive experience.",
        unit: "ms"
      },
      "IOPS": {
        description: "Input/Output Operations Per Second - the number of read/write actions your drive handles each second. SSD drives typically handle many more IOPS than HDDs.",
        unit: ""
      }
    }
  }
};

const DetailedMetricsModal: React.FC<DetailedMetricsModalProps> = ({
  isOpen,
  onClose,
  title,
  icon,
  currentValue,
  historyData,
  additionalMetrics = {},
  unit = '%',
  detailedDescription,
  onSetPrimaryMetric,
  primaryMetric = 'usage',
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentUnit, setCurrentUnit] = useState(unit);
  
  if (!isOpen) return null;

  // Determine which metric type we're displaying
  const metricType = title.toLowerCase().includes('cpu') ? 'cpu' : 
                     title.toLowerCase().includes('memory') ? 'memory' :
                     title.toLowerCase().includes('network') ? 'network' :
                     title.toLowerCase().includes('gpu') ? 'gpu' : 'disk';

  // Update unit based on current metric selection
  useEffect(() => {
    const metricInfo = metricDetails[metricType]?.metrics?.[primaryMetric];
    if (metricInfo?.unit !== undefined) {
      setCurrentUnit(metricInfo.unit);
    } else {
      setCurrentUnit(unit);
    }
  }, [primaryMetric, metricType, unit]);

  // Format timestamp for X-axis
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return `${date.getMinutes()}:${date.getSeconds().toString().padStart(2, '0')}`;
  };

  // Get color based on value
  const getChartColor = (value: number): string => {
    if (value >= 80) return "rgb(239, 68, 68)"; // red
    if (value >= 60) return "rgb(245, 158, 11)"; // amber
    return "rgb(34, 197, 94)"; // green
  };

  const getStatusText = (value: number): string => {
    if (value >= 80) return "Critical";
    if (value >= 60) return "Warning";
    return "Optimal";
  };

  const color = getChartColor(currentValue);
  const statusText = getStatusText(currentValue);
  
  // Get the display name for the primary metric
  const getPrimaryMetricDisplayName = () => {
    if (primaryMetric === 'usage') {
      return 'Usage';
    }
    return primaryMetric;
  };

  // Available metrics including Usage + additional metrics
  const availableMetrics = {
    'usage': 'Usage',
    ...Object.keys(additionalMetrics).reduce((acc, key) => ({
      ...acc,
      [key]: key
    }), {})
  };

  // Get dynamic "Other Metrics" by excluding the current primary metric
  const getOtherMetrics = () => {
    const otherMetrics: {[key: string]: string | number} = {};
    
    // Add usage if it's not the primary metric
    if (primaryMetric !== 'usage') {
      otherMetrics['Usage'] = `${currentValue.toFixed(1)}%`;
    }
    
    // Add the rest of the metrics except the primary one
    Object.entries(additionalMetrics).forEach(([key, value]) => {
      if (key !== primaryMetric) {
        otherMetrics[key] = value;
      }
    });
    
    return otherMetrics;
  };

  // Get current metric description
  const getCurrentMetricDescription = () => {
    if (primaryMetric === 'usage') {
      return metricDetails[metricType]?.metrics?.usage?.description || 
             metricDetails[metricType]?.description || 
             '';
    } else {
      return metricDetails[metricType]?.metrics?.[primaryMetric]?.description || 
             metricTooltips[metricType]?.[primaryMetric] || 
             '';
    }
  };

  const otherMetrics = getOtherMetrics();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-[2px]">
      <div 
        className="mentat-card w-[700px] h-[90vh] bg-mentat-background border-[3px] border-mentat-border/80 rounded-xl shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Modal Header */}
        <div className="sticky top-0 z-10 p-4 border-b-[3px] border-mentat-border/30 flex items-center justify-between bg-gradient-to-r from-mentat-secondary/50 to-mentat-secondary/10 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-md bg-mentat-primary/10 border border-mentat-primary/20">
              {icon}
            </div>
            <div>
              <h2 className="text-xl font-bold text-mentat-highlight">{title} Details</h2>
              <p className="text-sm text-mentat-primary/70">Real-time monitoring and historical data</p>
            </div>
          </div>
          <button 
            className="p-1 text-mentat-primary/70 hover:text-mentat-primary transition-colors"
            onClick={onClose}
          >
            <XCircle className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          <div className="p-6 space-y-6">
            {/* Current Status */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-lg bg-mentat-secondary/20 border border-mentat-border/40">
              <div className="flex items-center gap-3">
                <div 
                  className={`w-3 h-3 rounded-full ${
                    statusText === 'Critical' ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' : 
                    statusText === 'Warning' ? 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]' : 
                    'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]'
                  }`} 
                />
                <span className="text-lg font-semibold text-mentat-highlight">
                  Current Status: <span style={{ color }}>{statusText}</span>
                </span>
              </div>
              <div className="text-2xl font-bold" style={{ color }}>
                {currentValue.toFixed(1)}
                {(primaryMetric === 'usage' && title !== 'Network') ? '%' : 
                 (primaryMetric === 'usage' && title === 'Network') ? ' MB/s' : 
                 currentUnit}
              </div>
            </div>
            
            {/* Main Chart Section with Metric Selector */}
            <div className="rounded-lg bg-mentat-secondary/10 border border-mentat-border/30 p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-md font-medium text-mentat-highlight">
                  {getPrimaryMetricDisplayName()} Over Time
                </h3>
                
                {/* Metric Selector Dropdown */}
                {onSetPrimaryMetric && (
                  <div className="relative">
                    <button
                      className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-mentat-secondary/20 border border-mentat-border/50 text-sm text-mentat-highlight hover:bg-mentat-secondary/30 transition-colors shadow-sm"
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                      <span>Metric: <span className="font-medium">{getPrimaryMetricDisplayName()}</span></span>
                      <ChevronDown className={`w-4 h-4 text-mentat-primary transition-transform duration-200 ${dropdownOpen ? 'transform rotate-180' : ''}`} />
                    </button>
                    
                    {dropdownOpen && (
                      <div className="absolute right-0 top-full mt-1 z-20 w-52 rounded-md bg-mentat-background/95 backdrop-blur-md border-2 border-mentat-border/80 shadow-lg overflow-hidden">
                        <div className="max-h-60 overflow-y-auto py-1">
                          {Object.entries(availableMetrics).map(([key, name]) => (
                            <button
                              key={key}
                              className={`w-full text-left px-4 py-2 text-sm transition-colors hover:bg-mentat-secondary/20 
                                ${primaryMetric === key ? 'bg-mentat-primary/10 text-mentat-primary font-medium' : 'text-mentat-highlight/90'}`}
                              onClick={() => {
                                onSetPrimaryMetric(metricType, key);
                                setDropdownOpen(false);
                              }}
                            >
                              {name}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={historyData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                    <defs>
                      <linearGradient id={`gradient-${title}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                        <stop offset="95%" stopColor={color} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(var(--mentat-border-rgb), 0.2)" />
                    <XAxis 
                      dataKey="time" 
                      tickFormatter={formatTime} 
                      stroke="var(--mentat-primary)"
                      tick={{ fill: 'var(--mentat-primary)', fontSize: 12 }}
                    />
                    <YAxis 
                      stroke="var(--mentat-primary)"
                      tick={{ fill: 'var(--mentat-primary)', fontSize: 12 }}
                      domain={[0, 100]}
                      tickFormatter={(value) => `${value}${currentUnit}`}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(var(--mentat-secondary-rgb), 0.6)',
                        backdropFilter: 'blur(8px)',
                        border: '1px solid var(--mentat-border)',
                        borderRadius: '4px',
                        color: 'var(--mentat-highlight)'
                      }}
                      formatter={(value: number) => [`${value.toFixed(1)}${currentUnit}`, getPrimaryMetricDisplayName()]}
                      labelFormatter={(label) => formatTime(label)}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke={color} 
                      fill={`url(#gradient-${title})`}
                      strokeWidth={2}
                      activeDot={{ r: 6, stroke: color, strokeWidth: 2, fill: 'var(--mentat-background)' }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* About this metric - moved below graph */}
            <div className="p-4 rounded-lg bg-mentat-secondary/5 border border-mentat-border/20">
              <h3 className="text-md font-medium text-mentat-highlight mb-2">About {getPrimaryMetricDisplayName()}</h3>
              <p className="text-sm text-mentat-primary/90">{getCurrentMetricDescription()}</p>
            </div>

            {/* Other Metrics - now dynamic */}
            {Object.keys(otherMetrics).length > 0 && (
              <div>
                <h3 className="text-md font-medium text-mentat-highlight mb-4">Other Metrics</h3>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(otherMetrics).map(([key, value], index) => {
                    const metricKey = key === 'Usage' ? 'usage' : key;
                    
                    return (
                      <div 
                        key={key} 
                        className="p-3 rounded-lg bg-mentat-secondary/10 border border-mentat-border/20 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          {metricTooltips[metricType] && metricTooltips[metricType][metricKey] ? (
                            <MetricTooltip 
                              title={key} 
                              description={metricTooltips[metricType][metricKey]} 
                              position={index % 2 === 0 ? 'left' : 'right'} 
                            />
                          ) : (
                            <div className="p-1 -m-1">
                              <Info className="w-4 h-4 text-mentat-primary/70" />
                            </div>
                          )}
                          <span className="text-sm text-mentat-primary/90">{key}</span>
                        </div>
                        <button 
                          className="text-sm font-mono text-mentat-highlight hover:text-mentat-primary transition-colors flex items-center gap-1.5" 
                          onClick={() => onSetPrimaryMetric && onSetPrimaryMetric(metricType, metricKey)}
                          title="View on graph"
                        >
                          {value}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            
            {/* Last Updated */}
            <div className="flex items-center justify-end gap-2 text-xs text-mentat-primary/60 mt-3">
              <Clock className="w-3 h-3" />
              <span>Last updated: {new Date().toLocaleTimeString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedMetricsModal; 