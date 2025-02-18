
import { useState, useEffect, useRef } from "react";
import { Terminal as TerminalIcon, Bot, User, Folder } from "lucide-react";

interface Message {
  type: 'command' | 'response' | 'system' | 'chat';
  content: string;
  sender?: 'user' | 'assistant';
}

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
      content: "Welcome! I am Thufir, your Mentat interface. You may chat with me directly or use '/' for terminal commands (try /help)",
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

  const toggleMode = () => {
    setIsInTerminalMode(!isInTerminalMode);
    setInput("");
  };

  return (
    <div className="flex-1 relative overflow-hidden border border-mentat-border bg-mentat-secondary/10 rounded-lg flex flex-col">
      <div className="flex items-center justify-between w-full gap-2 px-3 py-1 bg-mentat-secondary/20 rounded-t-lg border-b border-mentat-border/30">
        <div className="flex items-center gap-2 text-mentat-primary">
          <Folder className="w-4 h-4" />
          <span className="text-xs font-mono">{currentDirectory}</span>
        </div>
        <button 
          onClick={toggleMode}
          className="flex items-center gap-2 px-2 py-1 rounded-full border border-mentat-border/30 bg-mentat-secondary/20 hover:bg-mentat-secondary/30 transition-all duration-200"
        >
          <div 
            className={`flex items-center gap-2 relative ${
              isInTerminalMode ? 'text-mentat-primary' : 'text-mentat-highlight'
            }`}
          >
            <span className={`flex items-center gap-1 text-xs font-medium transition-opacity duration-200 ${
              isInTerminalMode ? 'opacity-100' : 'opacity-40'
            }`}>
              <TerminalIcon className="w-3 h-3" />
              Terminal
            </span>
            <div className="w-px h-3 bg-mentat-border/30" />
            <span className={`flex items-center gap-1 text-xs font-medium transition-opacity duration-200 ${
              !isInTerminalMode ? 'opacity-100' : 'opacity-40'
            }`}>
              <Bot className="w-3 h-3" />
              Chat
            </span>
          </div>
        </button>
      </div>
      
      <div className="flex-1 flex flex-col min-h-0">
        <div 
          ref={terminalRef} 
          className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-mentat-border/50 scrollbar-track-transparent terminal-text space-y-2 p-2"
        >
          {messages.map((msg, i) => {
            if (msg.type === 'chat') {
              return (
                <div 
                  key={i} 
                  className={`flex items-start gap-2 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <div 
                    className={`
                      p-3 rounded-lg max-w-[80%] backdrop-blur-sm
                      ${msg.sender === 'user' 
                        ? 'bg-mentat-primary/10 text-mentat-primary ml-auto border border-mentat-primary/20' 
                        : 'bg-mentat-secondary/10 border border-mentat-highlight/20 text-mentat-highlight/90'}
                    `}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                      <span className="text-xs opacity-70">
                        {msg.sender === 'user' ? 'You' : 'Thufir'}
                      </span>
                    </div>
                    <p className="text-sm">{msg.content}</p>
                  </div>
                </div>
              );
            }
            
            if (msg.type === 'command') {
              const response = messages[i + 1];
              return (
                <div key={i} className="bg-mentat-secondary/10 rounded-lg border border-mentat-border/30 overflow-hidden">
                  <div className="flex items-center justify-between px-3 py-1 border-b border-mentat-border/30 bg-mentat-secondary/20">
                    <div className="flex items-center gap-2">
                      <TerminalIcon className="w-3 h-3 text-mentat-highlight/80" />
                      <span className="text-xs text-mentat-highlight/80">Terminal</span>
                    </div>
                    <span className="text-xs text-mentat-primary/50">{currentDirectory}</span>
                  </div>
                  <div className="p-3 border-b border-mentat-border/30">
                    <div className="font-mono text-sm text-mentat-primary">
                      <span className="opacity-70">{username}@mentat:</span> 
                      <span className="text-mentat-highlight">{currentDirectory}</span>
                      <span className="text-mentat-primary">$ </span>
                      {msg.content}
                    </div>
                  </div>
                  {response && response.type === 'response' && (
                    <div className="p-3 font-mono text-sm text-mentat-highlight/90">
                      {response.content.split('\n').map((line, j) => (
                        <div key={j}>{line}</div>
                      ))}
                    </div>
                  )}
                </div>
              );
            }
            
            return null;
          })}
        </div>

        <form 
          onSubmit={handleSubmit} 
          className="flex items-center gap-2 px-4 py-3 border-t border-mentat-border/30 bg-mentat-secondary/5 backdrop-blur-sm"
        >
          {isInTerminalMode ? (
            <div className="text-xs text-mentat-primary/50 font-mono">
              <span className="opacity-70">{username}@mentat:</span>
              <span className="text-mentat-highlight">{currentDirectory}</span>
              <span className="text-mentat-primary">$ </span>
            </div>
          ) : (
            <span className="text-mentat-primary/50">&gt;</span>
          )}
          <input 
            type="text" 
            value={input} 
            onChange={e => setInput(e.target.value)} 
            className="flex-1 bg-transparent border-none outline-none terminal-text" 
            placeholder={isInTerminalMode ? "Enter command..." : "Chat with Thufir..."} 
            spellCheck="false" 
            autoComplete="off" 
          />
        </form>
      </div>
    </div>
  );
};

export default Terminal;
