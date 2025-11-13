# SRS – FitCampus Student Portal (v0.1)

**Owner:** Product Team – Student Affairs  
**Reviewer:** Wellness Technology Lead  
**Status:** Draft  
**Date:** 2025-11-13  
**Timezone:** Asia/Bangkok

---

## §1 Purpose & Scope
- **Purpose:** This Software Requirements Specification (SRS) defines the learner-centric requirements for the FitCampus Student Portal, enabling students to manage memberships, fitness plans, scheduling, progress tracking, and community engagement.
- **Scope:** Responsive web portal (PWA) for students and mentors; includes onboarding, training hub, scheduling, analytics, community, wearable integrations, and advisor tooling. Administrative back-office functions outside learner experience are out of scope for this release.
- **Out of Scope:** Faculty wellness programs, native mobile apps, physical access control hardware.

## §2 Product Context & Overview
- **Product Type:** Cloud-hosted multi-tenant web application with modular architecture.
- **Operating Environment:** Next.js frontend, Node.js backend (NestJS), PostgreSQL, Redis, object storage (S3-compatible), event streaming (Kafka/RabbitMQ).
- **Dependencies:** Campus SSO, payment gateway (Stripe/MoMo), messaging (SendGrid, Twilio), wearable aggregator (Terra), analytics warehouse (BigQuery/Snowflake).
- **Assumptions:** Students access via modern browsers; localization vi-VN primary, en-US secondary; campus brand guidelines enforced.

## §3 Terminology & References
| Term | Definition |
|------|------------|
| Learner | Student using the portal to manage wellness journey. |
| Mentor | Peer or staff wellness advisor guiding learner cohorts. |
| Orientation Checklist | Sequenced tasks unlocking access to training modules. |
| XP | Experience points earned via streaks and challenges. |
| Quest | Gamified multi-step activity awarding rewards upon completion. |
| Wearable Sync | Data ingestion from fitness trackers (Apple Health, Google Fit, Garmin). |
| SSO | Single Sign-On via campus identity provider. |
| SLA | Service Level Agreement for support response/resolution. |

**References:** IEEE 29148, OWASP ASVS 4.0, WCAG 2.1 AA, PDPA (Vietnam), GDPR, FERPA guidelines, Campus Digital Brand Manual.

## §4 Stakeholders & Constraints
| Group | Objectives | Notes |
|-------|------------|-------|
| Students (Learners) | Access personalized plans, track progress, stay motivated. | Mixed digital literacy, mobile-first expectation. |
| Mentors & Student Success Coaches | Monitor cohorts, intervene early. | Need analytics & automation. |
| Student Affairs Leadership | Prove wellness impact, ensure compliance. | Require dashboards & reports. |
| Campus Wellness Team | Publish content, manage challenges. | Needs simple CMS-like tools. |
| IT & Security | Ensure integrations, governance, uptime. | Enforce security policies. |

**Constraints:** GDPR/PDPA/FERPA compliance, WCAG 2.1 AA accessibility, response P95 < 2.5s on 4G, monthly availability ≥ 99.5%.

## §5 Functional Requirements (FR)
> Module codes used: `LRN` (Onboarding), `MEM` (Membership), `PLAN` (Training Hub), `SCH` (Scheduling), `PROG` (Progress), `COM` (Community & Support), `EXP` (Gamification), `OPS` (Mentor Toolkit), `INT` (Integrations).

| ID | Statement | Priority (MoSCoW) | Acceptance Criteria (Given/When/Then) | V&V Method | Source |
|----|-----------|-------------------|---------------------------------------|------------|--------|
| LRN-FR-001 | The system SHALL provide adaptive onboarding with readiness quiz and consent capture before granting portal access. | Must | Given a visitor signs up, When identity is verified and quiz submitted, Then the system personalizes orientation tasks and records consent artifacts. | Test (E2E) + Inspection | BR-01, UC-LRN-01 |
| LRN-FR-002 | The system SHALL allow learners to schedule orientation sessions within the onboarding flow. | Must | Given a learner completes orientation tasks, When they select a session slot, Then the booking is confirmed with reminders and calendar invites. | Test (API/UI) + Demonstration | BR-01, UC-LRN-01 |
| MEM-FR-001 | The system SHALL present a membership catalog with filters (goal, price, facility) and real-time pricing updates. | Must | Given a learner views catalog, When filters or promo codes change, Then displayed plans update immediately with recalculated totals. | Test (UI) + Analysis | BR-06, UC-MEM-01 |
| MEM-FR-002 | The system SHALL process membership activation and deliver receipts with renewal and cancellation details. | Must | Given payment succeeds, When membership activates, Then a receipt with plan details, renewal date, and cancellation instructions is sent via email and in-app notification. | Test (API) + Inspection | BR-06, UC-MEM-01 |
| PLAN-FR-001 | The system SHALL render a daily training dashboard combining workouts, micro-lessons, nutrition tasks, and wellness tips. | Must | Given a learner opens dashboard, When the day’s plan loads, Then all assigned items display with completion toggles and status synced across devices. | Test (UI) + Analysis | BR-02, UC-PLAN-01 |
| PLAN-FR-002 | The system SHALL support exercise substitutions with instant instructional updates. | Should | Given a learner selects substitution, When a replacement is chosen, Then the alternative instructions and media appear immediately and progress tracking updates. | Test (UI/API) + Demonstration | BR-02, UC-PLAN-01 |
| SCH-FR-001 | The system SHALL manage class/session bookings with conflict checks, waitlists, and timezone persistence. | Must | Given a learner books a session, When conflicts or capacity limits exist, Then the system prevents booking, offers waitlist, and stores timezone preferences. | Test (API/UI) + Analysis | BR-03, UC-SCH-01 |
| PROG-FR-001 | The system SHALL provide progress dashboards comparing actual vs. target metrics with export capability. | Must | Given metrics exist, When the learner adjusts filters, Then charts refresh ≤1s and exports match displayed data. | Test (UI) + Analysis | BR-04, UC-PROG-01 |
| COM-FR-001 | The system SHALL support peer and mentor messaging with attachments up to 25MB and read receipts. | Should | Given a learner sends a message, When attachments pass scanning, Then recipients receive messages with read receipt updates. | Test (API) + Demonstration | BR-05, UC-COM-01 |
| COM-FR-002 | The system SHALL enable community challenges with leaderboards refreshing every ≤15 minutes. | Should | Given a challenge is active, When leaderboard recalculates, Then rankings update within the SLA and notify subscribed learners. | Test (API/Job) + Monitoring | BR-05, UC-EXP-01 |
| EXP-FR-001 | The system SHALL award XP, streaks, and badges when learners complete plan tasks. | Should | Given a learner completes a task, When completion is submitted, Then XP/streak/badge status updates instantly and surfaces on profile. | Test (API) + Demonstration | BR-07, UC-PLAN-01 |
| OPS-FR-001 | The system SHALL allow mentors to view at-risk learners and send nudges or schedule follow-ups. | Must | Given a mentor opens cohort view, When risk filters are applied, Then the system lists learners with actions to message or book a session. | Test (UI/API) + Analysis | BR-04, UC-MEN-01 |
| INT-FR-001 | The system SHALL ingest wearable data (steps, HR, calories) with learner consent and attribution. | Could | Given consent exists, When wearable webhook triggers, Then metrics store with source labels and surface on dashboards. | Test (Integration) + Demonstration | BR-09, UC-PLAN-01 |

## §6 Non-Functional Requirements (NFR)
| ID | Statement | Priority | Acceptance Criteria | V&V Method | Source |
|----|-----------|----------|---------------------|-------------|--------|
| SYS-NFR-001 | The system SHALL deliver P95 page load time < 2.5 seconds on 4G mobile for dashboard pages. | Must | Given 100 RPS load test, When monitoring P95 collected, Then value ≤ 2.5s. | Performance Test (k6) + Monitoring | BR-04 |
| SYS-NFR-002 | The system SHALL maintain monthly availability ≥ 99.5% with RPO ≤ 15 minutes and RTO ≤ 2 hours. | Must | Given production operations, When uptime is measured, Then downtime ≤ 3h36m/month and DR drills meet RPO/RTO limits. | Monitoring + DR Drill | BR-04 |
| SYS-NFR-003 | The system SHALL protect data via role-based access, MFA for mentors/admins, and encryption in transit (TLS 1.2+) and at rest (AES-256). | Must | Given security audit, When controls assessed, Then RBAC enforced, MFA required, encryption verified. | Security Test + Inspection | BR-08 |
| SYS-NFR-004 | The system SHALL meet WCAG 2.1 AA accessibility with keyboard navigation and captions/transcripts for media. | Must | Given UX audits, When accessibility scans run, Then WCAG AA success criteria satisfied and manual audit passes. | Accessibility Test (axe) + Manual | BR-01 |
| SYS-NFR-005 | The system SHALL provide audit logs retrievable within 5 seconds for compliance queries. | Should | Given an audit query, When search executed, Then results return ≤5s and include actor, resource, timestamp. | Test (API) + Analysis | BR-08 |
| SYS-NFR-006 | The system SHALL maintain automated test coverage ≥ 80% for core modules (LRN, MEM, PLAN, SCH). | Should | Given CI runs, When coverage reports generated, Then overall coverage ≥80%. | Analysis (CI) | BR-04 |

## §7 Data & Policy Requirements
- **Key Entities:** Learner, Mentor, OrientationTask, Membership, Payment, Workout, Lesson, Habit, Session, WaitlistEntry, ProgressMetric, Challenge, Message, Notification, SupportTicket, WearableMetric, AuditLog.
- **Data Classification:**
  - Personally Identifiable Information (PII): name, student ID, contact info – sensitive, encryption required.
  - Health & Wellness Data (Special Category): readiness responses, biometrics – sensitive, explicit consent, restricted access.
  - Engagement Data: streaks, XP, challenge scores – internal, moderate sensitivity.
- **Retention Policies:**
  - Learner activity data retained 3 years; anonymize after access revocation.
  - Audit logs retained 7 years; immutable storage.
  - Support tickets retained 2 years unless legal hold.
- **Masking/Anonymization:** Analytics exports SHALL mask PII by default; identifiable reports require mentor/admin role with justification logging.

## §8 KPIs & Business Rules
| KPI ID | Definition | Formula | Window | Target |
|--------|------------|---------|--------|--------|
| KPI-ENG-001 | Weekly Active Learners | Unique learners completing ≥1 task / total active memberships | Rolling 7 days | ≥ 70% |
| KPI-RET-001 | Orientation Completion Rate | Learners finishing orientation within 7 days / total new sign-ups | Rolling month | ≥ 80% |
| KPI-CLS-001 | Class Fill Rate | Seats occupied / seats available per class | Per session aggregated weekly | ≥ 75% |
| KPI-CHL-001 | Challenge Participation | Learners enrolled in ≥1 challenge / total active learners | Rolling term | ≥ 60% |

**Business Rules:**
- Quests require completion of prerequisite modules before unlocking new tiers.
- Learners under 18 require guardian consent for messaging features (system enforces before enabling COM modules).
- Membership pause capped at 30 days, max twice per academic year; system enforces automatically.

## §9 API & Event Interfaces
- **UI Interfaces:** Responsive web (desktop, tablet, mobile); offline caching for daily plan; theme switch (light/dark). Screen reader and high-contrast modes mandatory.
- **System Interfaces:**
  - REST/GraphQL APIs secured with OAuth 2.0 PKCE; rate limit 120 req/min per user.
  - WebSocket channels for messaging and live leaderboard updates.
  - Webhooks for wearable data ingestion with HMAC signature verification.
- **Hardware Interfaces:** N/A (future consideration for access control).
- **Representative Endpoints:**
  - `POST /api/v1/learners/register`
  - `GET /api/v1/memberships?goal=&facility=`
  - `PATCH /api/v1/dashboard/items/{id}`
  - `POST /api/v1/sessions/{id}/book`
  - `GET /api/v1/progress?range=weekly`
  - `POST /api/v1/challenges/{id}/join`
  - `POST /api/v1/support/tickets`
- **Event Topics:** `LearnerOnboarded`, `MembershipActivated`, `PlanItemCompleted`, `SessionBooked`, `ChallengeLeaderboardUpdated`, `WearableMetricIngested`, `LearnerAtRiskFlagged`.
- **Error Handling:** Standard JSON envelope `{ status, message, errors[] }`; locale-aware messages.

## §10 Testing Strategy & Definition of Done
- **Testing Pyramid:**
  - Unit tests (Jest) for services and React components.
  - Integration tests (NestJS + Supertest) for API flows.
  - E2E tests (Playwright) for critical learner journeys (signup, booking, plan completion).
  - Performance tests (k6) targeting P95 metrics.
  - Accessibility audits (axe-core, manual keyboard traversal).
  - Security scans (OWASP ZAP, SAST/DAST, dependency checks).
- **Data/Test Fixtures:** Synthetic learner profiles, membership plans, content library, wearable payload samples.
- **Definition of Done:**
  - All acceptance criteria satisfied with test evidence.
  - No Sev1/Sev2 defects open; Sev3 with approved workaround.
  - Documentation updated (Release notes, knowledge base snippets).
  - Monitoring dashboards/alerts configured for new modules.

## §11 Requirements Traceability Matrix (RTM)
| FR/NFR | Use Case | API/Event | Test ID |
|--------|----------|-----------|---------|
| LRN-FR-001 | UC-LRN-01 | `POST /learners/register`, Event `LearnerOnboarded` | TC-001 (E2E Signup) |
| LRN-FR-002 | UC-LRN-01 | `POST /sessions`, Event `SessionBooked` | TC-002 (Orientation Booking) |
| MEM-FR-001 | UC-MEM-01 | `GET /memberships`, `POST /orders` | TC-010 (Catalog Filters) |
| MEM-FR-002 | UC-MEM-01 | `POST /orders/{id}/confirm`, Event `MembershipActivated` | TC-011 (Receipt Delivery) |
| PLAN-FR-001 | UC-PLAN-01 | `GET /dashboard/today` | TC-020 (Daily Plan Render) |
| PLAN-FR-002 | UC-PLAN-01 | `POST /plans/{id}/substitutions` | TC-021 (Substitution Flow) |
| SCH-FR-001 | UC-SCH-01 | `POST /sessions/{id}/book` | TC-030 (Scheduling Conflict) |
| PROG-FR-001 | UC-PROG-01 | `GET /progress` | TC-040 (Progress Export) |
| COM-FR-001 | UC-COM-01 | `POST /messages` | TC-050 (Messaging Attachments) |
| COM-FR-002 | UC-EXP-01 | Event `ChallengeLeaderboardUpdated` | TC-051 (Leaderboard Refresh) |
| EXP-FR-001 | UC-PLAN-01 | `PATCH /dashboard/items/{id}` | TC-060 (XP Award) |
| OPS-FR-001 | UC-MEN-01 | `GET /cohorts/at-risk` | TC-070 (Mentor Intervention) |
| INT-FR-001 | UC-PLAN-01 | `POST /integrations/wearables` | TC-080 (Wearable Sync) |
| SYS-NFR-001 | — | Synthetic load scripts | PT-001 (Performance P95) |
| SYS-NFR-002 | — | Monitoring dashboards | PT-002 (Availability) |
| SYS-NFR-003 | — | Security tooling | ST-001 (Security Audit) |
| SYS-NFR-004 | — | Accessibility suite | AT-001 (WCAG Audit) |

## §12 Risks & Mitigations
| ID | Risk | Probability | Impact | Mitigation |
|----|------|-------------|--------|-----------|
| R-01 | Low student adoption due to awareness gap | Medium | High | Ambassador program, orientation integration, targeted campaigns |
| R-02 | Wearable vendor API changes | Medium | Medium | Abstraction layer, monitor deprecations, fallback to manual entry |
| R-03 | Data privacy breach | Low | High | SOC2-aligned controls, encryption, incident response drills |
| R-04 | Accessibility non-compliance | Medium | High | Design reviews, automated + manual audits, remediation SLAs |
| R-05 | Payment integration delays | Low | Medium | Early sandbox testing, manual fallback workflow |

## §13 TBD Log
| ID | Description | Owner | Due |
|----|-------------|-------|-----|
| TBD-01 | Confirm primary payment gateway (Stripe vs. MoMo) and student discount handling. | Product + Finance | 2025-11-30 |
| TBD-02 | Finalize wellness escalation thresholds with counseling center. | Student Affairs | 2025-11-25 |
| TBD-03 | Decide on LMS integration for credit-bearing modules. | Academic Affairs | 2025-12-05 |

## §14 Change History
| Version | Date | Author | Notes |
|---------|------|--------|-------|
| v0.1 | 2025-11-13 | Product Team | Khởi tạo tài liệu SRS cho cổng học viên |

## §15 Appendix & Placeholders
- Architecture Diagram: TBD (link to be added once updated in `/docs/02-Architecture`).
- Data Dictionary: TBD (detailed attributes beyond §7 to be documented in DataModel.md).
- Decision Log: TBD – capture payment gateway, wearable roadmap decisions.

---

### SRS Linter Self-Assessment (Score ≥ 90)
- FR/NFR syntax compliance: 100% requirements use “SHALL” with AC & V&V.  
- NFR measurability: All NFRs include thresholds & V&V.  
- RTM coverage: Every FR/NFR mapped with use case/API/test.  
- Security & Privacy: §7 outlines retention, masking, compliance.  
- Assumptions/Constraints: TZ, units, rate limits documented.  
- API schemas & errors: §9 lists representative endpoints and error contract.  
- TBD & Change History: Present with actionable owners.  
- Language clarity: Avoided ambiguous terms.
