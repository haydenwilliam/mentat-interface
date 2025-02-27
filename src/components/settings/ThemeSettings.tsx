
import React from "react";
import { Card } from "../ui/card";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { Moon, Zap } from "lucide-react";

const ThemeSettings = () => {
  return (
    <Card className="p-6 bg-mentat-secondary/10 border-mentat-border">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-md bg-mentat-secondary/20">
              <Moon className="w-4 h-4 text-mentat-primary" />
            </div>
            <div className="space-y-0.5">
              <Label className="text-base text-mentat-primary">Dark Mode</Label>
              <p className="text-sm text-mentat-primary/70">
                Toggle between light and dark theme
              </p>
            </div>
          </div>
          <Switch className="bg-mentat-secondary data-[state=checked]:bg-mentat-primary" />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-md bg-mentat-secondary/20">
              <Zap className="w-4 h-4 text-mentat-primary" />
            </div>
            <div className="space-y-0.5">
              <Label className="text-base text-mentat-primary">Reduced Motion</Label>
              <p className="text-sm text-mentat-primary/70">
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
