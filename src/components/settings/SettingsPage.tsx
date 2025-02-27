
import React from "react";
import ModelConfiguration from "./ModelConfiguration";
import ThemeSettings from "./ThemeSettings";
import { Settings2, PaintBrush } from "lucide-react";

const SettingsPage = () => {
  return (
    <div className="h-full overflow-y-auto space-y-8 p-6">
      <h1 className="text-2xl font-display font-bold text-mentat-primary flex items-center gap-2">
        <Settings2 className="w-6 h-6" />
        Settings
      </h1>
      
      {/* Model Configuration Section */}
      <section className="space-y-6">
        <ModelConfiguration />
      </section>

      {/* Theme & Accessibility Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 mb-2">
          <PaintBrush className="w-5 h-5 text-mentat-primary" />
          <h2 className="text-xl font-display font-semibold text-mentat-primary">Theme & Accessibility</h2>
        </div>
        <ThemeSettings />
      </section>
    </div>
  );
};

export default SettingsPage;
