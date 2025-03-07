import React from "react";
import { Terminal as TerminalIcon } from "lucide-react";
import { Message } from "../../types/terminal";

interface CommandMessageProps {
  message: Message;
  response?: Message;
  currentDirectory: string;
  username: string;
}

export const CommandMessage = ({ message, response, currentDirectory, username }: CommandMessageProps) => {
  return (
    <div className="mentat-card overflow-hidden shadow-lg">
      <div className="mentat-header">
        <div className="flex items-center gap-2">
          <TerminalIcon className="w-3 h-3 text-mentat-highlight" />
          <span className="text-xs text-mentat-highlight">Terminal</span>
        </div>
        <span className="text-xs text-mentat-primary opacity-70">{currentDirectory}</span>
      </div>
      <div className="p-3 border-b-2 border-mentat-border border-opacity-30">
        <div className="font-mono text-sm text-mentat-primary">
          <span className="opacity-80">{username}@mentat:</span> 
          <span className="text-mentat-highlight">{currentDirectory}</span>
          <span className="text-mentat-primary">$ </span>
          {message.content}
        </div>
      </div>
      {response && response.type === 'response' && (
        <div className="p-3 font-mono text-sm text-mentat-highlight opacity-90 bg-mentat-mid-tone bg-opacity-20">
          {response.content.split('\n').map((line, j) => (
            <div key={j}>{line}</div>
          ))}
        </div>
      )}
    </div>
  );
};
