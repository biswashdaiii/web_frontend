import React, { useState, useEffect, useRef, useContext } from 'react';
import { AppContext } from '../context/AppContext.jsx';
import { initializeSocket } from '../socket.js';

const ChatWindow = ({ appointmentId, chatPartnerName }) => {
  // Get context for the logged-in user (this works for both patients and doctors)
  const { token, userData, backendUrl } = useContext(AppContext);

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  // --- THE CORE FIX ---
  // We use a ref to hold the socket instance.
  // A ref persists for the full lifetime of the component and doesn't trigger re-renders.
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom whenever messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    // Do not proceed if we don't have the necessary info
    if (!token || !backendUrl || !appointmentId) return;

    // Initialize the socket
    const socket = initializeSocket(backendUrl, token);
    // Store the live socket instance in our ref
    socketRef.current = socket;

    // --- Define Event Handlers ---
    const onConnect = () => {
      setIsConnected(true);
      socket.emit('join_room', { appointmentId });
    };
    const onDisconnect = () => setIsConnected(false);
    const onLoadHistory = (chatHistory) => setMessages(chatHistory);
    const onReceiveMessage = (message) => setMessages(prev => [...prev, message]);

    // --- Register Listeners ---
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('load_history', onLoadHistory);
    socket.on('receive_message', onReceiveMessage);

    // Finally, connect the socket
    socket.connect();

    // --- Cleanup Function ---
    // This runs when the component is unmounted (e.g., user leaves the page)
    return () => {
      socket.disconnect();
    };
  }, [appointmentId, token, backendUrl]); // Re-establish connection if these details change

  const handleSendMessage = (e) => {
    e.preventDefault();
    // Check for message text, connection status, the user object, and if the socket exists in our ref
    if (newMessage.trim() && isConnected && userData?._id && socketRef.current) {
      const messageData = {
        appointmentId,
        senderId: userData._id,
        text: newMessage,
      };

      // --- THE CORE FIX ---
      // Emit the message using the stable socket instance from the ref.
      socketRef.current.emit('send_message', messageData);

      // Optimistically update our own UI for a snappy feel
      const optimisticMessage = {
        ...messageData,
        _id: Date.now().toString(),
        sender: { _id: userData._id },
        createdAt: new Date().toISOString(),
      };
      setMessages(prev => [...prev, optimisticMessage]);
      setNewMessage('');
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-10rem)] w-full max-w-4xl mx-auto bg-white rounded-lg shadow-xl border">
      <div className="p-4 border-b flex items-center space-x-3">
        <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'} transition-colors`}></div>
        <h2 className="text-xl font-semibold text-gray-800">Chat with {chatPartnerName}</h2>
      </div>
      <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-gray-50">
        {messages.map((msg) => (
          <div key={msg._id} className={`flex items-end gap-2 ${msg.sender._id === userData._id ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-md px-4 py-2 rounded-xl ${msg.sender._id === userData._id ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}>
              <p className="text-sm">{msg.text}</p>
              <div className="text-xs text-right mt-1 opacity-75">{new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 bg-white border-t">
        <form onSubmit={handleSendMessage} className="flex space-x-3">
          <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Type your message..." className="flex-1 px-4 py-2 bg-gray-100 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <button type="submit" disabled={!newMessage.trim() || !isConnected} className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 disabled:opacity-50">Send</button>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;