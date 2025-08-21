import { create } from "zustand";

// Toast
import { toast } from "react-toastify";

// axios
import api from "../lib/axios";


export const useSignupStore = create((set, get) => ({
  signupInfo: null,
  signupPhase: "signup",
  isSigningUp: false,
  isSignupRequestCodeSuccess: false,
  isEmailVerificationSuccess: false,


  setIsEmailVerificationSuccess: (value) => {
    set({ isEmailVerificationSuccess: value });
  },

  setIsSignupRequestCodeSuccess: (value) => {
    set({ isSignupRequestCodeSuccess: value });
  },

  signupPhase1ConfirmationCode: async (form) => {
    try {
      set({ isSigningUp: true });
      await api.post("/signup/generate-code", form);
      set({ isSignupRequestCodeSuccess: true });
      set({ signupInfo: form });
      set({ signupPhase: "verify-email" });
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.error);
    } finally {
      set({ isSigningUp: false });
    }
  },

  signupPhase2VerifyEmail: async (form) => {
    try {
      set({ isSigningUp: true });
      await api.post(`/signup/create-account`, form);
      set({ isEmailVerificationSuccess: true });
      set({ signupPhase: "signup" });
      return true;
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.error);
      return false;
    } finally {
      set({ isSigningUp: false });
    }
  },


}));
