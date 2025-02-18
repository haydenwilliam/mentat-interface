
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
    <div className="p-4 border-t border-mentat-border/30 bg-mentat-secondary/10">
      <div className="space-y-2">
        {/* Mode Toggle */}
        <div className="flex justify-start space-x-4">
          <button 
            onClick={() => setIsInTerminalMode(false)}
            className={`text-sm flex items-center gap-2 py-1 border-b-2 transition-all duration-200 ${
              !isInTerminalMode 
                ? 'border-mentat-highlight text-mentat-highlight' 
                : 'border-transparent text-mentat-primary/40 hover:text-mentat-primary/60'
            }`}
          >
            <Bot className="w-4 h-4" />
            Chat
          </button>
          <button 
            onClick={() => setIsInTerminalMode(true)}
            className={`text-sm flex items-center gap-2 py-1 border-b-2 transition-all duration-200 ${
              isInTerminalMode 
                ? 'border-mentat-highlight text-mentat-highlight' 
                : 'border-transparent text-mentat-primary/40 hover:text-mentat-primary/60'
            }`}
          >
            <TerminalIcon className="w-4 h-4" />
            Terminal
          </button>
        </div>

        {/* Input Area */}
        <form 
          onSubmit={handleSubmit} 
          className="flex items-center gap-3 bg-mentat-secondary/20 rounded-lg p-3 border border-mentat-border/30"
        >
          {isInTerminalMode ? (
            <div className="text-sm text-mentat-primary/70 font-mono whitespace-nowrap">
              <span className="opacity-70">{username}@mentat:</span>
              <span className="text-mentat-highlight">{currentDirectory}</span>
              <span className="text-mentat-primary">$</span>
            </div>
          ) : (
            <Bot className="w-5 h-5 text-mentat-primary/50" />
          )}
          <input 
            type="text" 
            value={input} 
            onChange={e => setInput(e.target.value)} 
            className="flex-1 bg-transparent border-none outline-none terminal-text text-sm" 
            placeholder={isInTerminalMode ? "Enter command..." : "Message Thufir..."} 
            spellCheck="false" 
            autoComplete="off" 
          />
        </form>
      </div>
    </div>
  );
};
