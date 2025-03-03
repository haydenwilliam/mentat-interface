
import { Project } from "../projects/types";
import { demoProjects } from "../projects/types";
import { toast } from "sonner";

export interface CommandsConfig {
  currentDirectory: string;
  setCurrentDirectory: (dir: string) => void;
  currentProject: Project | null;
  setCurrentProject: (project: Project | null) => void;
  startBuild: (project: Project) => void;
  setShowBuildView: (show: boolean) => void;
  deployProject: (project: Project) => void;
  shareProject: (project: Project) => void;
  configureProject: (project: Project) => void;
}

export const createCommands = (config: CommandsConfig) => {
  const {
    currentDirectory,
    setCurrentDirectory,
    currentProject,
    setCurrentProject,
    startBuild,
    setShowBuildView,
    deployProject,
    shareProject,
    configureProject
  } = config;

  return {
    help: "Available commands:\n- pwd: Print working directory\n- ls: List directory contents\n- cd: Change directory\n- clear: Clear terminal\n- about: Show system information\n- project: List or select projects\n- build: Start LLM code generation for the current project\n- deploy: Run the code written during the build stage\n- share: Generate a share link for the current project\n- configure: Edit project settings\n- mkdir: Create a new directory for a project",
    clear: "Clearing terminal...",
    pwd: currentDirectory,
    ls: (args: string) => {
      if (args === "projects") {
        return demoProjects.map((p, i) => `${i + 1}. ${p.name} (${p.type})`).join("\n");
      }
      return "Documents  Downloads  Projects  README.md";
    },
    cd: (args: string) => {
      if (!args) return "Usage: cd <directory>";
      
      if (args === "projects") {
        setCurrentDirectory("/home/user/projects");
        return "Changed directory to /home/user/projects";
      }
      
      if (currentDirectory === "/home/user/projects" && args.startsWith("project-")) {
        const projectName = args;
        const project = demoProjects.find(p => p.name.toLowerCase().replace(/\s+/g, "-") === projectName);
        
        if (project) {
          setCurrentProject(project);
          setCurrentDirectory(`/home/user/projects/${projectName}`);
          return `Changed directory to /home/user/projects/${projectName}`;
        }
      }
      
      setCurrentDirectory(args);
      return `Changed directory to ${args}`;
    },
    about: "MENTAT v1.0 - Advanced Computing Interface\nCopyright © 2024\n\nMENTAT is a terminal-based interface for AI-assisted project development.\nUse 'project' command to select a project, 'build' to start LLM code generation,\nand 'deploy' to run the generated code.",
    project: (args: string) => {
      if (!args) {
        return "Available projects:\n" + demoProjects.map((p, i) => `${i + 1}. ${p.name} (${p.type})`).join("\n") 
          + "\n\nUsage: project <number> to select a project";
      }
      
      const projectIndex = parseInt(args) - 1;
      if (isNaN(projectIndex) || projectIndex < 0 || projectIndex >= demoProjects.length) {
        return "Invalid project number. Type 'project' to see available projects.";
      }
      
      const selectedProject = demoProjects[projectIndex];
      setCurrentProject(selectedProject);
      setShowBuildView(false);
      
      // Update current directory to reflect the project
      const projectDirName = selectedProject.name.toLowerCase().replace(/\s+/g, "-");
      setCurrentDirectory(`/home/user/projects/${projectDirName}`);
      
      return `Selected project: ${selectedProject.name}\nDirectory changed to: /home/user/projects/${projectDirName}`;
    },
    build: () => {
      if (!currentProject) {
        return "No project selected. Use 'project <number>' to select a project first.";
      }
      
      startBuild(currentProject);
      setShowBuildView(true);
      return `Starting LLM code generation for ${currentProject.name}...\nThe AI will help you build and iterate on your project.`;
    },
    deploy: () => {
      if (!currentProject) {
        return "No project selected. Use 'project <number>' to select a project first.";
      }
      
      deployProject(currentProject);
      setShowBuildView(true);
      return `Deploying ${currentProject.name}...\nExecuting code generated during the build phase.`;
    },
    share: () => {
      if (!currentProject) {
        return "No project selected. Use 'project <number>' to select a project first.";
      }
      
      shareProject(currentProject);
      return `Generating share link for ${currentProject.name}...`;
    },
    configure: () => {
      if (!currentProject) {
        return "No project selected. Use 'project <number>' to select a project first.";
      }
      
      configureProject(currentProject);
      return `Opening configuration for ${currentProject.name}...`;
    },
    mkdir: (args: string) => {
      if (!args) return "Usage: mkdir <project-name>";
      
      const projectName = args;
      const projectAlreadyExists = demoProjects.some(p => p.name.toLowerCase() === projectName.toLowerCase());
      
      if (projectAlreadyExists) {
        return `Error: A project named "${projectName}" already exists.`;
      }
      
      // In a real implementation, we would create a new project here
      toast.success(`Project directory "${projectName}" created successfully!`);
      return `Created project directory: ${projectName}\nUse 'build' to start developing this project.`;
    }
  };
};
