
import { useState, useEffect, useRef } from "react";
import { Folder, Play, Bot, Upload, Share2, Settings } from "lucide-react";
import { Message } from "../types/terminal";
import { ChatMessage } from "./terminal/ChatMessage";
import { CommandMessage } from "./terminal/CommandMessage";
import { InputBar } from "./terminal/InputBar";
import BuildTerminal from "./terminal/BuildTerminal";
import { useBuild } from "@/contexts/BuildContext";
import { demoProjects } from "./projects/types";
import { useNavigate } from "react-router-dom";

const Terminal = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentDirectory, setCurrentDirectory] = useState("/home/user");
  const [isInTerminalMode, setIsInTerminalMode] = useState(false);
  const [showBuildView, setShowBuildView] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const username = "mentat";
  const navigate = useNavigate();
  
  const { 
    currentProject, 
    setCurrentProject, 
    startBuild, 
    stopBuild,
    buildLogs, 
    isBuilding,
    deployProject,
    shareProject
  } = useBuild();

  const commands = {
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

  useEffect(() => {
    setMessages([{
      type: 'chat',
      content: "Welcome! I am Thufir, your Mentat Assistant. You may chat with me directly or use '/' for terminal commands (try /help)",
      sender: 'assistant'
    }]);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'c') {
        setIsInTerminalMode(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleInput = (input: string) => {
    if (isInTerminalMode) {
      const fullCmd = input.trim();
      const [cmd, ...args] = fullCmd.split(" ");
      const cmdKey = cmd.toLowerCase();

      if (cmdKey === "clear") {
        setMessages([]);
        return;
      }

      const command = commands[cmdKey as keyof typeof commands];
      let response;
      
      if (typeof command === "function") {
        response = command(args.join(" "));
      } else {
        response = command || "Unknown command. Type help for available commands.";
      }

      setMessages(prev => [...prev, {
        type: 'command',
        content: input,
        sender: 'user'
      }, {
        type: 'response',
        content: response
      }]);
    } else {
      if (input.startsWith('/')) {
        setIsInTerminalMode(true);
        handleInput(input.slice(1));
        return;
      }
      setMessages(prev => [...prev, {
        type: 'chat',
        content: input,
        sender: 'user'
      }, {
        type: 'chat',
        content: "I understand your message. How can I assist you further?",
        sender: 'assistant'
      }]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      handleInput(input.trim());
      setInput("");
      setTimeout(() => {
        terminalRef.current?.scrollTo({
          top: terminalRef.current.scrollHeight,
          behavior: "smooth"
        });
      }, 100);
    }
  };

  const navigateToProjects = () => {
    navigate('/projects');
  };

  return (
    <div className="flex-1 relative overflow-hidden border border-mentat-border bg-mentat-background rounded-lg flex flex-col">
      <div className="flex items-center justify-between w-full gap-2 px-3 py-1 bg-mentat-secondary/20 rounded-t-lg border-b border-mentat-border/30">
        <div className="flex items-center gap-2 text-mentat-primary">
          <Folder className="w-4 h-4" />
          <span className="text-xs font-mono">{currentDirectory}</span>
        </div>
        <div className="flex items-center gap-2">
          {currentProject && (
            <>
              <div 
                className="text-xs bg-mentat-secondary/40 px-2 py-0.5 rounded border border-mentat-border/30 cursor-pointer hover:bg-mentat-secondary/60 transition-colors"
                onClick={navigateToProjects}
              >
                <span className="opacity-70">Project: </span>
                <span className="text-mentat-highlight">{currentProject.name}</span>
              </div>
              <button 
                onClick={() => setShowBuildView(!showBuildView)}
                className={`flex items-center gap-1.5 text-xs py-0.5 px-2 rounded border ${
                  showBuildView 
                    ? 'bg-mentat-highlight/10 text-mentat-highlight border-mentat-highlight/30' 
                    : 'bg-mentat-secondary/30 text-mentat-primary/70 border-mentat-border/30 hover:bg-mentat-secondary/50'
                }`}
              >
                <Play className="w-3 h-3" />
                {isBuilding ? "Building..." : "Build View"}
              </button>
            </>
          )}
        </div>
      </div>
      
      <div className="flex-1 flex flex-col min-h-0">
        {showBuildView ? (
          <BuildTerminal />
        ) : (
          <div 
            ref={terminalRef} 
            className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-mentat-border/50 scrollbar-track-transparent terminal-text space-y-2 p-2"
          >
            {currentProject && !showBuildView && (
              <div className="flex items-center justify-between gap-2 p-2 rounded bg-mentat-secondary/20 border border-mentat-border/30 mb-3">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-full bg-mentat-secondary/40 border border-mentat-border/30">
                    {currentProject.type === "software" && <Folder className="w-3.5 h-3.5 text-mentat-highlight" />}
                    {currentProject.type === "agent" && <Bot className="w-3.5 h-3.5 text-mentat-highlight" />}
                    {currentProject.type === "game" && <Play className="w-3.5 h-3.5 text-mentat-highlight" />}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-mentat-highlight">{currentProject.name}</div>
                    <div className="text-xs opacity-70">{currentProject.type}</div>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button 
                    onClick={() => {
                      startBuild(currentProject);
                      setShowBuildView(true);
                    }}
                    className="flex items-center gap-1.5 text-xs py-1 px-2 rounded bg-mentat-secondary/10 hover:bg-mentat-secondary/20 text-mentat-primary border border-mentat-border/30"
                  >
                    <Settings className="w-3 h-3" />
                    Build
                  </button>
                  <button 
                    onClick={() => {
                      deployProject(currentProject);
                      setShowBuildView(true);
                    }}
                    className="flex items-center gap-1.5 text-xs py-1 px-2 rounded bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/30"
                  >
                    <Play className="w-3 h-3" />
                    Deploy
                  </button>
                  <button 
                    onClick={() => {
                      shareProject(currentProject);
                    }}
                    className="flex items-center gap-1.5 text-xs py-1 px-2 rounded bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 border border-purple-500/30"
                  >
                    <Share2 className="w-3 h-3" />
                    Share
                  </button>
                  <button 
                    className="flex items-center gap-1.5 text-xs py-1 px-2 rounded bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/30"
                  >
                    <Settings className="w-3 h-3" />
                    Configure
                  </button>
                </div>
              </div>
            )}

            {messages.map((msg, i) => {
              if (msg.type === 'chat') {
                return <ChatMessage key={i} message={msg} />;
              }
              
              if (msg.type === 'command') {
                const response = messages[i + 1];
                return (
                  <CommandMessage 
                    key={i} 
                    message={msg} 
                    response={response} 
                    currentDirectory={currentDirectory}
                    username={username}
                  />
                );
              }
              
              return null;
            })}
          </div>
        )}

        <InputBar 
          isInTerminalMode={isInTerminalMode}
          setIsInTerminalMode={setIsInTerminalMode}
          input={input}
          setInput={setInput}
          handleSubmit={handleSubmit}
          currentDirectory={currentDirectory}
          username={username}
        />
      </div>
    </div>
  );
};

export default Terminal;
