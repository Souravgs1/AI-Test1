
import React, { useRef, useEffect } from 'react';
import type { Message } from '../types';
import MessageBubble from './MessageBubble';

interface ChatWindowProps {
  messages: Message[];
  isLoading: boolean;
}

const TypingIndicator: React.FC = () => (
  <div className="flex items-center space-x-2 p-4">
    <div className="w-10 h-10 rounded-full bg-sky-500/80 flex items-center justify-center flex-shrink-0">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM9.47 11.12c-.28-.28-.28-.74 0-1.02.28-.28.74-.28 1.02 0l1.38 1.38c.28.28.28.74 0 1.02-.28.28-.74.28-1.02 0l-1.38-1.38zm4.04 0c-.28-.28-.28-.74 0-1.02.28-.28.74-.28 1.02 0l1.38 1.38c.28.28.28.74 0 1.02-.28.28-.74.28-1.02 0l-1.38-1.38z"/></svg>
    </div>
    <div className="flex items-center space-x-1 bg-slate-700/50 rounded-full px-4 py-2">
      <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce"></div>
    </div>
  </div>
);

const ChatWindow: React.FC<ChatWindowProps> = ({ messages, isLoading }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="flex-1 p-6 space-y-6 overflow-y-auto">
      {messages.map((msg) => (
        <MessageBubble key={msg.id} message={msg} />
      ))}
      {isLoading && <TypingIndicator />}
      <div ref={scrollRef} />
    </div>
  );
};

export default ChatWindow;
