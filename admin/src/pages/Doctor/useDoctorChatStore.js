import { create } from "zustand";
import toast from "react-hot-toast";
import { useDoctorAuthStore } from "../Doctor/useDoctorAuthStore.js";
import { axiosInstance } from "../../../../../web_frontend/src/lib/axios.js";

export const useDoctorChatStore = create((set, get) => ({
  messages: [],
  selectedUser: null, // Expecting { user: {...} } or just user object? Let's keep {user} for now
  isMessagesLoading: false,

  getUsersForSidebar: async () => {
    try {
      const res = await axiosInstance.get("/api/doctor/messages/users");
      return res.data;
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load users");
      return [];
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/api/doctor/messages/${userId}`);
      set({ messages: res.data });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();

    if (!selectedUser || !selectedUser._id) {
      toast.error("No user selected");
      return;
    }

    try {
      const res = await axiosInstance.post(
        `/api/doctor/messages/send/${selectedUser._id}`,
        messageData
      );
      set({ messages: [...messages, res.data] });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send message");
    }
  },

  setSelectedUser: (user) => {
    console.log("Setting selectedUser:", user);
    set({ selectedUser: user });
  },

  subscribeToMessages: () => {
    const socket = useDoctorAuthStore.getState().socket;
    const selectedUser = get().selectedUser;
    if (!socket || !selectedUser || !selectedUser._id) return;

    socket.on("newMessage", (newMessage) => {
      if (
        newMessage.senderId === selectedUser._id ||
        newMessage.receiverId === selectedUser._id
      ) {
        set({ messages: [...get().messages, newMessage] });
      }
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useDoctorAuthStore.getState().socket;
    if (!socket) return;
    socket.off("newMessage");
  },
}));
