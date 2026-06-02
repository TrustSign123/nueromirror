"use client";

import { create } from "zustand";
import { organs } from "./platform-data";

type TwinState = {
  selectedOrganId: string;
  simulation: {
    weightKg: number;
    sleepHours: number;
    exerciseMinutes: number;
  };
  setSelectedOrganId: (id: string) => void;
  setSimulation: (key: keyof TwinState["simulation"], value: number) => void;
};

export const useTwinStore = create<TwinState>((set) => ({
  selectedOrganId: organs[0].id,
  simulation: {
    weightKg: 8,
    sleepHours: 7.5,
    exerciseMinutes: 45
  },
  setSelectedOrganId: (id) => set({ selectedOrganId: id }),
  setSimulation: (key, value) =>
    set((state) => ({
      simulation: { ...state.simulation, [key]: value }
    }))
}));
