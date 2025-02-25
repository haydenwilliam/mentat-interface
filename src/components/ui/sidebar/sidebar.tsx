
import React from "react";
import { Folder, Activity, Settings, Terminal } from "lucide-react";
import MenuItem from "./menu-item";
import MenuGroup from "./menu-group";

interface SidebarProps {
  onMonitorToggle: () => void;
  onViewChange?: (view: 'terminal' | 'projects') => void;
  activeView?: 'terminal' | 'projects';
}

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  ({ onMonitorToggle, onViewChange, activeView = 'terminal' }, ref) => {
    return (
      <div ref={ref} className="w-14 hover:w-36 transition-all duration-300 bg-mentat-secondary/20 border-r border-mentat-border flex flex-col">
        <div className="p-2">
          <div className="space-y-4">
            {/* Terminal Section */}
            <MenuGroup>
              <MenuItem 
                icon={<Terminal />}
                onClick={() => onViewChange?.('terminal')}
                className={activeView === 'terminal' ? 'bg-mentat-secondary/40' : ''}
              >
                Terminal
              </MenuItem>
            </MenuGroup>

            {/* Projects Section */}
            <MenuGroup>
              <MenuItem 
                icon={<Folder />}
                onClick={() => onViewChange?.('projects')}
                className={activeView === 'projects' ? 'bg-mentat-secondary/40' : ''}
              >
                Projects
              </MenuItem>
            </MenuGroup>

            {/* System Monitor */}
            <MenuItem icon={<Activity />} onClick={onMonitorToggle}>Monitor</MenuItem>

            {/* Settings */}
            <MenuItem icon={<Settings />}>Settings</MenuItem>
          </div>
        </div>
      </div>
    );
  }
);

Sidebar.displayName = "Sidebar";

export default Sidebar;
