
import React, { useState, useEffect } from "react";
import { Card } from "../ui/card";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { Moon, Zap, Palette } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ThemeSettings = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [theme, setTheme] = useState("default"); // default, light, cyberpunk
  const { toast } = useToast();

  useEffect(() => {
    // Apply theme changes when component mounts or settings change
    const body = document.body;
    
    // Apply dark/light mode
    if (darkMode) {
      body.classList.remove("light-theme");
    } else {
      body.classList.add("light-theme");
    }
    
    // Apply cyberpunk theme if selected
    if (theme === "cyberpunk") {
      body.classList.add("cyberpunk-theme");
      body.classList.remove("light-theme");
    } else {
      body.classList.remove("cyberpunk-theme");
    }
    
    // Apply reduced motion
    if (reducedMotion) {
      body.classList.add("reduce-motion");
    } else {
      body.classList.remove("reduce-motion");
    }
  }, [darkMode, reducedMotion, theme]);

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

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    // If selecting cyberpunk, force dark mode
    if (newTheme === "cyberpunk") {
      setDarkMode(true);
    }
    toast({
      title: `${newTheme.charAt(0).toUpperCase() + newTheme.slice(1)} Theme Applied`,
      description: "Interface colors updated",
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
            <div className="flex gap-2">
              <button 
                onClick={() => handleThemeChange("default")}
                className={`w-8 h-8 rounded-full border-2 ${theme === "default" ? "border-mentat-highlight" : "border-mentat-border/30"}`}
                style={{ background: "linear-gradient(135deg, #001018 0%, #00BBFF 100%)" }}
                title="Default Theme"
              />
              <button 
                onClick={() => handleThemeChange("light")}
                className={`w-8 h-8 rounded-full border-2 ${theme === "light" ? "border-mentat-highlight" : "border-mentat-border/30"}`}
                style={{ background: "linear-gradient(135deg, #F0F8FF 0%, #0062CC 100%)" }}
                title="Light Theme"
              />
              <button 
                onClick={() => handleThemeChange("cyberpunk")}
                className={`w-8 h-8 rounded-full border-2 ${theme === "cyberpunk" ? "border-mentat-highlight" : "border-mentat-border/30"}`}
                style={{ background: "linear-gradient(135deg, #0D0221 0%, #FA00FF 100%)" }}
                title="Cyberpunk Theme"
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ThemeSettings;
