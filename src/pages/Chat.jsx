import React from "react";
import Sidebar from "../components/Chat/Sidebar";
import ChatContainer from "../components/Chat/ChatContainer";
import Proflie from "../components/Chat/Proflle";
import { use } from "react";
import { useState } from "react";

const Chat = () => {
  const [selectedUser, setSelectedUser] = useState(false);
  return (
    <div className="border w-full h-screen sm:px-[15%] sm:py-[5%]">
      <div
        className={`backdrop-blur-xl border-2 border-gray-600 rounded-2xl overflow-hidden h-[100%] grid relative
        ${
          selectedUser
            ? "md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]"
            : "md:grid-cols-2"
        }`}
      >
        <Sidebar />
        <ChatContainer />
        <Proflie />
      </div>
    </div>
  );
};

export default Chat;
