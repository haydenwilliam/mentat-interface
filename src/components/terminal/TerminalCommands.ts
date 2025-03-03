
import { Project } from "../projects/types";
import { demoProjects } from "../projects/types";

export interface CommandsConfig {
  currentDirectory: string;
  setCurrentDirectory: (dir: string) => void;
  currentProject: Project | null;
  setCurrentProject: (project: Project | null) => void;
  startBuild: (project: Project) => void;
  setShowBuildView: (show: boolean) => void;
  deployProject: (project: Project) => void;
  shareProject: (project: Project) => void;
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
    shareProject
  } = config;

  return {
    help: "Available commands:\n- pwd: Print working directory\n- ls: List directory contents\n- cd: Change directory\n- clear: Clear terminal\n- about: Show system information\n- project: List or select projects\n- build: Start configuration mode for the current project\n- deploy: Compile and run the current project\n- share: Generate a share link for the current project\n- configure: Edit project settings",
    clear: "Clearing terminal...",
    pwd: currentDirectory,
    ls: "Documents  Downloads  Projects  README.md",
    cd: (args: string) => {
      if (!args) return "Usage: cd <directory>";
      setCurrentDirectory(args);
      return `Changed directory to ${args}`;
    },
    about: "MENTAT v1.0 - Advanced Computing Interface\nCopyright © 2024",
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
      return `Selected project: ${selectedProject.name}`;
    },
    build: (args: string) => {
      if (!currentProject) {
        return "No project selected. Use 'project <number>' to select a project first.";
      }
      
      startBuild(currentProject);
      setShowBuildView(true);
      return `Entering configuration mode for ${currentProject.name}...`;
    },
    deploy: () => {
      if (!currentProject) {
        return "No project selected. Use 'project <number>' to select a project first.";
      }
      
      deployProject(currentProject);
      setShowBuildView(true);
      return `Deploying and running ${currentProject.name}...`;
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
      
      return `Configure project settings for ${currentProject.name}: (Not implemented yet)`;
    },
  };
};
