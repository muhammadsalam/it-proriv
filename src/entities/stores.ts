import { ReactNode } from "react";
import { create } from "zustand";

interface StoreState {
  token: string | null;
  energy: number;
  maxEnergy: number;
  balance: number;
  tap: Function;
}

export const useAllStore = create<StoreState>((set, get) => ({
  token: localStorage.getItem("token") || null,
  energy: localStorage.getItem("energy")
    ? Number(localStorage.getItem("energy"))
    : 6000,
  maxEnergy: 6000,
  balance: localStorage.getItem("balance")
    ? Number(localStorage.getItem("balance"))
    : 0,

  tap: () => {
    set((state) => ({
      energy: state.energy - 7,
      balance: state.balance + 5,
    }));

    localStorage.setItem("energy", String(get().energy));
    localStorage.setItem("balance", String(get().balance));
  },
}));
