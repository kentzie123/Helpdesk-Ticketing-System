import { create } from "zustand";

// axios
import api from "../lib/axios";

// Toast
import { toast } from "react-toastify";

export const useUserStore = create((set, get) => ({
  users: [],
  selectedUser: null,
  isCreatingUser: false,
  isUpdatingUser: false,
  showDeleteUserModal: false,

  userSocketListeners: (socket) => {
    const handleUserCreated = (createdUser) => {
      set({ users: [...get().users, createdUser] });
    };

    const handleUserUpdated = (updatedUser) => {
      set({
        users: get().users.map((user) =>
          user._id === updatedUser._id ? updatedUser : user
        ),
      });
    };

    const handleUserDeleted = (deletedUserId) => {
      set({ users: get().users.filter((user) => user._id !== deletedUserId) });
    };

    socket.on("userCreated", handleUserCreated);
    socket.on("userUpdated", handleUserUpdated);
    socket.on("userDeleted", handleUserDeleted);
  },

  getUsers: async () => {
    try {
      const users = await api.get("/users");
      set({ users: users.data });
    } catch (error) {
      console.error(error);
    }
  },

  createUser: async (form) => {
    try {
      set({ isCreatingUser: true });
      await api.post("/users/create-user", form);
      toast.success("Created user successfully");
      return true;
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.error);
      set({ isCreatingUser: true });
      return false;
    } finally {
      set({ isCreatingUser: false });
    }
  },

  updateUser: async (form, selectedUserId) => {
    try {
      set({ isUpdatingUser: true });
      await api.patch(`/users/${selectedUserId}`, form);
      toast.success("Updated user successfully");
      set({ selectedUser: null });
      return true;
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.error);
      return false;
    } finally {
      set({ isUpdatingUser: false });
    }
  },

  deleteUser: async (selectedUserId) => {
    try {
      await api.delete(`/users/${selectedUserId}`);
      toast.success("Deleted user successfully");
      set({ selectedUser: null });
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.error);
    }
  },

  setSelectedUser: (user) => {
    set({ selectedUser: user });
  },

  setShowDeleteUserModal: (value) => {
    set({ showDeleteUserModal: value });
  },
}));
