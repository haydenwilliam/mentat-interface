
import React from "react";
import ModelConfiguration from "./ModelConfiguration";
import ThemeSettings from "./ThemeSettings";
import { Paintbrush } from "lucide-react";

const SettingsPage = () => {
  return (
    <div className="h-full p-4 bg-mentat-background/80 rounded-lg border border-mentat-border/20 overflow-y-auto">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-2xl font-display font-bold text-mentat-primary text-center">
          Settings
        </h1>
        
        {/* Model Configuration Section */}
        <section className="space-y-6">
          <ModelConfiguration />
        </section>

        {/* Theme & Accessibility Section */}
        <section className="space-y-6 pb-12">
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 rounded-md bg-mentat-secondary/40">
              <Paintbrush className="w-5 h-5 text-mentat-primary" />
            </div>
            <h2 className="text-xl font-display font-semibold text-mentat-primary">Theme & Accessibility</h2>
          </div>
          <ThemeSettings />
        </section>
      </div>
    </div>
  );
};

export default SettingsPage;
