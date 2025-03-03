import { useState, useEffect, useRef } from "react";
import { Message } from "../types/terminal";
import { InputBar } from "./terminal/InputBar";
import BuildTerminal from "./terminal/BuildTerminal";
import { useBuild } from "@/contexts/BuildContext";
import { useNavigate } from "react-router-dom";
import TerminalDisplay from "./terminal/TerminalDisplay";
import { createCommands } from "./terminal/TerminalCommands";
import TerminalHeader from "./terminal/TerminalHeader";

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
    deployProject,
    shareProject,
    isBuilding
  } = useBuild();

  const commands = createCommands({
    currentDirectory,
    setCurrentDirectory,
    currentProject,
    setCurrentProject,
    startBuild,
    setShowBuildView,
    deployProject,
    shareProject
  });

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
      <TerminalHeader
        currentDirectory={currentDirectory}
        currentProject={currentProject}
        showBuildView={showBuildView}
        setShowBuildView={setShowBuildView}
        isBuilding={isBuilding}
      />
      
      <div className="flex-1 flex flex-col min-h-0">
        {showBuildView ? (
          <BuildTerminal />
        ) : (
          <TerminalDisplay 
            messages={messages}
            currentProject={currentProject}
            setShowBuildView={setShowBuildView}
            currentDirectory={currentDirectory}
            username={username}
          />
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
