import { create } from 'zustand';
import { ChatStore } from './types';

export const useChatStore = create<ChatStore>((set) => ({
  messages: [],
  users: [],
  currentUser: null,
  blockedUsers: new Set(),
  activeChat: 'general',
  
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
    
  setUsers: (users) => set({ users }),
  
  setCurrentUser: (user) => set({ currentUser: user }),
  
  blockUser: (userId) =>
    set((state) => ({
      blockedUsers: new Set([...state.blockedUsers, userId])
    })),
    
  setActiveChat: (chat) => set({ activeChat: chat }),
}));