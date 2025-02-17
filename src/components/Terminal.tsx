
import { useState, useEffect, useRef } from "react";
import { Terminal as TerminalIcon, Bot, User } from "lucide-react";

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
        content: input.slice(1), // Remove the / from displayed command
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
      <div className="flex items-center gap-2 mb-2 px-2">
        <TerminalIcon className="w-4 h-4 text-mentat-highlight/80" />
        <span className="text-mentat-highlight/80 text-sm">Terminal</span>
        <span className="text-xs text-mentat-primary/50 ml-auto">
          {currentDirectory}
        </span>
      </div>
      
      <div ref={terminalRef} className="flex-1 overflow-auto terminal-text space-y-2 mb-4 p-2">
        {messages.map((msg, i) => <div key={i} className={`flex items-start gap-2 ${msg.type === 'chat' && msg.sender === 'user' || msg.type === 'command' ? 'flex-row-reverse' : 'flex-row'}`}>
            {msg.type === 'command' && <div className="bg-mentat-secondary/20 border-l-4 border-mentat-primary text-mentat-primary rounded-lg p-3 ml-auto max-w-[80%]">
                <div className="flex items-center gap-2 mb-1">
                  <User className="w-4 h-4" />
                  <span className="text-xs opacity-70">Terminal Command</span>
                </div>
                <p className="text-sm font-mono">$ {msg.content}</p>
              </div>}
            
            {msg.type === 'chat' && <div className={`
                p-3 rounded-lg max-w-[80%]
                ${msg.sender === 'user' 
                  ? 'bg-mentat-primary/10 text-mentat-primary ml-auto' 
                  : 'bg-mentat-secondary/10 border border-mentat-highlight/20 text-mentat-highlight/90'}
              `}>
                <div className="flex items-center gap-2 mb-1">
                  {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  <span className="text-xs opacity-70">
                    {msg.sender === 'user' ? 'You' : 'Thufir'}
                  </span>
                </div>
                <p className="text-sm">{msg.content}</p>
              </div>}

            {(msg.type === 'response' || msg.type === 'system') && <div className={`
                flex items-start gap-2 rounded-lg p-2
                ${msg.type === 'system' 
                  ? 'text-mentat-primary/50 italic bg-mentat-primary/5' 
                  : 'text-mentat-highlight bg-mentat-secondary/20 border-l-4 border-mentat-secondary'}
              `}>
                {msg.type === 'response' && <TerminalIcon className="w-4 h-4 mt-1 text-mentat-secondary" />}
                <div className="flex-1 font-mono text-sm">
                  {msg.content.split('\n').map((line, j) => <div key={j}>{line}</div>)}
                </div>
              </div>}
          </div>)}
      </div>

      <form onSubmit={handleSubmit} className="flex items-center gap-2 px-2 py-2 border-t border-mentat-border/30">
        <span className="text-mentat-primary/50">&gt;</span>
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
