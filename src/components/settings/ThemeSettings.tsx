import React from "react";
import { Card } from "../ui/card";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { Moon, Zap, Palette, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import { typography } from "../../styles/fontSchema";

const ThemeSettings = () => {
  const { 
    mode, 
    theme, 
    reducedMotion, 
    setMode, 
    setTheme, 
    toggleMode, 
    setReducedMotion,
    availableThemes
  } = useTheme();
  const { toast } = useToast();

  const isDarkMode = mode === 'dark';

  const handleDarkModeToggle = () => {
    toggleMode();
    toast({
      title: !isDarkMode ? "Dark Mode Enabled" : "Light Mode Enabled",
      description: !isDarkMode ? "Interface switched to dark theme" : "Interface switched to light theme",
    });
  };

  const handleReducedMotionToggle = () => {
    setReducedMotion(!reducedMotion);
    toast({
      title: `Reduced Motion ${!reducedMotion ? 'Enabled' : 'Disabled'}`,
      description: !reducedMotion 
        ? "Animations minimized for better accessibility" 
        : "Standard animations restored",
    });
  };

  const handleThemeChange = (themeKey: string) => {
    setTheme(themeKey as any);
    const themeConfig = availableThemes[themeKey as keyof typeof availableThemes];
    toast({
      title: `${themeConfig.name} Applied`,
      description: themeConfig.description,
    });
  };

  return (
    <Card className="bg-mentat-background border-2 border-mentat-border/80 shadow-lg rounded-xl overflow-hidden">
      {/* Clean background without any accent elements that cause shadows */}
      <div className="relative p-6 z-10">
        <div className="space-y-6">
          {/* Dark Mode Section */}
          <div className="relative group hover:bg-mentat-primary/10 rounded-xl p-5 transition-all border border-mentat-border/40 bg-mentat-secondary/10 mentat-card mentat-content-padding">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-md bg-mentat-primary/10 border border-mentat-primary/20 shadow-md">
                  <Moon className="w-7 h-7 text-mentat-primary" />
                </div>
                <div className="space-y-2">
                  <Label className="text-base font-medium text-mentat-highlight">
                    Dark Mode
                  </Label>
                  <p className="text-sm text-mentat-highlight leading-relaxed max-w-md">
                    Toggle between light and dark color schemes.
                  </p>
                </div>
              </div>
              <Switch 
                checked={isDarkMode} 
                onCheckedChange={handleDarkModeToggle}
                className="data-[state=checked]:bg-mentat-primary bg-mentat-background border-2 border-mentat-primary/20 h-7 w-12"
              />
            </div>
          </div>

          {/* Reduced Motion Section */}
          <div className="relative group hover:bg-mentat-primary/10 rounded-xl p-5 transition-all border border-mentat-border/40 bg-mentat-secondary/10 mentat-card mentat-content-padding">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-md bg-mentat-primary/10 border border-mentat-primary/20 shadow-md">
                  <Zap className="w-7 h-7 text-mentat-primary" />
                </div>
                <div className="space-y-2">
                  <Label className="text-base font-medium text-mentat-highlight">
                    Reduced Motion
                  </Label>
                  <p className="text-sm text-mentat-highlight leading-relaxed max-w-md">
                    
                  </p>
                </div>
              </div>
              <Switch 
                checked={reducedMotion} 
                onCheckedChange={handleReducedMotionToggle}
                className="data-[state=checked]:bg-mentat-primary bg-mentat-background border-2 border-mentat-primary/20 h-7 w-12"
              />
            </div>
          </div>

          {/* Theme Selection Section */}
          <div className="relative group hover:bg-mentat-primary/10 rounded-xl p-5 transition-all border border-mentat-border/40 bg-mentat-secondary/10 mentat-card mentat-content-padding">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-md bg-mentat-primary/10 border border-mentat-primary/20 shadow-md">
                  <Palette className="w-7 h-7 text-mentat-primary" />
                </div>
                <div className="space-y-2">
                  <Label className="text-base font-medium text-mentat-highlight">
                    Color Theme
                  </Label>
                  <p className="text-sm text-mentat-highlight leading-relaxed max-w-md">
                    Select from a variety of themes inspired by the Dune saga.
                  </p>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="min-w-[180px] bg-mentat-primary/10 border-2 border-mentat-primary/20 text-mentat-highlight hover:bg-mentat-primary/20 flex justify-between items-center group"
                  >
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-4 h-4 rounded-full border border-mentat-primary/30" 
                        style={{ background: availableThemes[theme].gradient }}
                      ></div>
                      <span className="text-sm">{availableThemes[theme].name}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-mentat-primary/70 group-hover:text-mentat-primary transition-all transform group-hover:translate-x-0.5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  align="end" 
                  className="min-w-[220px] bg-mentat-background/95 backdrop-blur-lg border-2 border-mentat-border/50 rounded-lg shadow-xl"
                >
                  {Object.entries(availableThemes).map(([key, themeConfig]) => (
                    <DropdownMenuItem 
                      key={key}
                      className={`flex items-center gap-2 py-3 px-4 hover:bg-mentat-primary/10 cursor-pointer transition-colors ${theme === key ? 'bg-mentat-primary/5 text-mentat-highlight' : 'text-mentat-primary'}`}
                      onClick={() => handleThemeChange(key)}
                    >
                      <div className="w-4 h-4 rounded-full border border-mentat-border/50" style={{ background: themeConfig.gradient }}></div>
                      <div className="flex-1">
                        <div className="text-base font-medium text-mentat-highlight">{themeConfig.name}</div>
                        <div className="text-sm text-mentat-highlight">{themeConfig.description}</div>
                      </div>
                      {theme === key && (
                        <div className="h-2 w-2 rounded-full bg-mentat-primary"></div>
                      )}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ThemeSettings;
