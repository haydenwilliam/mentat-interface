import React from "react";
import { Bot, Terminal as TerminalIcon, BrainCircuit } from "lucide-react";
import { useBuild } from "@/contexts/BuildContext";

interface InputBarProps {
  isInTerminalMode: boolean;
  setIsInTerminalMode: (mode: boolean) => void;
  input: string;
  setInput: (input: string) => void;
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
  username
}: InputBarProps) => {
  const { currentProject } = useBuild();
  
  return (
    <div className="mentat-footer flex-col shadow-inner px-[10px]">
      <div className="space-y-3 px-3">
        {/* Mode Toggle */}
        <div className="flex justify-between px-0 py-0 mx-[7px]">
          <div className="flex space-x-4">
            <button
              onClick={() => setIsInTerminalMode(false)}
              className={`text-sm flex items-center gap-2 py-1 border-b-2 transition-all duration-200 ${
                !isInTerminalMode
                  ? 'border-mentat-highlight text-mentat-highlight'
                  : 'border-transparent text-mentat-primary opacity-50 hover:text-mentat-primary hover:opacity-70'
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
                  : 'border-transparent text-mentat-primary opacity-50 hover:text-mentat-primary hover:opacity-70'
              }`}
            >
              <TerminalIcon className="w-4 h-4" />
              Terminal
            </button>
          </div>
          
          <button
            onClick={() => console.log('Context Management clicked')}
            className="text-sm flex items-center gap-2 py-1 border-b-2 transition-all duration-200 
              border-transparent text-mentat-primary opacity-50 hover:text-mentat-primary hover:opacity-70"
          >
            <BrainCircuit className="w-4 h-4" />
            Context Manager
          </button>
        </div>

        {/* Input Area */}
        <form onSubmit={handleSubmit} className="mentat-form-element flex items-center gap-3">
          {isInTerminalMode ? (
            <div className="text-sm text-mentat-primary opacity-80 font-mono whitespace-nowrap">
              <span className="opacity-80">{username}@mentat:</span>
              <span className="text-mentat-highlight">{currentDirectory}</span>
              {currentProject && (
                <span className="text-blue-400"> [{currentProject.name}]</span>
              )}
              <span className="text-mentat-primary">$</span>
            </div>
          ) : (
            <Bot className="w-5 h-5 text-mentat-primary opacity-60" />
          )}
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none terminal-text text-sm"
            placeholder={
              isInTerminalMode 
                ? currentProject 
                  ? `Enter command for ${currentProject.name}...` 
                  : "Enter command..." 
                : "Message Thufir..."
            }
            spellCheck="false"
            autoComplete="off"
          />
        </form>
      </div>
    </div>
  );
};
