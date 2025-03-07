import React from 'react';
import { Moon, Sun, Palette } from 'lucide-react';
import { useTheme, ThemeKey } from '@/contexts/ThemeContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ThemeSwitchProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const ThemeSwitch: React.FC<ThemeSwitchProps> = ({ 
  className = '', 
  showText = false,
  size = 'md' 
}) => {
  const { mode, theme, toggleMode, setTheme, availableThemes } = useTheme();
  
  const iconSize = {
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
    lg: "w-5 h-5"
  }[size];

  const buttonSize = {
    sm: "h-7 px-2",
    md: "h-9 px-3",
    lg: "h-10 px-4"
  }[size];

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className={`${buttonSize} bg-mentat-secondary/30 border-mentat-border text-mentat-primary hover:bg-mentat-secondary/50`}
              onClick={toggleMode}
            >
              {mode === 'dark' ? (
                <Moon className={iconSize} />
              ) : (
                <Sun className={iconSize} />
              )}
              {showText && <span className="ml-2">{mode === 'dark' ? 'Dark' : 'Light'}</span>}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Toggle {mode === 'dark' ? 'Light' : 'Dark'} Mode</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DropdownMenu>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className={`${buttonSize} bg-mentat-secondary/30 border-mentat-border text-mentat-primary hover:bg-mentat-secondary/50 flex items-center gap-2`}
                >
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ background: availableThemes[theme].gradient }}
                  />
                  <Palette className={iconSize} />
                  {showText && (
                    <span className="ml-1 max-w-[100px] truncate">
                      {availableThemes[theme].name}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <p>Change Theme</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <DropdownMenuContent className="bg-mentat-secondary border-mentat-border text-mentat-primary min-w-[180px]">
          {Object.entries(availableThemes).map(([key, themeConfig]) => (
            <DropdownMenuItem 
              key={key}
              className={`flex items-center gap-2 hover:bg-mentat-mid-tone/50 cursor-pointer ${theme === key ? 'bg-mentat-mid-tone/30' : ''}`}
              onClick={() => setTheme(key as ThemeKey)}
            >
              <div className="w-3 h-3 rounded-full" style={{ background: themeConfig.gradient }}></div>
              {themeConfig.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ThemeSwitch; 