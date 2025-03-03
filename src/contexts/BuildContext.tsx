
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
      `Entering configuration mode for ${project.name}...`,
      `Loading project assets...`,
      `Preparing development environment...`
    ]);
    
    // Simulate build progress
    let step = 0;
    const buildSteps = [
      "Loading project configuration...",
      "Setting up development environment...",
      "Analyzing project structure...",
      "Initializing build tools...",
      "Ready to help you build and iterate on your project!"
    ];
    
    const interval = setInterval(() => {
      if (step < buildSteps.length) {
        addBuildLog(buildSteps[step]);
        step++;
      } else {
        clearInterval(interval);
        toast.success(`${project.name} is ready for development!`);
      }
    }, 2000);
  };

  const stopBuild = () => {
    if (isBuilding) {
      setIsBuilding(false);
      addBuildLog("Exiting configuration mode.");
      toast.info("Configuration mode exited");
    }
  };

  const deployProject = (project: Project) => {
    setCurrentProject(project);
    setIsDeploying(true);
    addBuildLog(`Deploying ${project.name}...`);
    
    // Simulate deployment process
    setTimeout(() => {
      addBuildLog("Compiling project...");
      
      setTimeout(() => {
        addBuildLog("Optimizing assets...");
        
        setTimeout(() => {
          addBuildLog("Preparing runtime environment...");
          
          setTimeout(() => {
            addBuildLog(`🚀 ${project.name} is now running!`);
            setIsDeploying(false);
            toast.success(`${project.name} is now running!`);
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
