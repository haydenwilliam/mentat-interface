
import React from "react";
import { Folder, Share, Upload, Play, Settings, Users, Activity } from "lucide-react";
import MenuItem from "./menu-item";
import MenuGroup from "./menu-group";
import MenuSection from "./menu-section";

interface SidebarProps {
  onMonitorToggle: () => void;
  onViewChange?: (view: 'terminal' | 'projects') => void;
  activeView?: 'terminal' | 'projects';
}

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  ({ onMonitorToggle, onViewChange, activeView = 'terminal' }, ref) => {
    return (
      <div ref={ref} className="w-16 hover:w-48 transition-all duration-300 bg-mentat-secondary/20 border-r border-mentat-border flex flex-col">
        <div className="p-2">
          <div className="space-y-4">
            {/* Projects Section */}
            <MenuGroup>
              <MenuItem 
                icon={<Folder />}
                onClick={() => onViewChange?.('projects')}
                className={activeView === 'projects' ? 'bg-mentat-secondary/40' : ''}
              >
                Projects
              </MenuItem>
              <MenuSection>
                <MenuItem icon={<Play />} variant="sub">View</MenuItem>
                <MenuItem icon={<Upload />} variant="sub">Deploy</MenuItem>
                <MenuItem icon={<Share />} variant="sub">Share</MenuItem>
              </MenuSection>
            </MenuGroup>

            {/* Agents */}
            <MenuItem icon={<Users />}>Agents</MenuItem>

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
