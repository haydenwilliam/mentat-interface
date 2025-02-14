
import { useState, useEffect, useRef } from "react";

const Terminal = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<string[]>([]);
  const terminalRef = useRef<HTMLDivElement>(null);

  const commands = {
    help: "Available commands: help, clear, status, about",
    clear: "Clearing terminal...",
    status: "All systems operational. Running diagnostics...",
    about: "MENTAT v1.0 - Advanced Computing Interface\nCopyright © 2024",
  };

  useEffect(() => {
    setOutput([
      "MENTAT Terminal v1.0",
      "Initializing system...",
      "Type 'help' for available commands",
    ]);
  }, []);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const response = commands[trimmedCmd as keyof typeof commands] || `Command not found: ${cmd}`;
    
    if (trimmedCmd === "clear") {
      setOutput([]);
    } else {
      setOutput((prev) => [...prev, `> ${cmd}`, response]);
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
    <div className="retro-container h-[400px] flex flex-col">
      <div className="flex items-center justify-between mb-2 px-2">
        <span className="text-mentat-highlight/80 text-sm">Terminal</span>
        <span className="text-mentat-primary/50 text-xs">Connected</span>
      </div>
      <div
        ref={terminalRef}
        className="flex-1 overflow-auto terminal-text space-y-1 mb-4"
      >
        {output.map((line, i) => (
          <div key={i} className="px-2">
            {line}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex items-center px-2">
        <span className="text-mentat-primary mr-2">&gt;</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent border-none outline-none terminal-text"
          spellCheck="false"
          autoComplete="off"
        />
      </form>
    </div>
  );
};

export default Terminal;
