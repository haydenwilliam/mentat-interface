
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
      { type: 'response', content: "Hello! I am MENTAT's core agent. You can type commands starting with '/' or chat with me directly. Try '/help' to see available commands." },
    ]);
  }, []);

  const handleInput = (input: string) => {
    if (input.startsWith('/')) {
      // Handle as command
      const cmd = input.slice(1).trim().toLowerCase();
      
      if (cmd === "clear") {
        setMessages([]);
      } else {
        const response = commands[cmd as keyof typeof commands] || "Unknown command. Type /help for available commands.";
        
        setMessages(prev => [
          ...prev,
          { type: 'command', content: input, sender: 'user' },
          { type: 'response', content: response }
        ]);
      }
    } else {
      // Handle as chat
      setMessages(prev => [
        ...prev,
        { type: 'chat', content: input, sender: 'user' },
        { type: 'chat', content: "I understand you're trying to chat. Let me assist you with that.", sender: 'assistant' }
      ]);
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
          <span className="text-mentat-highlight/80 text-sm">Terminal & Chat Interface</span>
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
              (msg.type === 'chat' && msg.sender === 'user') || msg.type === 'command'
                ? 'flex-row-reverse' 
                : 'flex-row'
            }`}
          >
            {msg.type === 'command' && (
              <div className="bg-mentat-primary/10 text-mentat-primary rounded-lg p-3 ml-auto max-w-[80%]">
                <div className="flex items-center gap-2 mb-1">
                  <User className="w-4 h-4" />
                  <span className="text-xs opacity-70">Command</span>
                </div>
                <p className="text-sm font-mono">{msg.content}</p>
              </div>
            )}
            
            {msg.type === 'chat' && (
              <div className={`
                p-3 rounded-lg max-w-[80%]
                ${msg.sender === 'user'
                  ? 'bg-mentat-primary/10 text-mentat-primary ml-auto'
                  : 'bg-mentat-secondary/20 text-mentat-highlight/90'}
              `}>
                <div className="flex items-center gap-2 mb-1">
                  {msg.sender === 'user' ? (
                    <User className="w-4 h-4" />
                  ) : (
                    <Bot className="w-4 h-4" />
                  )}
                  <span className="text-xs opacity-70">
                    {msg.sender === 'user' ? 'You' : 'MENTAT'}
                  </span>
                </div>
                <p className="text-sm">{msg.content}</p>
              </div>
            )}

            {(msg.type === 'response' || msg.type === 'system') && (
              <div className={`
                flex items-start gap-2
                ${msg.type === 'system' ? 'text-mentat-primary/50 italic' : 'text-mentat-highlight'}
              `}>
                {msg.type === 'response' && <Bot className="w-4 h-4 mt-1" />}
                <div className="flex-1">
                  {msg.content.split('\n').map((line, j) => (
                    <div key={j}>{line}</div>
                  ))}
                </div>
              </div>
            )}
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
          placeholder="Type a command (/help) or chat message..."
          spellCheck="false"
          autoComplete="off"
        />
      </form>
    </div>
  );
};

export default Terminal;
