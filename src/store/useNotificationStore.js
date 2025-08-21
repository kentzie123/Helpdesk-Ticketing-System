import { create } from "zustand";

// axios
import api from "../lib/axios";

// Toast
import { toast } from "react-toastify";

export const useNotificationStore = create((set, get) => ({
  notifications: [],
  popupNotification: null,
  selectedNotification: null,
  showDeleteNotificationModal: false,

  setSelectedNotification: (notification) => {
    set({ selectedNotification: notification })
  },

  setShowDeleteNotificationModal: (value) => {
    set({ showDeleteNotificationModal: value });
  },

  notificationSocketListeners: (socket) => {
    // New notification listener
    const handleNotificationCreated = (newNotification) => {
      set({ popupNotification: newNotification });
      set({ notifications: [...get().notifications, newNotification] });
    };

    // Updated notifcation listener
    const handleNotificationUpdated = (updatedNotification) => {
      set({
        notifications: get().notifications.map((n) =>
          n._id === updatedNotification._id ? updatedNotification : n
        ),
      });
    };

    // Deleted notification listener
    const handleNotificationDeleted = (deletedId) => {
      set({
        notifications: get().notifications.filter((n) => n._id != deletedId),
      });
    };

    socket.on("notificationCreated", handleNotificationCreated);
    socket.on("notificationUpdated", handleNotificationUpdated);
    socket.on("notificationDeleted", handleNotificationDeleted);
  },

  getNotifications: async () => {
    try {
      const notifications = await api.get("/notifications");
      set({ notifications: notifications.data });
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.error);
    }
  },

  clearAllNotifications: async () => {
    try {
      await api.delete("/notifications/clear-all");
      toast.success("Deleted all notifications successfully");
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.error);
    }
  },

  markAllNotificationsRead: async () => {
    try {
      await api.put("/notifications/mark-all-as-read");
      toast.success("Marked as all read");
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.error);
    }
  },

  deleteNotification: async (notificationId) => {
    try {
      await api.delete(`/notifications/${notificationId}`);
      set({ selectedNotification: null });
      toast.success("Deleted notification successfully");
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.error);
    }
  },

  handleMarkAsRead: async (notificationId) => {
    try {
      await api.patch(`/notifications/${notificationId}`);
    } catch (error) {
      console.error(error);
    }
  },

  setPopupNotification: (notification) => {
    set({ popupNotification: notification });
  },
}));
