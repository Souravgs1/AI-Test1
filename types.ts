
export enum Sender {
  USER = 'user',
  BOT = 'bot',
}

export interface Message {
  id: number;
  text: string;
  sender: Sender;
}
