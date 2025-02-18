
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
    <div className="bg-mentat-secondary/10 rounded-lg border border-mentat-border/30 overflow-hidden">
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
          {message.content}
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
};
