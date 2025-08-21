import { create } from "zustand";

// Toast
import { toast } from "react-toastify";

// axios
import api from "../lib/axios";

export const useForgotPasswordStore = create((set, get) => ({
  resetPassView: "s1",
  email: "",
  code: "",
  resetToken: "",
  cooldown: 0,
  isRequestingCode: false,
  isVerifyingCode: false,
  isRessetingPassword: false,
  isRequestCodeSuccess: false,
  isResetPasswordSuccess: false,

  setEmail: (email) => {
    set({ email });
  },

  setCode: (code) => {
    set({ code });
  },

  setResetPassView: (value) => {
    set({ resetPassView: value });
  },

  setIsRequestCodeSuccess: (value) => {
    set({ isRequestCodeSuccess: value });
  },

  setIsResetPasswordSuccess: (value) => {
    set({ isResetPasswordSuccess: value });
  },

  requestResetPassCode: async () => {
    try {
      set({ isRequestingCode: true });
      await api.post("/request-code", {
        email: get().email,
      });
      set({ isRequestCodeSuccess: true });
      set({ resetPassView: "s2" });
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.error);
      set({ cooldown: error.response.data.cooldown });
    } finally {
      set({ isRequestingCode: false });
    }
  },

  verifyCode: async () => {
    try {
      set({ isVerifyingCode: true });
      const res = await api.post(`/verify-code`, {
        email: get().email,
        code: get().code,
      });

      set({ resetToken: res.data.resetToken });
      toast.success("Code verified successfully");
      set({ resetPassView: "s3" });
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.error);
    } finally {
      set({ isVerifyingCode: false });
    }
  },

  resetPassword: async (newPassword) => {
    try {
      set({ isRessetingPassword: true });
      await api.post("/reset-password", {
        email: get().email,
        code: get().code,
        resetToken: get().resetToken,
        newPassword,
      });
      set({ isResetPasswordSuccess: true });
      set({ resetPassView: "s1" });
      set({ email: "" });
      set({ code: "" });
      set({ resetToken: "" });
      return true;
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.error);
      return false;
    } finally {
      set({ isRessetingPassword: false });
    }
  },
}));
