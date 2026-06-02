# Deployment And Security Architecture

## Frontend Deployment

Vercel hosts the Next.js 15 application.

- Production, preview, and development environments
- Environment-scoped API URLs
- Edge caching for public marketing pages
- Server-side rendering for authenticated app shells
- Strict security headers
- Error monitoring and web vitals

## Azure Deployment

Core services:

- Azure Kubernetes Service for NestJS APIs and agent workers
- Azure Database for PostgreSQL for transactional data
- Azure Cache for Redis for sessions, queues, rate limits, and hot cohort metrics
- Azure Blob Storage for encrypted report files
- Azure Key Vault for secrets and certificates
- Azure Container Registry for backend images
- Azure Monitor and Application Insights for telemetry
- Azure Front Door or Application Gateway for edge routing
- Private endpoints for database, cache, storage, and key vault

## Kubernetes Workloads

- `api-gateway`
- `auth-service`
- `member-service`
- `report-service`
- `ocr-worker`
- `twin-service`
- `simulation-worker`
- `copilot-service`
- `agent-orchestrator`
- `cohort-analytics-worker`
- `notification-service`
- `audit-service`

## Security Controls

- Tenant isolation at application and data layers
- Row-level security for tenant and member scopes
- RBAC for organizational roles
- ABAC for medical sensitivity, role purpose, and consent
- Field-level encryption for high-sensitivity values
- Envelope encryption with Key Vault managed keys
- Immutable audit events
- Least-privilege managed identities
- Private networking for data services
- WAF and DDoS protection at edge
- Rate limiting by user, tenant, route, and risk
- Data retention policies by tenant type
- Break-glass workflows with mandatory justification
- De-identification and k-anonymity thresholds for cohort dashboards
- Human review for clinical recommendation escalation

## Compliance Readiness

Design targets:

- HIPAA-ready administrative, physical, and technical safeguards
- SOC 2 controls for security, availability, confidentiality, and privacy
- GDPR-style consent, access, correction, and deletion workflows
- WCAG 2.2 AA accessibility
- Full auditability of health data access and AI-generated outputs

## Observability

Track:

- API latency and error rate
- Upload and OCR success rate
- Agent execution duration and failure reason
- Retrieval quality and citation coverage
- Simulation queue time
- Dashboard freshness
- Consent denials
- Audit event volume
- Tenant-level SLOs

## Current Dependency Security Note

`npm audit` reports a moderate advisory for Next.js 15.5.19 because Next currently carries an internal `postcss@8.4.31` dependency. The npm-proposed `audit fix --force` path downgrades Next to 9.3.3, which is a breaking change and conflicts with the required Next.js 15 stack. Treat this as a tracked framework advisory and upgrade Next when the Next 15 line ships a patched internal PostCSS dependency.
