import React from 'react';
import { Login } from './components/Login';
import { ChatRoom } from './components/ChatRoom';
import { useChatStore } from './store';

function App() {
  const currentUser = useChatStore((state) => state.currentUser);

  return (
    <div className="min-h-screen bg-gray-900">
      {currentUser ? <ChatRoom /> : <Login />}
    </div>
  );
}

export default App;