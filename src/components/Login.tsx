import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { useChatStore } from '../store';
import { User } from '../types';
import { UserCircle } from 'lucide-react';

export const Login = () => {
  const [username, setUsername] = useState('');
  const setCurrentUser = useChatStore((state) => state.setCurrentUser);
  const currentUrl = window.location.href;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      const user: User = {
        id: crypto.randomUUID(),
        username: username.trim(),
        isOnline: true
      };
      setCurrentUser(user);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl max-w-md w-full">
        <div className="flex flex-col items-center space-y-6">
          <UserCircle className="w-16 h-16 text-indigo-500" />
          <h1 className="text-2xl font-bold text-white">Join Chat Room</h1>
          
          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300">
                Choose a username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Enter username"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Join Chat
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400 mb-4">Scan to join on another device</p>
            <div className="bg-white p-2 rounded-lg inline-block">
              <QRCodeSVG value={currentUrl} size={128} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};