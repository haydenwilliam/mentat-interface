
import { Bot, User } from "lucide-react";
import { Message } from "../../types/terminal";

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  return (
    <div 
      className={`flex items-start gap-2 ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
    >
      <div 
        className={`
          p-3 rounded-lg max-w-[80%] backdrop-blur-sm
          ${message.sender === 'user' 
            ? 'bg-mentat-primary/10 text-mentat-accent ml-auto border border-mentat-accent/20' 
            : 'bg-mentat-secondary/10 border border-mentat-highlight/20 text-mentat-highlight/90'}
        `}
      >
        <div className="flex items-center gap-2 mb-1">
          {message.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
          <span className="text-xs opacity-70">
            {message.sender === 'user' ? 'You' : 'Thufir'}
          </span>
        </div>
        <p className="text-sm">{message.content}</p>
      </div>
    </div>
  );
};
