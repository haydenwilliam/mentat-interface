
import { Bot, Terminal as TerminalIcon } from "lucide-react";

interface InputBarProps {
  isInTerminalMode: boolean;
  setIsInTerminalMode: (value: boolean) => void;
  input: string;
  setInput: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  currentDirectory: string;
  username: string;
}

export const InputBar = ({
  isInTerminalMode,
  setIsInTerminalMode,
  input,
  setInput,
  handleSubmit,
  currentDirectory,
  username,
}: InputBarProps) => {
  return (
    <div className="px-4 py-2 border-t border-mentat-border/30 bg-mentat-secondary/5">
      <div className="flex items-center gap-2 -mb-1">
        <div className="inline-flex rounded-t border border-mentat-border/30 bg-mentat-secondary/20 p-0.5">
          <button 
            onClick={() => setIsInTerminalMode(false)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-all duration-200 rounded ${
              !isInTerminalMode 
                ? 'bg-mentat-background text-mentat-highlight shadow-sm border border-mentat-border/30' 
                : 'text-mentat-primary/60 hover:text-mentat-primary/80'
            }`}
          >
            <Bot className="w-3.5 h-3.5" />
            Chat
          </button>
          <button 
            onClick={() => setIsInTerminalMode(true)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-all duration-200 rounded ${
              isInTerminalMode 
                ? 'bg-mentat-background text-mentat-highlight shadow-sm border border-mentat-border/30' 
                : 'text-mentat-primary/60 hover:text-mentat-primary/80'
            }`}
          >
            <TerminalIcon className="w-3.5 h-3.5" />
            Terminal
          </button>
        </div>
        <div className="flex-1" />
      </div>

      <form 
        onSubmit={handleSubmit} 
        className="flex items-center gap-2 pt-2"
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
  );
};
