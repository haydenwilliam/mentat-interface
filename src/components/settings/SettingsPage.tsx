
import React from "react";
import ModelConfiguration from "./ModelConfiguration";
import ThemeSettings from "./ThemeSettings";
import { Settings2, Paintbrush } from "lucide-react";

const SettingsPage = () => {
  return (
    <div className="h-full overflow-y-auto space-y-8 p-8 bg-mentat-background/30">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-display font-bold text-mentat-primary flex items-center gap-2 mb-8">
          <Settings2 className="w-6 h-6" />
          Settings
        </h1>
        
        {/* Model Configuration Section */}
        <section className="relative space-y-6">
          <div className="absolute inset-0 bg-gradient-to-r from-mentat-primary/5 to-transparent opacity-50 pointer-events-none" />
          <ModelConfiguration />
        </section>

        {/* Theme & Accessibility Section */}
        <section className="relative space-y-6 mt-12">
          <div className="absolute inset-0 bg-gradient-to-r from-mentat-primary/5 to-transparent opacity-50 pointer-events-none" />
          <div className="flex items-center gap-2 mb-4">
            <div className="p-1.5 rounded-md bg-mentat-secondary/40">
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

