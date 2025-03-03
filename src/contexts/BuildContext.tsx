
import React, { createContext, useContext, useState } from "react";
import { Project } from "@/components/projects/types";
import { toast } from "sonner";

interface BuildContextType {
  currentProject: Project | null;
  isBuilding: boolean;
  buildLogs: string[];
  setCurrentProject: (project: Project | null) => void;
  startBuild: (project: Project) => void;
  stopBuild: () => void;
  addBuildLog: (log: string) => void;
}

const BuildContext = createContext<BuildContextType | undefined>(undefined);

export const BuildProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [isBuilding, setIsBuilding] = useState(false);
  const [buildLogs, setBuildLogs] = useState<string[]>([]);

  const startBuild = (project: Project) => {
    setCurrentProject(project);
    setIsBuilding(true);
    setBuildLogs([
      `Starting build for ${project.name}...`,
      `Initializing build environment...`,
      `Checking dependencies...`
    ]);
    
    // Simulate build progress
    let step = 0;
    const buildSteps = [
      "Installing dependencies...",
      "Compiling code...",
      "Running tests...",
      "Optimizing assets...",
      "Build completed successfully!"
    ];
    
    const interval = setInterval(() => {
      if (step < buildSteps.length) {
        addBuildLog(buildSteps[step]);
        step++;
      } else {
        clearInterval(interval);
        setIsBuilding(false);
        toast.success(`Build for ${project.name} completed!`);
      }
    }, 2000);
  };

  const stopBuild = () => {
    if (isBuilding) {
      setIsBuilding(false);
      addBuildLog("Build process terminated.");
      toast.error("Build process terminated");
    }
  };

  const addBuildLog = (log: string) => {
    setBuildLogs(prev => [...prev, log]);
  };

  return (
    <BuildContext.Provider 
      value={{ 
        currentProject, 
        isBuilding, 
        buildLogs, 
        setCurrentProject, 
        startBuild, 
        stopBuild, 
        addBuildLog 
      }}
    >
      {children}
    </BuildContext.Provider>
  );
};

export const useBuild = () => {
  const context = useContext(BuildContext);
  if (context === undefined) {
    throw new Error("useBuild must be used within a BuildProvider");
  }
  return context;
};
