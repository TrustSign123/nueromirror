# API And Data Architecture

## API Surface

Authentication:

- `POST /api/auth/login`
- `POST /api/auth/logout`
- `POST /api/auth/refresh`
- `GET /api/auth/session`

Tenancy and users:

- `GET /api/tenants/current`
- `GET /api/admin/tenants`
- `POST /api/admin/tenants`
- `POST /api/organizations/signup`
- `POST /api/organizations/:id/launch-tenant`
- `GET /api/users/me`
- `GET /api/roles`
- `POST /api/invitations`
- `POST /api/invitations/bulk`
- `GET /api/invitations/campaigns/:id/funnel`
- `POST /api/integrations/connect`
- `GET /api/integrations`

Subscriptions and billing:

- `GET /api/subscriptions/plans`
- `POST /api/subscriptions/checkout`
- `POST /api/payments/intents`
- `POST /api/invoices`

Members:

- `GET /api/members`
- `POST /api/members`
- `GET /api/members/:id`
- `PATCH /api/members/:id`
- `GET /api/members/:id/timeline`

Reports:

- `POST /api/reports/upload`
- `GET /api/reports/:id`
- `POST /api/reports/:id/extract`
- `POST /api/reports/:id/analyze`

Twin and simulations:

- `GET /api/members/:id/twin`
- `GET /api/members/:id/organ-scores`
- `POST /api/simulations/organ-impact`
- `POST /api/simulations/lifestyle-plan`

Copilot and agents:

- `POST /api/copilot/chat`
- `GET /api/copilot/threads`
- `POST /api/agents/run`
- `GET /api/agents/runs/:id`

Cohorts:

- `GET /api/cohorts`
- `GET /api/cohorts/:id/analytics`
- `GET /api/cohorts/:id/risk-evolution`

Marketplace and programs:

- `GET /api/marketplace/partners`
- `POST /api/appointments`
- `GET /api/programs`
- `POST /api/programs`
- `POST /api/programs/:id/enroll`
- `GET /api/programs/:id/roi`
- `GET /api/alerts`
- `POST /api/alerts/policies`

Consent and security:

- `GET /api/consent/grants`
- `POST /api/consent/grants`
- `DELETE /api/consent/grants/:id`
- `GET /api/audit/events`

## PostgreSQL Tables

- `tenants`
- `tenant_settings`
- `organizations`
- `organization_profiles`
- `subscriptions`
- `subscription_plans`
- `payments`
- `invoices`
- `users`
- `roles`
- `permissions`
- `role_assignments`
- `invitations`
- `invitation_campaigns`
- `integration_connections`
- `members`
- `member_profiles`
- `consent_grants`
- `health_reports`
- `report_files`
- `report_extractions`
- `biomarkers`
- `biomarker_observations`
- `imaging_studies`
- `medications`
- `allergies`
- `vaccinations`
- `lifestyle_events`
- `wearable_events`
- `family_history`
- `organ_scores`
- `risk_scores`
- `simulation_runs`
- `simulation_outputs`
- `cohorts`
- `cohort_memberships`
- `deidentified_metrics`
- `copilot_threads`
- `copilot_messages`
- `knowledge_documents`
- `document_chunks`
- `vector_index_records`
- `agent_runs`
- `agent_steps`
- `notifications`
- `notification_preferences`
- `alert_policies`
- `marketplace_partners`
- `appointments`
- `programs`
- `program_enrollments`
- `program_outcomes`
- `doctor_networks`
- `insurance_networks`
- `audit_events`

## NestJS Backend Structure

```text
apps/api/src
  main.ts
  app.module.ts
  auth/
  tenants/
  organizations/
  subscriptions/
  payments/
  invitations/
  integrations/
  users/
  members/
  reports/
  ocr/
  biomarkers/
  twin/
  simulations/
  copilot/
  agents/
  cohorts/
  marketplace/
  appointments/
  programs/
  alerts/
  consent/
  audit/
  notifications/
  common/
    guards/
    policies/
    interceptors/
    filters/
    dto/
```

## RAG Architecture

Sources:

- Medical knowledge base
- Clinical guidelines
- Research papers
- Hospital documents
- Health records
- Uploaded reports

Pipeline:

1. Ingest source.
2. Classify source type.
3. Extract text and metadata.
4. Chunk by semantic boundaries.
5. Embed chunks.
6. Store chunk metadata in PostgreSQL.
7. Store vectors in FAISS or managed vector service.
8. Retrieve by user role, tenant, consent, and query.
9. Rerank sources.
10. Generate grounded answer.
11. Persist citations and audit event.
