import { create } from "zustand";
import { io } from "socket.io-client";

const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5050";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  socket: null,
  onlineUsers: [],

  setAuthUser: (user) => set({ authUser: user }),

  connectSocket: () => {
    const user = get().authUser;
    if (!user || get().socket) return;

    const socket = io(BASE_URL, { query: { userId: user._id } });
    set({ socket });

    socket.on("getOnlineUsers", (users) => {
      set({ onlineUsers: users });
    });
  },

  disconnectSocket: () => {
    const socket = get().socket;
    if (socket) socket.disconnect();
    set({ socket: null });
  },
}));
