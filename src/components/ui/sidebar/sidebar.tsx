import React from "react";
import { Folder, Activity, Settings, Terminal } from "lucide-react";
import MenuItem from "./menu-item";
import MenuGroup from "./menu-group";

interface SidebarProps {
  onViewChange?: (view: 'terminal' | 'projects' | 'monitor' | 'settings') => void;
  activeView?: 'terminal' | 'projects' | 'monitor' | 'settings';
}

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  ({ onViewChange, activeView = 'terminal' }, ref) => {
    return (
      <div ref={ref} className="w-16 hover:w-48 transition-all duration-300 bg-mentat-secondary/70 border-r-2 border-mentat-border/40 flex flex-col shadow-lg">
        <div className="p-3 flex flex-col h-full">
          <div className="space-y-5 flex-1">
            {/* Terminal Section */}
            <MenuGroup>
              <MenuItem 
                icon={<Terminal className="w-5 h-5" />}
                onClick={() => onViewChange?.('terminal')}
                className={activeView === 'terminal' ? 'bg-mentat-mid-tone/80' : ''}
              >
                Terminal
              </MenuItem>
            </MenuGroup>

            {/* Projects Section */}
            <MenuGroup>
              <MenuItem 
                icon={<Folder className="w-5 h-5" />}
                onClick={() => onViewChange?.('projects')}
                className={activeView === 'projects' ? 'bg-mentat-mid-tone/80' : ''}
              >
                Projects
              </MenuItem>
            </MenuGroup>

            {/* System Monitor */}
            <MenuGroup>
              <MenuItem 
                icon={<Activity className="w-5 h-5" />}
                onClick={() => onViewChange?.('monitor')}
                className={activeView === 'monitor' ? 'bg-mentat-mid-tone/80' : ''}
              >
                Monitor
              </MenuItem>
            </MenuGroup>

            {/* Settings */}
            <MenuItem 
              icon={<Settings className="w-5 h-5" />}
              onClick={() => onViewChange?.('settings')}
              className={activeView === 'settings' ? 'bg-mentat-mid-tone/80' : ''}
            >
              Settings
            </MenuItem>
          </div>
        </div>
      </div>
    );
  }
);

Sidebar.displayName = "Sidebar";

export default Sidebar;
