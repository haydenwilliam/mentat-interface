
import React from "react";
import { Card } from "../ui/card";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { Moon, Zap, Palette } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/hooks/use-toast";

const ThemeSettings = () => {
  const { mode, toggleMode, theme, setTheme } = useTheme();

  const handleThemeChange = (value: string) => {
    setTheme(value as any);
    toast({
      title: "Theme Changed",
      description: `Theme set to ${value.replace('-', ' ')}`,
    });
  };

  return (
    <Card className="bg-mentat-secondary/20 border-mentat-border">
      <div className="p-8">
        <div className="space-y-8">
          {/* Dark Mode Toggle */}
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
              checked={mode === "dark"} 
              onCheckedChange={toggleMode} 
              className="data-[state=checked]:bg-mentat-primary bg-mentat-secondary/40" 
            />
          </div>

          {/* Reduced Motion Toggle */}
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
            <Switch className="data-[state=checked]:bg-mentat-primary bg-mentat-secondary/40" />
          </div>

          {/* Theme Selector */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="p-2.5 rounded-md bg-mentat-secondary/40 text-mentat-primary/70">
                <Palette className="w-4 h-4" />
              </div>
              <div>
                <Label className="text-base font-display text-mentat-primary">
                  Theme
                </Label>
                <p className="text-sm font-mono text-mentat-primary/70">
                  Select your preferred Dune theme
                </p>
              </div>
            </div>
            
            <RadioGroup 
              value={theme} 
              onValueChange={handleThemeChange}
              className="grid grid-cols-2 gap-4 pt-2"
            >
              <div>
                <RadioGroupItem 
                  value="spice-blue" 
                  id="spice-blue"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="spice-blue"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-mentat-border p-4 hover:bg-mentat-secondary/30 peer-data-[state=checked]:border-mentat-highlight [&:has([data-state=checked])]:border-mentat-highlight cursor-pointer"
                >
                  <div className="flex h-6 w-20 items-center justify-center gap-1">
                    <span className="h-4 w-4 rounded-full bg-[#00E5FF]"></span>
                    <span className="h-3 w-3 rounded-full bg-[#003B42]"></span>
                  </div>
                  <span className="text-sm font-medium pt-1">Spice Blue</span>
                </Label>
              </div>
              
              <div>
                <RadioGroupItem 
                  value="arrakis" 
                  id="arrakis"
                  className="peer sr-only" 
                />
                <Label
                  htmlFor="arrakis"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-mentat-border p-4 hover:bg-mentat-secondary/30 peer-data-[state=checked]:border-mentat-highlight [&:has([data-state=checked])]:border-mentat-highlight cursor-pointer"
                >
                  <div className="flex h-6 w-20 items-center justify-center gap-1">
                    <span className="h-4 w-4 rounded-full bg-amber-500"></span>
                    <span className="h-3 w-3 rounded-full bg-orange-700"></span>
                  </div>
                  <span className="text-sm font-medium pt-1">Arrakis</span>
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ThemeSettings;
