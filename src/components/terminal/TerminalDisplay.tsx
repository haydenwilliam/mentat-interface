
import React, { useRef } from "react";
import { Message } from "../../types/terminal";
import { ChatMessage } from "./ChatMessage";
import { CommandMessage } from "./CommandMessage";
import ProjectInfoHeader from "./ProjectInfoHeader";
import { Project } from "../projects/types";

interface TerminalDisplayProps {
  messages: Message[];
  currentProject: Project | null;
  setShowBuildView: (show: boolean) => void;
  currentDirectory: string;
  username: string;
}

const TerminalDisplay = ({ 
  messages, 
  currentProject, 
  setShowBuildView, 
  currentDirectory, 
  username 
}: TerminalDisplayProps) => {
  const terminalRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      ref={terminalRef} 
      className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-mentat-border/50 scrollbar-track-transparent terminal-text space-y-2 p-2"
    >
      {currentProject && (
        <ProjectInfoHeader 
          currentProject={currentProject} 
          setShowBuildView={setShowBuildView}
        />
      )}

      {messages.map((msg, i) => {
        if (msg.type === 'chat') {
          return <ChatMessage key={i} message={msg} />;
        }
        
        if (msg.type === 'command') {
          const response = messages[i + 1];
          return (
            <CommandMessage 
              key={i} 
              message={msg} 
              response={response} 
              currentDirectory={currentDirectory}
              username={username}
            />
          );
        }
        
        return null;
      })}
    </div>
  );
};

export default TerminalDisplay;
