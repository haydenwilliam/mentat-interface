
import React, { createContext, useContext, useState } from "react";
import { Project } from "@/components/projects/types";
import { toast } from "sonner";

interface BuildContextType {
  currentProject: Project | null;
  isBuilding: boolean;
  isDeploying: boolean;
  buildLogs: string[];
  setCurrentProject: (project: Project | null) => void;
  startBuild: (project: Project) => void;
  stopBuild: () => void;
  deployProject: (project: Project) => void;
  shareProject: (project: Project) => void;
  addBuildLog: (log: string) => void;
}

const BuildContext = createContext<BuildContextType | undefined>(undefined);

export const BuildProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [isBuilding, setIsBuilding] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);
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

  const deployProject = (project: Project) => {
    setCurrentProject(project);
    setIsDeploying(true);
    addBuildLog(`Starting deployment for ${project.name}...`);
    
    // Simulate deployment process
    setTimeout(() => {
      addBuildLog("Preparing deployment package...");
      
      setTimeout(() => {
        addBuildLog("Uploading to deployment servers...");
        
        setTimeout(() => {
          addBuildLog("Configuring deployment environment...");
          
          setTimeout(() => {
            addBuildLog(`🚀 ${project.name} deployed successfully!`);
            setIsDeploying(false);
            toast.success(`${project.name} deployed successfully!`);
          }, 1500);
        }, 1500);
      }, 1500);
    }, 1000);
  };

  const shareProject = (project: Project) => {
    // Simulate sharing functionality
    const shareUrl = `https://mentat.app/projects/${project.id}`;
    
    // Copy to clipboard
    navigator.clipboard.writeText(shareUrl)
      .then(() => {
        toast.success(`Share link for ${project.name} copied to clipboard!`);
        addBuildLog(`Share link generated: ${shareUrl}`);
      })
      .catch(() => {
        toast.error("Failed to copy share link");
        addBuildLog("Failed to generate share link.");
      });
  };

  const addBuildLog = (log: string) => {
    setBuildLogs(prev => [...prev, log]);
  };

  return (
    <BuildContext.Provider 
      value={{ 
        currentProject, 
        isBuilding,
        isDeploying,
        buildLogs, 
        setCurrentProject, 
        startBuild, 
        stopBuild,
        deployProject,
        shareProject,
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
