"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useMemo } from "react";
import {
  BiomarkerCharts,
  DigitalTwinViewer,
  EmployeeHeader,
  EmployeeSidebar,
  HealthCopilotPanel,
  HealthScoreCard,
  HealthTimeline,
  OrganDetailDrawer,
  OrganAnatomogramPanel,
  RecommendationPanel,
  RiskDashboard,
  SimulationEngine,
  TopMetricCards,
  UploadReportWidget,
  WearableConnectCard
} from "@/features/employee-twin/components";

const queryClient = new QueryClient();

export default function EmployeeHealthDashboardPage() {
  const client = useMemo(() => queryClient, []);

  return (
    <QueryClientProvider client={client}>
      <div className="min-h-screen bg-mist text-ink">
        <div className="flex">
          <EmployeeSidebar />
          <div className="min-w-0 flex-1">
            <EmployeeHeader />
            <main className="space-y-5 p-4 lg:p-6">
              <TopMetricCards />
              <div className="grid gap-5 2xl:grid-cols-[1fr_390px]">
                <div className="space-y-5">
                  <div className="grid gap-5 xl:grid-cols-[320px_1fr]">
                    <HealthScoreCard />
                    <DigitalTwinViewer />
                  </div>
                  <OrganAnatomogramPanel />
                  <RiskDashboard />
                  <div className="grid gap-5 xl:grid-cols-[1fr_0.9fr]">
                    <BiomarkerCharts />
                    <RecommendationPanel />
                  </div>
                  <SimulationEngine />
                  <div className="grid gap-5 xl:grid-cols-[1fr_0.9fr]">
                    <UploadReportWidget />
                    <div className="space-y-5">
                      <WearableConnectCard />
                      <HealthTimeline />
                    </div>
                  </div>
                </div>
                <HealthCopilotPanel />
              </div>
            </main>
          </div>
        </div>
        <OrganDetailDrawer />
      </div>
    </QueryClientProvider>
  );
}
