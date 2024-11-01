import React, { useState } from 'react';
import { useChatStore } from '../store';
import { Message as MessageType } from '../types';
import { MessageSquare, Users, Send } from 'lucide-react';
import clsx from 'clsx';

export const ChatRoom = () => {
  const [message, setMessage] = useState('');
  const { messages, users, currentUser, activeChat, setActiveChat } = useChatStore();
  
  const handleSend = () => {
    if (!message.trim() || !currentUser) return;
    
    const newMessage: MessageType = {
      id: crypto.randomUUID(),
      content: message.trim(),
      sender: currentUser.id,
      timestamp: Date.now(),
      chatRoom: activeChat as 'general' | 'panel'
    };
    
    useChatStore.getState().addMessage(newMessage);
    setMessage('');
  };

  const filteredMessages = messages.filter(msg => 
    typeof activeChat === 'string' && 
    (msg.chatRoom === activeChat || (msg.sender === activeChat || msg.recipient === activeChat))
  );

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-gray-800 p-4 flex items-center border-b border-gray-700">
          <MessageSquare className="w-6 h-6 text-indigo-500 mr-2" />
          <h2 className="text-xl font-semibold text-white">
            {activeChat === 'general' ? 'General Convention Chat' : 
             activeChat === 'panel' ? 'Panel Questions Chat' : 
             `Chat with ${users.find(u => u.id === activeChat)?.username}`}
          </h2>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {filteredMessages.map((msg) => (
            <div
              key={msg.id}
              className={clsx(
                'max-w-[80%] rounded-lg p-3',
                msg.sender === currentUser?.id
                  ? 'ml-auto bg-indigo-600 text-white'
                  : 'bg-gray-700 text-white'
              )}
            >
              <div className="text-sm opacity-75">
                {users.find(u => u.id === msg.sender)?.username}
              </div>
              <div>{msg.content}</div>
              <div className="text-xs opacity-50">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="bg-gray-800 p-4 border-t border-gray-700">
          <div className="flex space-x-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Type your message..."
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <button
              onClick={handleSend}
              className="bg-indigo-600 text-white rounded-lg px-4 py-2 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-64 bg-gray-800 border-l border-gray-700">
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-indigo-500" />
            <h3 className="text-lg font-semibold text-white">Chat Rooms</h3>
          </div>
          <div className="mt-4 space-y-2">
            <button
              onClick={() => setActiveChat('general')}
              className={clsx(
                'w-full text-left px-3 py-2 rounded-lg',
                activeChat === 'general'
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-300 hover:bg-gray-700'
              )}
            >
              General Chat
            </button>
            <button
              onClick={() => setActiveChat('panel')}
              className={clsx(
                'w-full text-left px-3 py-2 rounded-lg',
                activeChat === 'panel'
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-300 hover:bg-gray-700'
              )}
            >
              Panel Questions
            </button>
          </div>
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold text-white mb-4">Online Users</h3>
          <div className="space-y-2">
            {users.filter(u => u.id !== currentUser?.id).map((user) => (
              <button
                key={user.id}
                onClick={() => setActiveChat(user.id)}
                className={clsx(
                  'w-full flex items-center space-x-2 px-3 py-2 rounded-lg',
                  activeChat === user.id
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700'
                )}
              >
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span>{user.username}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};