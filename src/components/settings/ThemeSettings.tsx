
import React from "react";
import { Card } from "../ui/card";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { Moon, Zap } from "lucide-react";

const ThemeSettings = () => {
  return (
    <Card className="relative p-6 bg-mentat-secondary/30 border-mentat-border">
      <div className="absolute inset-0 bg-gradient-to-r from-mentat-primary/5 to-transparent pointer-events-none" />
      <div className="relative space-y-6">
        <div className="flex items-center justify-between group">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-md bg-mentat-secondary/40 text-mentat-primary/70 group-hover:text-mentat-highlight transition-colors">
              <Moon className="w-4 h-4" />
            </div>
            <div className="space-y-0.5">
              <Label className="text-base font-display text-mentat-primary group-hover:text-mentat-highlight transition-colors">Dark Mode</Label>
              <p className="text-sm font-mono text-mentat-primary/70">
                Toggle between light and dark theme
              </p>
            </div>
          </div>
          <Switch className="bg-mentat-secondary data-[state=checked]:bg-mentat-primary" />
        </div>

        <div className="flex items-center justify-between group">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-md bg-mentat-secondary/40 text-mentat-primary/70 group-hover:text-mentat-highlight transition-colors">
              <Zap className="w-4 h-4" />
            </div>
            <div className="space-y-0.5">
              <Label className="text-base font-display text-mentat-primary group-hover:text-mentat-highlight transition-colors">Reduced Motion</Label>
              <p className="text-sm font-mono text-mentat-primary/70">
                Minimize animations throughout the interface
              </p>
            </div>
          </div>
          <Switch className="bg-mentat-secondary data-[state=checked]:bg-mentat-primary" />
        </div>
      </div>
    </Card>
  );
};

export default ThemeSettings;
