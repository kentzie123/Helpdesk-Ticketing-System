import { create } from "zustand";

// socket io client
import { io } from 'socket.io-client';

// axios
import api from "../lib/axios";

// Toast
import { toast } from "react-toastify";

// Store
import { useTicketStore } from "./useTicketStore";
import { usePagePrivilegeStore } from "./usePagePrivilegeStore";
import { useNotificationStore } from "./useNotificationStore";
import { useUserStore } from "./useUserStore";
import { useArticleStore } from "./useArticleStore";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isLoggingIn: false,
  isCheckingAuth: true,
  socket: null,

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(import.meta.env.VITE_API_URL, {
      query: {
        userId: authUser.userID,
      },
      withCredentials: true,
    });

    socket.on("connect", () => {
      console.log("Socket connected:", socket.connected);
      set({ socket });
    });

    useTicketStore.getState().ticketSocketListeners(socket);
    useNotificationStore.getState().notificationSocketListeners(socket);
    useArticleStore.getState().articleSocketListeners(socket);
    useUserStore.getState().userSocketListeners(socket);
  },

  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },

  checkAuth: async () => {
    try {
      set({ isCheckingAuth: true });
      const authUser = await api.get("/checkAuth");
      set({ authUser: authUser.data.user });
      get().fetchAllUserRelatedData();
      get().connectSocket();
    } catch (error) {
      console.error(error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  login: async (form) => {
    try {
      set({ isLoggingIn: true });
      const authUser = await api.post("/login", form);
      set({ authUser: authUser.data.user });
      get().fetchAllUserRelatedData();
      get().connectSocket();
      return true;
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data.error);
      set({ authUser: null });
    } finally {
      set({ isLoggingIn: false });
    }
  },

  fetchAllUserRelatedData: () => {
    usePagePrivilegeStore.getState().getPagePrivileges();
    useTicketStore.getState().getTickets();
    useUserStore.getState().getUsers();
    useNotificationStore.getState().getNotifications();
  },

  logout: async () => {
    try {
      const res = await api.post("/logout");
      set({ authUser: null });
      get().disconnectSocket();
      console.log(res.data.message);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  },
}));