export interface User {
  id: string;
  username: string;
  isOnline: boolean;
}

export interface Message {
  id: string;
  content: string;
  sender: string;
  recipient?: string;
  timestamp: number;
  chatRoom?: 'general' | 'panel';
}

export interface ChatStore {
  messages: Message[];
  users: User[];
  currentUser: User | null;
  blockedUsers: Set<string>;
  activeChat: 'general' | 'panel' | string;
  addMessage: (message: Message) => void;
  setUsers: (users: User[]) => void;
  setCurrentUser: (user: User | null) => void;
  blockUser: (userId: string) => void;
  setActiveChat: (chat: 'general' | 'panel' | string) => void;
}