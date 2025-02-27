
import React from "react";
import ModelConfiguration from "./ModelConfiguration";
import ThemeSettings from "./ThemeSettings";

const SettingsPage = () => {
  return (
    <div className="h-full overflow-y-auto space-y-8 p-6">
      <h1 className="text-2xl font-display font-bold text-mentat-primary">Settings</h1>
      
      {/* Model Configuration Section */}
      <section className="space-y-6">
        <ModelConfiguration />
      </section>

      {/* Theme & Accessibility Section */}
      <section className="space-y-6">
        <ThemeSettings />
      </section>
    </div>
  );
};

export default SettingsPage;
