"use client";

import { create } from "zustand";
import { BiomarkerUpdate, OrganId, ReportAnalysisResult, SimulationInput } from "./types";

type EmployeeTwinState = {
  selectedOrganId: OrganId;
  drawerOpen: boolean;
  simulation: SimulationInput;
  biomarkerUpdates: Record<string, BiomarkerUpdate>;
  latestReportAnalysis: ReportAnalysisResult | null;
  vectorStoreId: string | null;
  setSelectedOrgan: (organId: OrganId) => void;
  closeDrawer: () => void;
  setSimulation: (key: keyof SimulationInput, value: number) => void;
  applyReportAnalysis: (analysis: ReportAnalysisResult) => void;
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
  biomarkerUpdates: {},
  latestReportAnalysis: null,
  vectorStoreId: null,
  setSelectedOrgan: (organId) => set({ selectedOrganId: organId, drawerOpen: true }),
  closeDrawer: () => set({ drawerOpen: false }),
  setSimulation: (key, value) =>
    set((state) => ({
      simulation: { ...state.simulation, [key]: value }
    })),
  applyReportAnalysis: (analysis) =>
    set((state) => {
      const nextUpdates = { ...state.biomarkerUpdates };
      analysis.biomarkers.forEach((biomarker) => {
        nextUpdates[biomarker.name.toLowerCase()] = biomarker;
      });

      return {
        biomarkerUpdates: nextUpdates,
        latestReportAnalysis: analysis,
        vectorStoreId: analysis.vectorStoreId ?? state.vectorStoreId
      };
    })
}));
