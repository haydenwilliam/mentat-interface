
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
  configureProject: (project: Project) => void;
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
      `Starting LLM code generation for ${project.name}...`,
      `Creating project directory...`,
      `Initializing development environment...`
    ]);
    
    // Simulate build progress
    let step = 0;
    const buildSteps = [
      "Analyzing project requirements...",
      "Generating code structure...",
      "Writing core functionalities...",
      "Implementing user interface components...",
      "Optimizing code for performance...",
      "Project successfully built! Ready for deployment."
    ];
    
    const interval = setInterval(() => {
      if (step < buildSteps.length) {
        addBuildLog(buildSteps[step]);
        step++;
        
        // Notify when the build is complete
        if (step === buildSteps.length) {
          toast.success(`Project "${project.name}" is ready to deploy!`);
        }
      } else {
        clearInterval(interval);
      }
    }, 2000);
  };

  const stopBuild = () => {
    if (isBuilding) {
      setIsBuilding(false);
      addBuildLog("LLM code generation paused. You can resume later.");
      toast.info("Build process paused");
    }
  };

  const deployProject = (project: Project) => {
    setCurrentProject(project);
    setIsDeploying(true);
    addBuildLog(`Deploying ${project.name}...`);
    
    // Simulate deployment process
    setTimeout(() => {
      addBuildLog("Initializing runtime environment...");
      
      setTimeout(() => {
        addBuildLog("Loading project files...");
        
        setTimeout(() => {
          addBuildLog("Starting application services...");
          
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
  
  const configureProject = (project: Project) => {
    // In a real implementation, this would open a configuration interface
    addBuildLog(`Opening configuration for ${project.name}...`);
    toast.info(`Project configuration opened for ${project.name}`);
    
    // You would typically navigate to a configuration page or open a modal here
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
        configureProject,
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
