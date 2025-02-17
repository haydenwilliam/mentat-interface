
import { Bot, User } from "lucide-react";
import { useState } from "react";

interface Message {
  type: 'user' | 'assistant';
  content: string;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    { type: 'assistant', content: "Hello! I'm your MENTAT assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      setMessages(prev => [...prev, { type: 'user', content: input.trim() }]);
      setInput("");
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-2 px-2">
        <div className="flex items-center gap-2">
          <Bot className="w-4 h-4 text-mentat-highlight/80" />
          <span className="text-mentat-highlight/80 text-sm">Chat Interface</span>
        </div>
        <span className="text-mentat-primary/50 text-xs">AI Assistant Active</span>
      </div>
      
      <div className="flex-1 overflow-auto space-y-4 mb-4 p-2">
        {messages.map((msg, i) => (
          <div 
            key={i}
            className={`flex items-start gap-2 ${
              msg.type === 'user' ? 'flex-row-reverse' : ''
            }`}
          >
            <div className={`
              p-3 rounded-lg max-w-[80%]
              ${msg.type === 'user' 
                ? 'bg-mentat-primary/10 text-mentat-primary ml-auto' 
                : 'bg-mentat-secondary/20 text-mentat-highlight/90'}
            `}>
              <div className="flex items-center gap-2 mb-1">
                {msg.type === 'user' ? (
                  <User className="w-4 h-4" />
                ) : (
                  <Bot className="w-4 h-4" />
                )}
                <span className="text-xs opacity-70">
                  {msg.type === 'user' ? 'You' : 'MENTAT'}
                </span>
              </div>
              <p className="text-sm">{msg.content}</p>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex items-center gap-2 p-2 border-t border-mentat-border/30">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-mentat-secondary/20 rounded-lg px-4 py-2 text-sm border border-mentat-border/30 focus:border-mentat-primary/50 focus:outline-none transition-colors"
          placeholder="Type your message..."
        />
        <button 
          type="submit"
          className="px-4 py-2 bg-mentat-primary/10 hover:bg-mentat-primary/20 text-mentat-primary rounded-lg border border-mentat-primary/30 transition-colors"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
