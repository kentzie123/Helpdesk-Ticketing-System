import { create } from "zustand";

// axios
import api from "../lib/axios";
import { toast } from "react-toastify";

export const usePagePrivilegeStore = create((set, get) => ({
  pagePrivileges: [],

  getPagePrivileges: async () => {
    try {
        const pagePrivileges = await api.get("/page-privilege");
        set({ pagePrivileges: pagePrivileges.data });
    } catch (error) {
        console.error(error);
        toast.error("Error fetching page privilege");
    }
  },

  checkPageAccess: (pageName) => {
    const page = get().pagePrivileges.find((p) => p.page === pageName);
    return page?.view;
  },
}));
