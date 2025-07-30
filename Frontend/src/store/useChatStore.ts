import { create } from "zustand";
import toast from "react-hot-toast";
import axiosInstance from "../lib/axios";
import axios from "axios";

export const useChatStore = create((set) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/message/inbox");
      set({ users: res.data });
    } catch (error) {
      console.error("Error fetching users:", error);
      if (axios.isAxiosError(error))
        toast.error(
          error.response?.data.message || "An error occurred during fetching users."
        );
    } finally {
      set({ isUsersLoading: false });
    }
  },
    getMessages: async (userId:any) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/message/inbox/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      console.error("Error fetching messages:", error);
      if (axios.isAxiosError(error))
        toast.error(
          error.response?.data.message || "An error occurred during fetching messages."
        );
    } finally {
      set({ isMessagesLoading: false });
    }
  },
}));
