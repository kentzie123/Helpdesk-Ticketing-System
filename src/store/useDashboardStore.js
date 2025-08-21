import { create } from "zustand";

// axios
import api from "../lib/axios";

export const useDashboardStore = create((set, get) => ({
  ticketStatusCounts: [],
  ticketPriorityCounts: [],
  ticketCategoryCounts: [],
  recentTickets: [],
  recentNotifications: [],

  getTicketStatusCounts: async () => {
    try {
      const res = await api.get("/dashboard/ticket-counts/status");
      set({ ticketStatusCounts: res.data });
    } catch (error) {
      console.error(error);
    }
  },

  getTicketPriorityCounts: async () => {
    try {
      const res = await api.get("/dashboard/ticket-counts/priority");
      set({ ticketPriorityCounts: res.data });
    } catch (error) {
      console.error(error);
    }
  },

  getTicketCategoryCounts: async () => {
    try {
      const res = await api.get("/dashboard/ticket-counts/category");
      set({ ticketCategoryCounts: res.data });
    } catch (error) {
      console.error(error?.response?.data?.error);
    }
  },

  getRecentTickets: async () => {
    try {
      const res = await api.get("/dashboard/recent-tickets");
      set({ recentTickets: res.data });
    } catch (error) {
      console.error(error?.response?.data?.error);
    }
  },

  getRecentNotifications: async () => {
    try {
      const res = await api.get("/dashboard/recent-notifications");
      set({ recentNotifications: res.data });
    } catch (error) {
      console.error(error?.response?.data?.error);
    }
  },
}));
