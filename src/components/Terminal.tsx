
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
  const terminalRef = useRef<HTMLDivElement>(null);

  const commands = {
    help: "Available commands:\n- pwd: Print working directory\n- ls: List directory contents\n- cd: Change directory\n- clear: Clear terminal\n- about: Show system information",
    clear: "Clearing terminal...",
    pwd: currentDirectory,
    ls: "Documents  Downloads  Projects  README.md",
    cd: (args: string) => {
      if (!args) return "Usage: cd <directory>";
      // Simplified directory navigation
      if (args === "..") {
        const newPath = currentDirectory.split("/").slice(0, -1).join("/") || "/";
        setCurrentDirectory(newPath);
        return `Changed directory to ${newPath}`;
      } else {
        const newPath = args.startsWith("/") ? args : `${currentDirectory}/${args}`;
        setCurrentDirectory(newPath);
        return `Changed directory to ${newPath}`;
      }
    },
    about: "MENTAT v1.0 - Advanced Computing Interface\nCopyright © 2024"
  };

  useEffect(() => {
    setMessages([{
      type: 'response',
      content: "Welcome! Chat directly or use '/' for terminal commands (try /help)"
    }]);
  }, []);

  const handleInput = (input: string) => {
    if (input.startsWith('/')) {
      // Handle as command
      const fullCmd = input.slice(1).trim();
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
        response = command || "Unknown command. Type /help for available commands.";
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
      // Handle as chat (default mode)
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

  return <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-2 px-2">
        <div className="flex items-center gap-2">
          <TerminalIcon className="w-4 h-4 text-mentat-highlight/80" />
          <span className="text-mentat-highlight/80 text-sm">Terminal</span>
        </div>
        <div className="flex items-center gap-2 text-mentat-primary/50 text-xs">
          <Folder className="w-3 h-3" />
          <span className="font-mono">{currentDirectory}</span>
        </div>
      </div>
      
      <div ref={terminalRef} className="flex-1 overflow-auto terminal-text space-y-2 mb-4 p-2">
        {messages.map((msg, i) => <div key={i} className={`flex items-start gap-2 ${msg.type === 'chat' && msg.sender === 'user' || msg.type === 'command' ? 'flex-row-reverse' : 'flex-row'}`}>
            {msg.type === 'command' && <div className="bg-mentat-primary/10 text-mentat-primary rounded-lg p-3 ml-auto max-w-[80%]">
                <div className="flex items-center gap-2 mb-1">
                  <User className="w-4 h-4" />
                  <span className="text-xs opacity-70">Command</span>
                </div>
                <p className="text-sm font-mono">{msg.content}</p>
              </div>}
            
            {msg.type === 'chat' && <div className={`
                p-3 rounded-lg max-w-[80%]
                ${msg.sender === 'user' ? 'bg-mentat-primary/10 text-mentat-primary ml-auto' : 'bg-mentat-secondary/20 text-mentat-highlight/90'}
              `}>
                <div className="flex items-center gap-2 mb-1">
                  {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  <span className="text-xs opacity-70">
                    {msg.sender === 'user' ? 'You' : 'MENTAT'}
                  </span>
                </div>
                <p className="text-sm">{msg.content}</p>
              </div>}

            {(msg.type === 'response' || msg.type === 'system') && <div className={`
                flex items-start gap-2
                ${msg.type === 'system' ? 'text-mentat-primary/50 italic' : 'text-mentat-highlight'}
              `}>
                {msg.type === 'response' && <Bot className="w-4 h-4 mt-1" />}
                <div className="flex-1 font-mono">
                  {msg.content.split('\n').map((line, j) => <div key={j}>{line}</div>)}
                </div>
              </div>}
          </div>)}
      </div>

      <form onSubmit={handleSubmit} className="flex items-center gap-2 px-2 py-2 border-t border-mentat-border/30">
        <div className="flex items-center gap-2 text-mentat-primary/50">
          <span className="text-xs font-mono">{currentDirectory}</span>
          <span>&gt;</span>
        </div>
        <input 
          type="text" 
          value={input} 
          onChange={e => setInput(e.target.value)} 
          className="flex-1 bg-transparent border-none outline-none terminal-text" 
          placeholder="Chat directly or use / for commands..." 
          spellCheck="false" 
          autoComplete="off" 
        />
      </form>
    </div>;
};

export default Terminal;
