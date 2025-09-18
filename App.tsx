
import React, { useState, useEffect, useCallback } from 'react';
import type { Chat } from '@google/genai';
import { Message } from './types';
import { Sender } from './types';
import { createChatSession } from './services/geminiService';
import ChatWindow from './components/ChatWindow';
import ChatInput from './components/ChatInput';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [chat, setChat] = useState<Chat | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeChat = () => {
      try {
        const chatSession = createChatSession();
        setChat(chatSession);
        setMessages([
          {
            id: Date.now(),
            text: "Hello! I'm your friendly FAQ bot. How can I assist you today?",
            sender: Sender.BOT,
          },
        ]);
      } catch (e) {
        if (e instanceof Error) {
            setError(e.message);
        } else {
            setError("An unknown error occurred during initialization.");
        }
        console.error("Initialization error:", e);
      }
    };
    initializeChat();
  }, []);

  const handleSendMessage = useCallback(async (text: string) => {
    if (isLoading || !chat) {
      return;
    }

    const userMessage: Message = {
      id: Date.now(),
      text,
      sender: Sender.USER,
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      const stream = await chat.sendMessageStream({ message: text });
      let botResponseText = '';
      let botMessageId = Date.now() + 1;

      // Initialize bot message
      const initialBotMessage: Message = {
        id: botMessageId,
        text: '...',
        sender: Sender.BOT,
      };
      setMessages(prev => [...prev, initialBotMessage]);

      for await (const chunk of stream) {
        botResponseText += chunk.text;
        setMessages(prevMessages =>
          prevMessages.map(msg =>
            msg.id === botMessageId
              ? { ...msg, text: botResponseText + '...' }
              : msg
          )
        );
      }

       setMessages(prevMessages =>
          prevMessages.map(msg =>
            msg.id === botMessageId
              ? { ...msg, text: botResponseText }
              : msg
          )
        );

    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
      console.error("Error sending message:", e);
      setError(`Sorry, I encountered an error. Please try again. (${errorMessage})`);
      const errorBotMessage: Message = {
        id: Date.now(),
        text: "My apologies, I'm having trouble connecting. Please check the API key and your connection, then try again.",
        sender: Sender.BOT,
      };
      setMessages((prev) => [...prev, errorBotMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [chat, isLoading]);

  return (
    <div className="flex flex-col h-screen bg-slate-800 text-white font-sans">
      <header className="bg-slate-900/50 backdrop-blur-sm p-4 shadow-md z-10">
        <h1 className="text-2xl font-bold text-center text-sky-400">FAQ Chatbot</h1>
        <p className="text-center text-slate-400 text-sm">Powered by Gemini</p>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center p-4 overflow-hidden">
        <div className="w-full max-w-4xl h-full flex flex-col bg-slate-900/70 rounded-2xl shadow-2xl border border-slate-700 overflow-hidden">
          <ChatWindow messages={messages} isLoading={isLoading} />
          {error && <div className="text-center p-2 text-red-400 bg-red-900/30">{error}</div>}
          <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
        </div>
      </main>
    </div>
  );
};

export default App;
