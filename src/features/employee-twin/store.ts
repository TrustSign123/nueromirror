"use client";

import { create } from "zustand";
import { OrganId, SimulationInput } from "./types";

type EmployeeTwinState = {
  selectedOrganId: OrganId;
  drawerOpen: boolean;
  simulation: SimulationInput;
  setSelectedOrgan: (organId: OrganId) => void;
  closeDrawer: () => void;
  setSimulation: (key: keyof SimulationInput, value: number) => void;
};

export const useEmployeeTwinStore = create<EmployeeTwinState>((set) => ({
  selectedOrganId: "heart",
  drawerOpen: false,
  simulation: {
    weight: 102,
    sleep: 6.5,
    exercise: 30,
    calories: 2400,
    smoking: 0,
    alcohol: 2,
    stress: 7
  },
  setSelectedOrgan: (organId) => set({ selectedOrganId: organId, drawerOpen: true }),
  closeDrawer: () => set({ drawerOpen: false }),
  setSimulation: (key, value) =>
    set((state) => ({
      simulation: { ...state.simulation, [key]: value }
    }))
}));
