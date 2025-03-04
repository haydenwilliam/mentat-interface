
import React from "react";
import { Card } from "../ui/card";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { Moon, Zap } from "lucide-react";

const ThemeSettings = () => {
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
            <Switch className="data-[state=checked]:bg-mentat-primary bg-mentat-secondary/40" />
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
            <Switch className="data-[state=checked]:bg-mentat-primary bg-mentat-secondary/40" />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ThemeSettings;
