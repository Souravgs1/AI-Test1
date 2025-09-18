
import { GoogleGenAI, Chat } from '@google/genai';
import { SYSTEM_INSTRUCTION } from '../constants';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set. Please make sure it's available.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const createChatSession = (): Chat => {
  const chat = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.2, // Be more factual, less creative
      topP: 0.9,
      topK: 30,
    },
    // Use an empty history to start fresh each time.
    // The system instruction provides all necessary context.
    history: [],
  });
  return chat;
};
