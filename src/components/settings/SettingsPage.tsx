
import React from "react";
import ModelConfiguration from "./ModelConfiguration";
import ThemeSettings from "./ThemeSettings";
import { Settings2, Paintbrush } from "lucide-react";

const SettingsPage = () => {
  return (
    <div className="h-full overflow-y-auto p-4 bg-mentat-background/80 rounded-lg border border-mentat-border/20">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-md bg-mentat-secondary/40">
            <Settings2 className="w-5 h-5 text-mentat-primary" />
          </div>
          <h1 className="text-2xl font-display font-bold text-mentat-primary">
            Settings
          </h1>
        </div>
        
        {/* Model Configuration Section */}
        <section className="space-y-6">
          <ModelConfiguration />
        </section>

        {/* Theme & Accessibility Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
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
