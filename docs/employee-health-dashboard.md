# Employee Health Digital Twin Dashboard Module

## Mount Point

Route: `/employee-health-dashboard`

This module is designed to mount inside the existing SaaS shell. It does not create authentication, signup, payments, subscriptions, tenant management, organization setup, RBAC, or existing API behavior.

## Folder Structure

```text
src/app/employee-health-dashboard/page.tsx
src/features/employee-twin/
  components.tsx
  mock-data.ts
  store.ts
  types.ts
```

## Components

- `HealthScoreCard`
- `DigitalTwinViewer`
- `OrganDetailDrawer`
- `RiskDashboard`
- `BiomarkerCharts`
- `UploadReportWidget`
- `HealthCopilotPanel`
- `RecommendationPanel`
- `SimulationEngine`
- `HealthTimeline`
- `WearableConnectCard`
- `EmployeeHeader`
- `EmployeeSidebar`
- `TopMetricCards`

## API Contracts

The UI currently uses typed mock data. Production API contracts expected from the existing SaaS backend:

- `GET /api/employee/me/health-summary`
- `GET /api/employee/me/organ-scores`
- `GET /api/employee/me/risks`
- `GET /api/employee/me/biomarkers`
- `POST /api/employee/me/reports/upload`
- `GET /api/employee/me/recommendations`
- `POST /api/employee/me/copilot/chat`
- `POST /api/employee/me/simulations`
- `GET /api/employee/me/wearables`
- `POST /api/employee/me/wearables/connect`
- `GET /api/employee/me/timeline`

## State Management

Zustand store:

- selected organ
- organ drawer open/close
- what-if simulation inputs

React Query is mounted at the module boundary and ready for replacing mock data with API queries.

## Upload Workflow

1. Upload report
2. OCR extract
3. Extract biomarkers
4. Update dashboard
5. Update organ scores
6. Update risks
7. Generate AI summary

## Dashboard Sections

Top:
Health score, biological age, steps, sleep, body weight.

Middle:
Overall health score, interactive React Three Fiber human twin, organ scores, organ drawer, AI health copilot.

Bottom:
Risk dashboard, biomarker charts, personalized recommendations, what-if simulation, upload report workflow, wearable connections, health timeline.
