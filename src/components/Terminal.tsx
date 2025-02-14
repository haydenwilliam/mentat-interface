
import { useState, useEffect, useRef } from "react";
import { Terminal as TerminalIcon, Bot } from "lucide-react";

interface Message {
  type: 'command' | 'response' | 'system';
  content: string;
}

const Terminal = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const terminalRef = useRef<HTMLDivElement>(null);

  const commands = {
    help: "Available commands: help, clear, status, about, agents",
    clear: "Clearing terminal...",
    status: "All systems operational. Running diagnostics...",
    about: "MENTAT v1.0 - Advanced Computing Interface\nCopyright © 2024",
    agents: "Active Agents:\n- Core Agent (Running)\n- File Parser (Idle)\n- Data Analyzer (Standby)",
  };

  useEffect(() => {
    setMessages([
      { type: 'system', content: "MENTAT Terminal v1.0" },
      { type: 'system', content: "Initializing system..." },
      { type: 'system', content: "Core Agent activated" },
      { type: 'response', content: "Hello! I am MENTAT's core agent. How can I assist you today?" },
    ]);
  }, []);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    
    if (trimmedCmd === "clear") {
      setMessages([]);
    } else {
      const response = commands[trimmedCmd as keyof typeof commands] || "Processing your request...";
      
      setMessages(prev => [
        ...prev,
        { type: 'command', content: cmd },
        { type: 'response', content: response }
      ]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      handleCommand(input);
      setInput("");
      setTimeout(() => {
        terminalRef.current?.scrollTo({
          top: terminalRef.current.scrollHeight,
          behavior: "smooth",
        });
      }, 100);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-2 px-2">
        <div className="flex items-center gap-2">
          <TerminalIcon className="w-4 h-4 text-mentat-highlight/80" />
          <span className="text-mentat-highlight/80 text-sm">Terminal</span>
        </div>
        <span className="text-mentat-primary/50 text-xs">Core Agent Active</span>
      </div>
      
      <div
        ref={terminalRef}
        className="flex-1 overflow-auto terminal-text space-y-2 mb-4 p-2"
      >
        {messages.map((msg, i) => (
          <div 
            key={i} 
            className={`flex items-start gap-2 ${
              msg.type === 'system' ? 'text-mentat-primary/50 italic' :
              msg.type === 'command' ? 'text-mentat-primary' : 'text-mentat-highlight'
            }`}
          >
            {msg.type === 'command' && <span>&gt;</span>}
            {msg.type === 'response' && <Bot className="w-4 h-4 mt-1" />}
            <div className="flex-1">
              {msg.content.split('\n').map((line, j) => (
                <div key={j}>{line}</div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex items-center px-2 py-2 border-t border-mentat-border/30">
        <span className="text-mentat-primary mr-2">&gt;</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent border-none outline-none terminal-text"
          placeholder="Enter a command or message..."
          spellCheck="false"
          autoComplete="off"
        />
      </form>
    </div>
  );
};

export default Terminal;
