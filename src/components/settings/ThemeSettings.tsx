
import React, { useState, useEffect } from "react";
import { Card } from "../ui/card";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { Moon, Zap, Palette } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";

const ThemeSettings = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("spiceBlue"); // spiceBlue, harkonnenMonotone
  const { toast } = useToast();

  // Theme configurations with Dune-inspired names
  const themes = {
    spiceBlue: {
      name: "Spice Blue",
      description: "The original blue theme inspired by the spice melange",
      class: "spice-blue-theme",
    },
    harkonnenMonotone: {
      name: "Harkonnen Monotone", 
      description: "Black and white theme inspired by House Harkonnen's stark aesthetics",
      class: "harkonnen-monotone-theme",
    }
  };

  useEffect(() => {
    // Apply theme changes when component mounts or settings change
    const body = document.body;
    
    // Apply dark/light mode
    if (darkMode) {
      body.classList.add("dark-mode");
      body.classList.remove("light-mode");
    } else {
      body.classList.add("light-mode");
      body.classList.remove("dark-mode");
    }
    
    // Apply theme
    Object.values(themes).forEach(theme => {
      body.classList.remove(theme.class);
    });
    
    if (currentTheme === "spiceBlue") {
      // Original blue theme
      body.classList.add(themes.spiceBlue.class);
    } else if (currentTheme === "harkonnenMonotone") {
      // Monochrome theme
      body.classList.add(themes.harkonnenMonotone.class);
    }
    
    // Apply reduced motion
    if (reducedMotion) {
      body.classList.add("reduce-motion");
    } else {
      body.classList.remove("reduce-motion");
    }
  }, [darkMode, reducedMotion, currentTheme]);

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
    toast({
      title: !darkMode ? "Dark Mode Enabled" : "Light Mode Enabled",
      description: !darkMode ? "Interface switched to dark theme" : "Interface switched to light theme",
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
    setCurrentTheme(themeKey);
    const theme = themes[themeKey as keyof typeof themes];
    toast({
      title: `${theme.name} Applied`,
      description: theme.description,
    });
  };

  return (
    <Card className="bg-mentat-secondary/20 border-mentat-border">
      <div className="p-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between group">
            <div className="flex items-center gap-4">
              <div className="p-2.5 rounded-md bg-mentat-secondary/40 text-mentat-primary/70 group-hover:text-mentat-highlight transition-colors">
                <Moon className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <Label className="text-base font-display text-mentat-primary group-hover:text-mentat-highlight transition-colors">
                  Dark Mode
                </Label>
                <p className="text-sm font-mono text-mentat-primary/70">
                  Toggle between light and dark theme
                </p>
              </div>
            </div>
            <Switch 
              checked={darkMode} 
              onCheckedChange={handleDarkModeToggle}
              className="data-[state=checked]:bg-mentat-primary bg-mentat-secondary/40" 
            />
          </div>

          <div className="flex items-center justify-between group">
            <div className="flex items-center gap-4">
              <div className="p-2.5 rounded-md bg-mentat-secondary/40 text-mentat-primary/70 group-hover:text-mentat-highlight transition-colors">
                <Zap className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <Label className="text-base font-display text-mentat-primary group-hover:text-mentat-highlight transition-colors">
                  Reduced Motion
                </Label>
                <p className="text-sm font-mono text-mentat-primary/70">
                  Minimize animations throughout the interface
                </p>
              </div>
            </div>
            <Switch 
              checked={reducedMotion} 
              onCheckedChange={handleReducedMotionToggle}
              className="data-[state=checked]:bg-mentat-primary bg-mentat-secondary/40" 
            />
          </div>

          <div className="flex items-center justify-between group pt-4 border-t border-mentat-border/30">
            <div className="flex items-center gap-4">
              <div className="p-2.5 rounded-md bg-mentat-secondary/40 text-mentat-primary/70 group-hover:text-mentat-highlight transition-colors">
                <Palette className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <Label className="text-base font-display text-mentat-primary group-hover:text-mentat-highlight transition-colors">
                  Color Theme
                </Label>
                <p className="text-sm font-mono text-mentat-primary/70">
                  Choose your interface color scheme
                </p>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  className="bg-mentat-secondary/30 border-mentat-border text-mentat-primary hover:bg-mentat-secondary/50"
                >
                  {themes[currentTheme as keyof typeof themes].name}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-mentat-secondary border-mentat-border text-mentat-primary min-w-[200px]">
                <DropdownMenuItem 
                  className={`flex items-center gap-2 hover:bg-mentat-mid-tone/50 cursor-pointer ${currentTheme === 'spiceBlue' ? 'bg-mentat-mid-tone/30' : ''}`}
                  onClick={() => handleThemeChange('spiceBlue')}
                >
                  <div className="w-4 h-4 rounded-full" style={{ background: "linear-gradient(135deg, #001018 0%, #00BBFF 100%)" }}></div>
                  Spice Blue
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className={`flex items-center gap-2 hover:bg-mentat-mid-tone/50 cursor-pointer ${currentTheme === 'harkonnenMonotone' ? 'bg-mentat-mid-tone/30' : ''}`}
                  onClick={() => handleThemeChange('harkonnenMonotone')}
                >
                  <div className="w-4 h-4 rounded-full" style={{ background: "linear-gradient(135deg, #000000 0%, #FFFFFF 100%)" }}></div>
                  Harkonnen Monotone
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ThemeSettings;
