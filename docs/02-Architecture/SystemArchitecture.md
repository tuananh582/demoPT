# System Architecture
## Customer-Centric Personal Training Platform

## 1. Architectural Overview
The solution adopts a modular, service-oriented architecture combining a composable front-end (Next.js + micro-frontend patterns) with a backend platform (Node.js/NestJS) deployed on containerized infrastructure. Core tenants include domain-driven design, event-driven integrations, and zero-trust security.

Key subsystems:
- **Customer Experience Layer:** Responsive web client for guests/customers with PWA support, personalization, and offline caching.
- **Coach & Admin Consoles:** Dedicated web workspaces sharing design system components but with role-based navigation.
- **API Gateway:** GraphQL/REST façade providing authentication, orchestration, and throttling.
- **Domain Services:** Independent services for Identity, Subscription & Billing, Training Content, Scheduling, Messaging, Analytics, and Automation.
- **Data Platform:** PostgreSQL OLTP cluster, Redis cache, object storage (media), event stream (Kafka/RabbitMQ), and analytics warehouse (BigQuery/Snowflake).
- **Integration Hub:** Manages connections to payment gateway, calendar APIs, wearable aggregators, CRM, and notification providers.

## 2. Component Diagram (Textual)
```
[Customer PWA] --
                 \
[Coach Console] ----> [Edge CDN] ---> [API Gateway]
[Admin Console] --/                     |
                                          v
                                   [Identity Service]
                                          |
                         +-----------------+-----------------+
                         |                 |                 |
                  [Subscription Service] [Training Service] [Scheduling Service]
                         |                 |                 |
                         v                 v                 v
                  [Billing Adapter]   [Content Store]   [Calendar Adapter]
                         |                                   |
                    [Payment API]                       [Google/M365]

                [Messaging Service]---->[Notification Providers]
                [Automation Service]--->[Workflow Engine]
                [Analytics Service]---->[Data Warehouse]

        Shared Infrastructure: [PostgreSQL Cluster] [Redis] [Object Storage] [Event Bus]
```

## 3. Layered Architecture
- **Presentation Layer:** Next.js PWA + admin/coach consoles with component library, SSR/ISR for marketing pages, client caching.
- **API & Orchestration Layer:** GraphQL gateway, API gateway policies (rate limiting, caching), BFF modules for each persona.
- **Domain Layer:** Services encapsulating business logic for onboarding, subscription, training, scheduling, analytics, communications, automation, compliance.
- **Infrastructure Layer:** Persistence (PostgreSQL, Redis), file storage (S3-compatible), messaging/event streaming, observability stack.

## 4. Data Architecture
- **Operational Data Store:** PostgreSQL with schemas per bounded context (identity, commerce, training, engagement).
- **Event Sourcing:** Key domain events (PlanUpdated, SessionBooked, PaymentCaptured) published to event bus for audit/compliance.
- **Analytics Pipeline:** Change Data Capture (CDC) to warehouse feeding BI dashboards and ML models.
- **Media Storage:** Workout videos, transcripts stored in CDN-backed object storage.

## 5. Integration Architecture
- **Payments:** Stripe/MoMo connectors abstracted via billing adapter with retry/ledger reconciliation.
- **Calendars:** Google/Microsoft integrations via OAuth CalDAV, ICS sync.
- **Wearables:** Aggregated via middleware (e.g., Terra) with consent management.
- **CRM & Marketing:** Webhooks and REST connectors push lead/customer lifecycle events.
- **Notification Providers:** Email (SendGrid), SMS/WhatsApp (Twilio), Push (Firebase Web Push).

## 6. Security Architecture
- OAuth 2.0 / OpenID Connect for authentication with MFA and adaptive risk scoring.
- RBAC/ABAC hybrid authorization using policy engine (OPA/Casbin).
- Secrets managed via vault service (e.g., HashiCorp Vault) with rotation policies.
- End-to-end encryption, content security policy (CSP), and secure media delivery via signed URLs.
- Comprehensive audit logging pipeline and anomaly detection with SIEM integration.

## 7. Scalability & Reliability
- Stateless services horizontally scaled via Kubernetes autoscaling.
- Read replicas for PostgreSQL; Redis clusters for session/cache high availability.
- Blue/green and canary deployments for frontend/backends.
- Disaster recovery with multi-region replication (RPO ≤ 15 min, RTO ≤ 2 hr).

## 8. Observability & Operations
- Centralized logging (ELK/OpenSearch), distributed tracing (OpenTelemetry + Jaeger), metrics (Prometheus + Grafana).
- SLOs defined per service with alerting (PagerDuty).
- Automated health checks, synthetic monitoring for critical journeys (signup, booking, playback).

## 9. Compliance & Governance
- Data classification policies, retention schedules, and privacy dashboards per regulatory requirements (GDPR, PDPA).
- Access reviews and segregation of duties for admin functions.
- Secure SDLC with automated security scanning, dependency checks, and infrastructure as code governance.

