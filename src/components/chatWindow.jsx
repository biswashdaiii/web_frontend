import React, { useState, useEffect, useRef, useContext } from "react";
import { AppContext } from "../context/AppContext.jsx";
import { initializeSocket } from "../socket.js";
import { toast } from "react-toastify";


const ChatWindow = ({ chatPartnerId, chatPartnerName }) => {
  const { token, userData, backendUrl } = useContext(AppContext);

  if (!userData?._id) {
    return <div>Loading user data...</div>;
  }

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Scroll chat to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (
      !token ||
      !backendUrl ||
      !chatPartnerId ||
      !userData?._id
    ) {
      console.warn("Waiting for required data before connecting socket:", {
        token,
        backendUrl,
        userId: userData?._id,
        chatPartnerId,
      });
      return; // Don't connect socket yet
    }

    const socket = initializeSocket(backendUrl, token);
    socketRef.current = socket;

    socket.on("connect", () => {
      setIsConnected(true);
      socket.emit("register_user", { userId: userData._id });
      socket.emit("join_room", {
        userId: userData._id,
        partnerId: chatPartnerId,
      });
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("load_history", (chatHistory) => {
      setMessages(chatHistory);
    });

    socket.on("receive_message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    socket.on("message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, [token, backendUrl, userData?._id, chatPartnerId]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (
      newMessage.trim() &&
      isConnected &&
      userData?._id &&
      socketRef.current
    ) {
      const timestamp = Date.now().toString();
      const messageData = {
        messageId: timestamp,
        sender: userData._id,
        receiver: chatPartnerId,
        message: newMessage,
        createdAt: new Date().toISOString(),
      };

      socketRef.current.emit("sent_message", messageData);

      // Optimistic UI update
      const optimisticMessage = {
        ...messageData,
        _id: timestamp,
        sender: { _id: userData._id },
      };

      setMessages((prev) => [...prev, optimisticMessage]);
      setNewMessage("");
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-10rem)] w-full max-w-4xl mx-auto bg-white rounded-lg shadow-xl border">
      <div className="p-4 border-b flex items-center space-x-3">
        <div
          className={`w-3 h-3 rounded-full ${
            isConnected ? "bg-green-500 animate-pulse" : "bg-red-500"
          }`}
        ></div>
        <h2 className="text-xl font-semibold text-gray-800">
          Chat with {chatPartnerName}
        </h2>
      </div>

      <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-gray-50">
        {messages.map((msg) => (
          <div
            key={msg._id || msg.messageId}
            className={`flex items-end gap-2 ${
              msg.sender?._id === userData._id ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-md px-4 py-2 rounded-xl ${
                msg.sender?._id === userData._id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              <p className="text-sm">{msg.message}</p>
              <div className="text-xs text-right mt-1 opacity-75">
                {msg.createdAt
                  ? new Date(msg.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : ""}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white border-t">
        <form onSubmit={handleSendMessage} className="flex space-x-3">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 bg-gray-100 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={!newMessage.trim() || !isConnected}
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 disabled:opacity-50"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;
