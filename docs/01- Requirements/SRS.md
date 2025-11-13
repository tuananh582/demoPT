# Software Requirements Specification (SRS)
## Customer-Centric Personal Training Platform

## 1. Introduction
### 1.1 Purpose
This Software Requirements Specification (SRS) defines the functional and non-functional requirements for the customer-facing personal training (PT) platform. The document is prepared for stakeholders including business sponsors, product management, UX designers, engineering, QA, and operations teams to deliver a feature-rich, modern web experience for learners (customers), personal trainers (coaches), and administrators.

### 1.2 Scope
The platform provides a responsive web application that allows customers to self-manage training journeys, coaches to deliver personalized programs, and administrators to oversee operations, commerce, and content. Primary capabilities include customer onboarding, subscription management, scheduling, progress analytics, omnichannel communications, digital content delivery, and integration with third-party services such as calendars and wearables.

### 1.3 Product Overview
- **Product perspective:** Cloud-hosted multi-tenant SaaS with modular front-end, API gateway, microservices, and analytics pipeline.
- **Product functions:** Customer onboarding, membership & payment management, training plan delivery, interactive workouts, nutrition coaching, goal tracking, scheduling, notifications, support ticketing, and reporting.
- **Operating environment:** Responsive web (desktop, tablet, mobile) supporting latest Chrome, Safari, Edge, Firefox. Server environment targeting Node.js 20+, PostgreSQL, Redis, message broker (e.g., RabbitMQ), optional integrations via REST/GraphQL.

### 1.4 Definitions, Acronyms, and Abbreviations
- **PT:** Personal Trainer.
- **CTA:** Call to Action.
- **KPI:** Key Performance Indicator.
- **CRM:** Customer Relationship Management system.
- **OTP:** One-Time Password.
- **NPS:** Net Promoter Score.

### 1.5 References
- IEEE Std 29148-2018: Systems and Software Requirements Engineering.
- OWASP Application Security Verification Standard (ASVS).
- WCAG 2.1 AA Accessibility Guidelines.
- BABOK® Guide v3 (for alignment with business analysis terminology).

### 1.6 Document Overview
Sections 2 through 5 describe the context, detailed requirements, quality attributes, and data models. Appendices include traceability information and assumptions.

## 2. Overall Description
### 2.1 Product Perspective
The solution replaces fragmented spreadsheets and chat-based coordination with a unified digital experience. It interfaces with an identity provider (SSO), payment processor (future release), email/SMS gateway, real-time messaging service, calendar providers, and wearable devices. A customer portal provides dashboards, training content, and community interaction, while coach and admin portals offer operational tooling.

### 2.2 Product Functions (Summary)
- Customer registration, onboarding flows, and dynamic assessments.
- Marketplace of coaching programs and subscription checkout.
- Personalized training plans with video-guided workouts, nutrition plans, and habit tracking.
- Interactive schedule management with class booking, waitlists, reminders, and cancellations.
- Progress analytics with biometric data, achievements, and shareable reports.
- In-app messaging, announcements, and push/email/SMS notifications.
- Support center with knowledge base, live chat, and ticket routing.
- Administrative configuration for content, users, billing, promotions, and system settings.

### 2.3 User Classes and Characteristics
| User Class | Description | Expertise | Goals |
|------------|-------------|-----------|-------|
| Customer (Learner) | Individuals purchasing PT services. | Mixed digital literacy, expects mobile-first experience. | Discover programs, book sessions, follow plans, track progress, manage payments. |
| Coach | Certified PTs delivering sessions. | High domain expertise, moderate digital skill. | Manage roster, deliver programs, monitor adherence, communicate with customers. |
| Administrator | Business operators, marketing, support staff. | Advanced business/technical knowledge. | Configure catalog, track revenue, ensure compliance, resolve escalations. |
| Guest | Prospective customer exploring offerings. | Low domain knowledge. | Understand value proposition, start trials, schedule consultations. |

### 2.4 User Needs
- Seamless onboarding with quick access to personalized plans.
- Real-time insights into progress and accountability metrics.
- Rich media content accessible anytime, anywhere.
- Frictionless communications with coaches and support.
- Transparency into billing, renewals, and promotions.

### 2.5 Operating Environment
- Cloud infrastructure deployed in at least two availability zones.
- Compliance with GDPR for EU learners and local data residency if required.
- Integration with external APIs uses HTTPS and OAuth 2.0 / OpenID Connect.

### 2.6 Design and Implementation Constraints
- Must support localization (vi-VN primary, en-US secondary).
- Must use responsive design adhering to WCAG 2.1 AA.
- Data retention policies must comply with regional regulations.
- Audit logging required for every data mutation.

### 2.7 Assumptions and Dependencies
- Payment gateway integration planned for Release 2; interim manual reconciliation supported.
- Wearable device integrations depend on third-party APIs providing consent-based data access.
- Push notifications rely on web push services supported by modern browsers.

## 3. External Interface Requirements
### 3.1 User Interfaces
- Progressive web application with theming, dark/light mode, and customizable dashboards.
- Drag-and-drop calendar, card-based program listings, interactive charts, accessible forms.
- Customer mobile view optimized for one-handed operation.
- Support portal embedded knowledge base with federated search.

### 3.2 Application Programming Interfaces
- RESTful/GraphQL APIs secured via OAuth 2.0 scopes.
- WebSocket channels for live session streaming, chat, and real-time updates.
- Public API sandbox for partner integrations (read-only in Release 1).

### 3.3 Data Interfaces
- PostgreSQL primary data store with schema-based partitioning.
- Data warehouse connector (Snowflake/BigQuery) for analytics synchronization.
- CSV/Excel import/export for roster, progress, and billing reports.

### 3.4 Integration Interfaces
- Calendar sync with Google Calendar, Microsoft Outlook using CalDAV/OAuth.
- Messaging via SendGrid (email) and Twilio (SMS/WhatsApp).
- Single Sign-On via Azure AD B2C or Auth0.
- Optional wearable data ingestion (Apple Health, Google Fit) through aggregated APIs.

### 3.5 Security Requirements
- Multi-factor authentication (MFA) for admin and coach roles; optional for customers.
- OAuth 2.0 with PKCE for mobile web.
- Role-based access control (RBAC) with attribute-based overrides for special cases.
- Data encryption at rest (AES-256) and in transit (TLS 1.2+).
- Automatic session timeout after 30 minutes of inactivity.

## 4. System Features and Functional Requirements
Each feature includes prioritized functional requirements (FR). Requirement IDs follow the pattern `FR-<Feature>-<Number>` and map to traceability assets.

### 4.1 F1 – Customer Onboarding & Account Management
- **Description:** Enable guests to become active customers with personalized profiles.
- **Functional Requirements:**
  - FR-ONB-01: Provide social login (Google, Facebook, Apple) and email/password registration with email verification or OTP.
  - FR-ONB-02: Present adaptive intake questionnaires (goals, health conditions, preferences) and store results in profile.
  - FR-ONB-03: Allow customers to book a discovery call or free trial session from onboarding flow.
  - FR-ONB-04: Support profile management (demographics, emergency contact, health waivers) with audit history.
  - FR-ONB-05: Enable GDPR-compliant consent management and data export/delete requests.

### 4.2 F2 – Subscription & Commerce Management
- FR-SUB-01: Display coaching programs, packages, and membership tiers with filtering, comparisons, and testimonials.
- FR-SUB-02: Provide checkout with promo codes, installment options, and invoice history (manual payment capture in Release 1).
- FR-SUB-03: Allow customers to upgrade/downgrade plans, pause membership, and request refunds subject to policy rules.
- FR-SUB-04: Notify admins/coaches of new purchases with actionable alerts.

### 4.3 F3 – Training Experience Delivery
- FR-TRN-01: Generate personalized training plans combining workouts, nutrition, habits, and recovery tasks.
- FR-TRN-02: Stream HD workout videos with offline-ready downloadable PDFs and accessibility transcripts.
- FR-TRN-03: Provide exercise library with filters, progression levels, equipment needs, and substitution suggestions.
- FR-TRN-04: Enable habit check-ins, completion streaks, and gamification badges.
- FR-TRN-05: Offer AR-assisted posture guidance (concept placeholder for Release 3, flagged as stretch goal).

### 4.4 F4 – Scheduling & Session Management
- FR-SCH-01: Present unified calendar with daily/weekly/monthly views, timezone awareness, and ICS export.
- FR-SCH-02: Allow booking of live classes, 1:1 sessions, and community events with seat limits and waitlists.
- FR-SCH-03: Provide automated reminders, confirmations, and rescheduling flows for customers and coaches.
- FR-SCH-04: Support hybrid sessions (online + in-studio) with location details, streaming links, and equipment checklist.
- FR-SCH-05: Track attendance status and automatically sync updates to coach dashboards.

### 4.5 F5 – Progress Tracking & Analytics
- FR-ANL-01: Capture metrics (body weight, body fat %, girth, HRV, workout completion, nutrition adherence) with configurable frequency.
- FR-ANL-02: Visualize progress via charts, goal completion percent, comparison against plan, and predictive trends.
- FR-ANL-03: Generate shareable progress reports (PDF/URL) with permission controls.
- FR-ANL-04: Integrate wearable data streams with opt-in mapping to analytics modules.
- FR-ANL-05: Provide admin-level cohort dashboards (retention, revenue, engagement) with drill-down.

### 4.6 F6 – Communication & Community
- FR-COM-01: Offer secure messaging between customers and coaches with attachment support.
- FR-COM-02: Provide announcement center and targeted broadcasts (email/SMS/push) with scheduling.
- FR-COM-03: Host moderated community forums, challenges, and live streams.
- FR-COM-04: Include in-app support ticketing with SLA tracking and escalation to admin.

### 4.7 F7 – Coach & Admin Workspace
- FR-OPS-01: Coach dashboards summarizing active clients, compliance alerts, and upcoming sessions.
- FR-OPS-02: Admin consoles for catalog management (programs, exercises, nutrition items), user management, and permissions.
- FR-OPS-03: Advanced reporting with export, configurable KPIs, and real-time filters.
- FR-OPS-04: Workflow automation builder (e.g., send nurture emails when streak drops) for admins.

### 4.8 F8 – System Management & Compliance
- FR-SYS-01: Centralized configuration for localization, currencies, taxation, and branding.
- FR-SYS-02: Comprehensive audit logging and anomaly detection alerts.
- FR-SYS-03: Disaster recovery strategy with RPO ≤ 15 minutes, RTO ≤ 2 hours.
- FR-SYS-04: Privacy dashboard for consent, data retention policies, and compliance reporting.

## 5. Quality and Non-Functional Requirements
### 5.1 Performance
- PFR-01: Pages must render initial content within 2.5 seconds for 95th percentile of users on 4G mobile.
- PFR-02: API endpoints must respond within 400 ms median under 500 concurrent sessions.

### 5.2 Reliability & Availability
- REL-01: System availability ≥ 99.5% monthly; critical services deployed in active-active configuration.
- REL-02: Automatic failover tests performed quarterly.

### 5.3 Security
- SEC-01: Conduct quarterly penetration tests and continuous vulnerability scanning.
- SEC-02: Support fine-grained RBAC with least privilege default roles.

### 5.4 Usability & Accessibility
- USA-01: Support keyboard-only navigation and screen readers.
- USA-02: Provide contextual onboarding tours and personalization tips.

### 5.5 Maintainability
- MAI-01: Codebase must maintain unit test coverage ≥ 80% for core modules.
- MAI-02: Provide configuration-as-code for infrastructure (IaC) with version control.

### 5.6 Portability
- POR-01: Deployable on container orchestration platforms (Kubernetes) and serverless edge CDN for static assets.

## 6. Data Requirements
### 6.1 Core Entities
- Customer, Coach, Admin, Guest Lead, Program, Workout, Exercise, Nutrition Item, Habit, Session, Subscription, Payment, Goal, Progress Metric, Message, Notification, Support Ticket, Audit Event.

### 6.2 Data Retention
- Customer-generated content retained for 3 years unless deletion requested.
- Audit logs retained for 7 years for compliance.

### 6.3 Privacy and Compliance
- Support data residency tagging per region.
- Ensure explicit consent for health-related data per GDPR Article 9.

## 7. Verification
- All functional requirements mapped to user stories, acceptance criteria, and test cases.
- Performance, security, and accessibility requirements validated via automated and manual testing before release.

## 8. Appendices
### 8.1 Traceability
See `docs/04-Supporting/TraceabilityMatrix.md` for BRD ↔ SRS ↔ Use Case alignment.

### 8.2 Future Enhancements
- Native mobile applications (iOS/Android).
- AI-driven recommendation engine for workout personalization.
- Integrated e-commerce for merchandise and supplements.

