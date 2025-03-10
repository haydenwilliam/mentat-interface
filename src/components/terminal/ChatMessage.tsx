import React from "react";
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
          p-3 rounded-lg max-w-[80%] backdrop-blur-sm border-2 shadow-lg
          ${message.sender === 'user' 
            ? 'bg-mentat-mid-tone bg-opacity-40 text-mentat-primary ml-auto border-mentat-border border-opacity-50' 
            : 'bg-mentat-secondary bg-opacity-60 border-mentat-border border-opacity-50 text-mentat-highlight opacity-90'}
        `}
      >
        <div className="flex items-center gap-2 mb-1">
          {message.sender === 'user' ? 
            <User className="w-4 h-4 text-mentat-primary" /> : 
            <Bot className="w-4 h-4 text-mentat-highlight" />
          }
          <span className="text-xs opacity-80">
            {message.sender === 'user' ? 'You' : 'Thufir'}
          </span>
        </div>
        <p className="text-sm">{message.content}</p>
      </div>
    </div>
  );
};
