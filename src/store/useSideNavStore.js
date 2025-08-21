import { create } from "zustand";


export const useSideNavStore = create((set, get)=>({
    navOpen: false,

    setToggleNav: () => {
        set({ navOpen: !get().navOpen });
    }
}))