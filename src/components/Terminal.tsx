
import { useState, useEffect, useRef } from "react";
import { Folder } from "lucide-react";
import { Message } from "../types/terminal";
import { ChatMessage } from "./terminal/ChatMessage";
import { CommandMessage } from "./terminal/CommandMessage";
import { InputBar } from "./terminal/InputBar";

const Terminal = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentDirectory, setCurrentDirectory] = useState("/home/user");
  const [isInTerminalMode, setIsInTerminalMode] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const username = "mentat";

  const commands = {
    help: "Available commands:\n- pwd: Print working directory\n- ls: List directory contents\n- cd: Change directory\n- clear: Clear terminal\n- about: Show system information",
    clear: "Clearing terminal...",
    pwd: currentDirectory,
    ls: "Documents  Downloads  Projects  README.md",
    cd: (args: string) => {
      if (!args) return "Usage: cd <directory>";
      setCurrentDirectory(args);
      return `Changed directory to ${args}`;
    },
    about: "MENTAT v1.0 - Advanced Computing Interface\nCopyright © 2024"
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

  return (
    <div className="flex-1 relative overflow-hidden border border-mentat-border bg-mentat-secondary/10 rounded-lg flex flex-col">
      <div className="flex items-center justify-between w-full gap-2 px-3 py-1 bg-mentat-secondary/20 rounded-t-lg border-b border-mentat-border/30">
        <div className="flex items-center gap-2 text-mentat-primary">
          <Folder className="w-4 h-4" />
          <span className="text-xs font-mono">{currentDirectory}</span>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col min-h-0">
        <div 
          ref={terminalRef} 
          className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-mentat-border/50 scrollbar-track-transparent terminal-text space-y-2 p-2"
        >
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
