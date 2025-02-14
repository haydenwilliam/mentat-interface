
import { Settings, Users, Folder, Activity } from "lucide-react";

interface SidebarProps {
  onMonitorToggle: () => void;
}

const Sidebar = ({ onMonitorToggle }: SidebarProps) => {
  return (
    <div className="w-16 hover:w-48 transition-all duration-300 bg-mentat-secondary/20 border-r border-mentat-border flex flex-col">
      <div className="p-2">
        <div className="space-y-4">
          {/* Agents */}
          <button className="w-full p-2 flex items-center gap-3 text-mentat-primary/80 hover:text-mentat-primary hover:bg-mentat-secondary/30 rounded-lg transition-colors group">
            <Users className="w-5 h-5 flex-shrink-0" />
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">Agents</span>
          </button>

          {/* Projects */}
          <button className="w-full p-2 flex items-center gap-3 text-mentat-primary/80 hover:text-mentat-primary hover:bg-mentat-secondary/30 rounded-lg transition-colors group">
            <Folder className="w-5 h-5 flex-shrink-0" />
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">Projects</span>
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
