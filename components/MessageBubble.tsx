import React, { useState, useEffect } from 'react';
import { Message, Sender } from '../types';

interface MessageBubbleProps {
  message: Message;
}

const BotIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.5 12.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm-7 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM12 8c-2.21 0-4 1.79-4 4h8c0-2.21-1.79-4-4-4z"/></svg>
);

const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
);

const ThumbsUpIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z" />
    </svg>
);

const ThumbsDownIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z" />
    </svg>
);


const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.sender === Sender.USER;
  const [feedback, setFeedback] = useState<'up' | 'down' | null>(null);
  const storageKey = `feedback-${message.id}`;

  useEffect(() => {
    const savedFeedback = localStorage.getItem(storageKey);
    if (savedFeedback === 'up' || savedFeedback === 'down') {
      setFeedback(savedFeedback);
    }
  }, [storageKey]);

  const handleFeedback = (newFeedback: 'up' | 'down') => {
    // If the same feedback is clicked again, toggle it off
    const finalFeedback = feedback === newFeedback ? null : newFeedback;
    setFeedback(finalFeedback);

    if (finalFeedback) {
      localStorage.setItem(storageKey, finalFeedback);
    } else {
      localStorage.removeItem(storageKey);
    }
  };

  const wrapperClasses = `flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`;
  const bubbleClasses = `max-w-xl p-4 rounded-2xl ${isUser ? 'bg-sky-600 rounded-br-none' : 'bg-slate-700/80 rounded-bl-none'}`;
  const avatarClasses = `w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${isUser ? 'bg-indigo-500' : 'bg-sky-500/80'}`;

  return (
    <div className={wrapperClasses}>
      <div className={avatarClasses}>
        {isUser ? <UserIcon /> : <BotIcon />}
      </div>
      <div className="flex flex-col items-start gap-2">
        <div className={bubbleClasses}>
          <p className="text-white whitespace-pre-wrap">{message.text}</p>
        </div>
        {!isUser && message.text !== '...' && (
            <div className="flex items-center gap-2 pl-2">
                <button
                    onClick={() => handleFeedback('up')}
                    className={`p-1 rounded-full transition-colors duration-200 ${
                        feedback === 'up'
                            ? 'text-green-400'
                            : 'text-slate-500 hover:text-green-400 hover:bg-slate-700'
                    }`}
                    aria-label="Good response"
                    aria-pressed={feedback === 'up'}
                >
                    <ThumbsUpIcon />
                </button>
                <button
                    onClick={() => handleFeedback('down')}
                    className={`p-1 rounded-full transition-colors duration-200 ${
                        feedback === 'down'
                            ? 'text-red-400'
                            : 'text-slate-500 hover:text-red-400 hover:bg-slate-700'
                    }`}
                    aria-label="Bad response"
                    aria-pressed={feedback === 'down'}
                >
                    <ThumbsDownIcon />
                </button>
            </div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;