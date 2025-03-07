import React from "react";
import ModelConfiguration from "./ModelConfiguration";
import ThemeSettings from "./ThemeSettings";
import { Settings, Paintbrush } from "lucide-react";
import { typography } from "../../styles/fontSchema";

const SettingsPage = () => {
  return (
    <div className="h-full w-full p-6 relative">
      {/* Subtle background pattern - works for both light/dark */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.02] dark:opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, var(--mentat-border) 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }}
      />

      <div className="h-full w-full rounded-xl border-[3px] border-mentat-border bg-mentat-background/90 backdrop-blur-[2px] overflow-hidden flex flex-col shadow-[0_4px_20px_-8px_rgba(var(--mentat-border-rgb),0.3)] dark:shadow-[0_0_30px_-5px_rgba(var(--mentat-highlight-rgb),0.07)]">
        {/* Fixed Header */}
        <div className="px-6 py-6 border-b-[3px] border-mentat-border/30 bg-gradient-to-r from-mentat-secondary/50 to-mentat-secondary/10 backdrop-blur-sm">
          <h1 className={`${typography.pageTitle}`}>
            Settings
          </h1>
          <p className={`${typography.bodyText} text-mentat-highlight max-w-2xl`}>
            Configure the look and feel of Mentat
          </p>
        </div>
        
        {/* Scrollable Content */}
        <div 
          className="flex-1 overflow-y-auto overflow-x-hidden px-4 py-8 bg-gradient-to-b from-mentat-background to-[rgba(var(--mentat-secondary-rgb),0.05)] dark:from-mentat-background dark:to-[rgba(var(--mentat-highlight-rgb),0.03)]"
        >
          <div className="max-w-full mx-auto">
            <div className="grid grid-cols-1 gap-10 pb-6">
              {/* Model Configuration Section */}
              <section className="grid grid-cols-1 gap-4">
                <div className="flex items-center gap-3 mb-2">
                  <Settings className="h-6 w-6 text-mentat-highlight" />
                  <h2 className={typography.sectionTitle}>Model Configuration</h2>
                </div>
                <ModelConfiguration />
              </section>

              {/* Theme Settings Section */}
              <section className="grid grid-cols-1 gap-4">
                <div className="flex items-center gap-3 mb-2">
                  <Paintbrush className="h-6 w-6 text-mentat-highlight" />
                  <h2 className={typography.sectionTitle}>Theme Settings</h2>
                </div>
                <ThemeSettings />
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
