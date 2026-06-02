# Neuromirror Product Blueprint

## Information Architecture

Primary website pages:

1. Home
2. About
3. Platform
4. Health Digital Twin
5. AI Health Copilot
6. Corporate Wellness
7. University Health Intelligence
8. School Student Health
9. Gym Performance Twin
10. Hospital Digital Twin
11. Insurance Risk Intelligence
12. Pricing
13. Case Studies
14. Blog
15. Book Demo
16. Contact
17. Login

## Core Dashboards

NeuroMirror admin dashboard:
Tenant inventory, tenant type, subscription state, AI capacity, onboarding progress, platform alerts, support queue, and cross-tenant operational health. This dashboard never exposes tenant health records unless explicit support access is granted and audited.

Organization onboarding dashboard:
Organization registration wizard, subscription selection, payment, administrator setup, tenant launch, generated tenant URL, security policy baseline, integration checklist, invitation readiness, and launch status.

Organization admin dashboard:
Total users, invited users, active users, health participation, average health score, high-risk population percentage, pending reports, active programs, doctor network, insurance network, recent alerts, integrations, and program ROI.

Corporate dashboard:
Population health intelligence, burnout risk, sleep deficiency, diabetes risk, obesity risk, hypertension risk, participation, wellness ROI, insurance analytics. HR sees only aggregated anonymized data.

School dashboard:
Student wellness, class trends, BMI, nutrition, sports participation, sleep, mental wellness, attendance correlation, parent portal, teacher portal, nurse portal. Sensitive records require authorized clinical roles.

University dashboard:
Anonymous campus health trends, mental health, stress, sleep, fitness, nutrition, academic-performance correlation, risk alerts, intervention planning.

Gym dashboard:
Body fat, muscle mass, weight, nutrition, workout performance, recovery, sleep, heart rate, VO2 max, AI coach, trainer portal, member portal, owner dashboard.

Hospital dashboard:
Patient timeline, AI clinical summary, medication history, labs, radiology, doctor copilot, treatment simulation, outcome prediction, command center, department analytics, bed utilization, population health.

Insurance dashboard:
Risk evolution, care gaps, preventive program engagement, claims trends, cohort analytics, member consent, policy-controlled intelligence.

## Required Widgets

- Interactive 3D human twin with organ hover/click panels
- Organ score cards for brain, heart, liver, kidney, lungs, metabolism, sleep, stress
- Upload report dropzone
- OCR extraction status
- AI analysis status
- Twin recalculation timeline
- Biomarker comparison table
- Risk evolution chart
- Prediction curve chart
- Burnout heatmap
- Sleep stage chart
- Metabolic trend chart
- Wearable dashboard
- Population analytics cohort grid
- AI copilot chat
- Doctor summary generator
- Consent and sharing panel
- Audit trail viewer
- Notification center
- Empty-state library
- Failure-state recovery panels
- Organization registration wizard
- Subscription and payment selector
- Tenant launch checklist
- Tenant URL generator
- Bulk invitation manager
- Invitation funnel chart
- Integration connector panel
- RBAC role matrix
- Marketplace partner catalog
- Wellness program launcher
- Alert policy center
- AI digital twin lifecycle tracker

## Button Behavior Standard

Every command must define:

- Default state
- Hover state
- Focus-visible state
- Disabled state
- Loading state
- Success state
- Failure state
- Empty state when no data exists
- Confirmation state for sensitive actions
- Notification event after completion
- Audit event when health data, consent, or enterprise policy changes

Example upload report flow:

1. Empty: show accepted report types and drag target.
2. Drag over: highlight boundary and validate file type.
3. Uploading: show file progress, cancellation, and retry.
4. OCR extraction: show detected pages, report type, confidence.
5. AI analysis: show agent activity and source extraction.
6. Health score update: show changed organ scores and reasons.
7. Timeline refresh: append report and biomarker events.
8. Twin recalculation: refresh organ simulation outputs.
9. Success: show summary, view report, ask copilot.
10. Failure: show cause, retry, manual review path.

## AI Copilot Capabilities

- Explain reports
- Compare reports over time
- Predict risks
- Generate doctor summaries
- Explain medications
- Answer health questions with source grounding
- Recommend nutrition and exercise plans
- Build preventive care plans
- Prepare for doctor visits
- Summarize family health insights

## Enterprise Onboarding Flow

1. NeuroMirror admin creates or approves an organization signup.
2. Organization selects tenant type: corporate, school, university, gym, hospital, or insurance company.
3. Registration wizard captures organization name, industry, location, website, employee count, student count, member count, hospital size, or insurance coverage.
4. Subscription plan is selected: Starter, Growth, Enterprise, or Custom.
5. Payment is configured by credit card, UPI, bank transfer, or invoice.
6. First administrator is created with name, email, phone, and role.
7. Tenant is launched with isolated data, dashboards, policies, AI controls, and generated URL such as `company.neuromirror.ai`.
8. Admin imports users by single add, CSV, Excel, HRIS, ERP, student management, hospital management, or gym CRM.
9. Invitations are sent through email, SMS, WhatsApp, QR code, magic link, or SSO.
10. User registers, verifies email and mobile, accepts consent, completes questionnaire, uploads reports, connects wearables, receives AI health assessment, and launches dashboard.

## SaaS Modules

Tenant management:
No cross-tenant data sharing. Each tenant owns its users, admins, reports, AI models, dashboards, security policies, billing, integrations, and audit logs.

Test dashboard login:
The prototype includes a test-only login screen at `/login`. Demo accounts use password `test123`: `org@neuromirror.test`, `school@neuromirror.test`, `university@neuromirror.test`, and `gym@neuromirror.test`. Each account opens a different tenant dashboard with role-specific upload records, metrics, requirements, modules, and invitation campaign copy.

Invitation system:
Track delivered, opened, registered, completed profile, uploaded reports, connected wearables, and launched dashboard for every campaign.

Marketplace:
Organizations and users can connect doctors, nutritionists, fitness coaches, mental health experts, diagnostic labs, insurance providers, hospitals, and pharmacies.

Wellness program engine:
Admins can launch weight loss, diabetes prevention, sleep improvement, stress reduction, and heart health programs. Each program defines target population, campaign, participation, outcomes, and ROI.

Alert system:
Employee risk alerts, doctor alerts, program alerts, insurance alerts, wearable alerts, medication alerts, appointment reminders, vaccination reminders, and health check reminders.

RBAC:
Super Admin, Organization Owner, HR Admin, Wellness Manager, Doctor, Trainer, Teacher, Parent, Employee, Student, Patient, and Insurance Analyst roles require explicit permissions and audit trails.

AI digital twin lifecycle:
User joins, uploads data, twin is created, twin learns, predictions are generated, recommendations are created, programs are assigned, health improves, twin updates, and continuous intelligence continues.

## Agent Workflow

1. Intake router classifies request and tenant policy.
2. Consent guard checks allowed data scopes.
3. Retrieval planner selects clinical guidelines, research, records, and documents.
4. Specialist agent performs task: report analysis, risk prediction, organ simulation, nutrition, exercise, mental health, doctor copilot, insurance, or clinical recommendation.
5. Critic agent checks safety, hallucination risk, citations, policy, and escalation need.
6. Response composer formats member, clinician, admin, or enterprise output.
7. Audit writer stores prompt metadata, data scopes, sources, and outcome.

## Production Implementation Plan

Phase 1: Design system, Next.js app shell, authentication, tenant model, role model, static dashboards.

Phase 2: Report upload, OCR pipeline, normalized biomarker schema, member timeline, basic organ scores.

Phase 3: Copilot RAG, vector index, agent orchestration, source citations, doctor summaries.

Phase 4: Segment dashboards, cohort de-identification, consent controls, audit logging, notification system.

Phase 5: Simulation engine, wearable integrations, imaging metadata, clinical escalation workflows.

Phase 6: Enterprise hardening, Azure AKS deployment, observability, security review, compliance evidence, load testing.
