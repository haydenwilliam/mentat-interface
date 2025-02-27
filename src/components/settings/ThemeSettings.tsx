
import React from "react";
import { Card } from "../ui/card";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";

const ThemeSettings = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-display font-semibold text-mentat-primary">Theme & Accessibility</h2>
      
      <Card className="p-6 bg-mentat-secondary/10 border-mentat-border">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Dark Mode</Label>
              <p className="text-sm text-mentat-primary/70">
                Toggle between light and dark theme
              </p>
            </div>
            <Switch />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Reduced Motion</Label>
              <p className="text-sm text-mentat-primary/70">
                Minimize animations throughout the interface
              </p>
            </div>
            <Switch />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ThemeSettings;
