
import { Folder, Share, Upload, Play, Settings, Users, Activity } from "lucide-react";

interface SidebarProps {
  onMonitorToggle: () => void;
}

const Sidebar = ({ onMonitorToggle }: SidebarProps) => {
  return (
    <div className="w-16 hover:w-48 transition-all duration-300 bg-mentat-secondary/20 border-r border-mentat-border flex flex-col">
      <div className="p-2">
        <div className="space-y-4">
          {/* Projects Section */}
          <div className="space-y-2">
            <button className="w-full p-2 flex items-center gap-3 text-mentat-primary/80 hover:text-mentat-primary hover:bg-mentat-secondary/30 rounded-lg transition-colors duration-200 group">
              <Folder className="w-5 h-5 flex-shrink-0" />
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">Projects</span>
            </button>
            <div className="pl-2 space-y-1 overflow-hidden">
              {/* Project Actions */}
              <button className="w-full p-2 flex items-center gap-3 text-mentat-primary/60 hover:text-mentat-primary hover:bg-mentat-secondary/30 rounded-lg transition-colors text-sm group">
                <Play className="w-4 h-4 flex-shrink-0" />
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">View</span>
              </button>
              <button className="w-full p-2 flex items-center gap-3 text-mentat-primary/60 hover:text-mentat-primary hover:bg-mentat-secondary/30 rounded-lg transition-colors text-sm group">
                <Upload className="w-4 h-4 flex-shrink-0" />
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">Deploy</span>
              </button>
              <button className="w-full p-2 flex items-center gap-3 text-mentat-primary/60 hover:text-mentat-primary hover:bg-mentat-secondary/30 rounded-lg transition-colors text-sm group">
                <Share className="w-4 h-4 flex-shrink-0" />
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">Share</span>
              </button>
            </div>
          </div>

          {/* Agents */}
          <button className="w-full p-2 flex items-center gap-3 text-mentat-primary/80 hover:text-mentat-primary hover:bg-mentat-secondary/30 rounded-lg transition-colors group">
            <Users className="w-5 h-5 flex-shrink-0" />
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">Agents</span>
          </button>

          {/* System Monitor */}
          <button 
            onClick={onMonitorToggle}
            className="w-full p-2 flex items-center gap-3 text-mentat-primary/80 hover:text-mentat-primary hover:bg-mentat-secondary/30 rounded-lg transition-colors group"
          >
            <Activity className="w-5 h-5 flex-shrink-0" />
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">Monitor</span>
          </button>

          {/* Settings */}
          <button className="w-full p-2 flex items-center gap-3 text-mentat-primary/80 hover:text-mentat-primary hover:bg-mentat-secondary/30 rounded-lg transition-colors group">
            <Settings className="w-5 h-5 flex-shrink-0" />
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
