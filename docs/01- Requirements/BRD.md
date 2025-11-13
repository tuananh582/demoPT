# Business Requirements Document (BRD)
## Customer-Centric Personal Training Platform

## 1. Executive Summary
The personal training business requires a unified digital experience that engages customers, empowers coaches, and provides administrators with end-to-end visibility. This BRD articulates the business needs, scope, and strategic alignment for delivering a modern customer-facing platform that elevates learner outcomes, increases retention, and scales operations.

## 2. Business Objectives & Success Metrics
| Objective | KPI / Target |
|-----------|--------------|
| Increase customer acquisition via self-service onboarding | +35% new sign-ups per quarter |
| Improve customer retention | 85% 6-month retention rate |
| Expand coach productivity | 20% increase in active customer-to-coach ratio |
| Grow ancillary revenue (upsells, add-ons) | 25% uplift within 12 months |
| Elevate customer satisfaction | NPS ≥ 60, CSAT ≥ 4.5/5 |

## 3. Background & Business Need
- Current experience is fragmented across spreadsheets, messaging apps, and manual scheduling causing drop-offs during onboarding.
- Customers demand on-demand access to workouts, progress tracking, and direct communication with coaches.
- Business leadership seeks data-driven insights to optimize pricing, promotions, and program effectiveness.
- Competitors offer advanced digital ecosystems; modernization is critical to maintain market share.

## 4. Stakeholder Analysis
| Stakeholder | Role | Needs |
|-------------|------|-------|
| Executive Sponsor | Approves funding and strategy | Visibility into revenue, growth, and differentiation |
| Product Management | Defines roadmap | Clear prioritization, validated business value |
| Operations/Admin Team | Day-to-day management | Efficient workflows, accurate data, compliance |
| Coaches | Deliver programs | Insight into client adherence, easy scheduling, communication |
| Customers | Learners/end users | Seamless onboarding, engaging training content, transparency |
| Marketing | Growth & retention | Campaign automation, segmentation, conversion insights |
| Support Team | Customer care | Omnichannel support tools, SLAs, knowledge base |

## 5. Current State Assessment
- Manual onboarding via phone/email; average conversion time 5 days.
- Scheduling conflicts due to lack of centralized calendar.
- Limited visibility into customer progress; reliance on coach updates.
- No unified portal for payments, content, or support.

## 6. Future State Vision
- Customers self-serve onboarding, purchase memberships, and immediately receive personalized programs.
- Coaches leverage dashboards, automation, and analytics to manage larger rosters with less administrative overhead.
- Administrators access real-time revenue, engagement, and compliance dashboards.
- Integrated communication hub supporting chat, announcements, and community.

## 7. Business Scope
### 7.1 In Scope
- Responsive customer portal with onboarding, subscriptions, scheduling, training content, and analytics.
- Coach workspace for roster management, program delivery, and communication.
- Administrative console for catalog, billing oversight, promotions, and reporting.
- Integrations with calendar providers, messaging services, wearable data sources, and identity provider.

### 7.2 Out of Scope
- Native mobile apps (planned as future enhancement).
- Full payment gateway automation in Release 1 (manual capture only).
- Brick-and-mortar access control systems.
- Hardware integration beyond wearable data ingestion APIs.

## 8. Business Requirements
| ID | Requirement | Description | Priority |
|----|-------------|-------------|----------|
| BR-01 | Customer self-onboarding | Provide guided assessments, plan recommendations, and trial bookings without staff intervention. | Must |
| BR-02 | Digital program delivery | Offer multimedia workouts, nutrition plans, and habit tracking accessible 24/7. | Must |
| BR-03 | Intelligent scheduling | Deliver unified calendar with bookings, waitlists, reminders, and attendance tracking. | Must |
| BR-04 | Progress insights | Present dashboards for customers, coaches, and admins with actionable analytics. | Must |
| BR-05 | Omnichannel communication | Enable secure messaging, broadcasts, support tickets, and community engagement. | Should |
| BR-06 | Commerce management | Manage subscriptions, upgrades, add-ons, and promotions with auditability. | Must |
| BR-07 | Operational automation | Provide workflows, alerts, and templated communications to reduce manual effort. | Should |
| BR-08 | Compliance & trust | Support consent management, privacy controls, and robust security posture. | Must |
| BR-09 | Partner integrations | Offer APIs and connectors for marketing, wearable, and CRM systems. | Could |

## 9. Business Rules & Policies
- Customers must accept liability waivers and health declarations before accessing workouts.
- Refunds follow tiered policy: 100% within 3 days, 50% within 14 days, no refund afterwards unless medical proof.
- Membership pauses limited to 2 per year, each up to 30 days.
- Coaches require valid certifications uploaded annually.
- Communications to minors must copy guardians per compliance.

## 10. Assumptions
- Budget is approved for a 12-month phased delivery.
- Key SMEs (head coach, support lead) available for discovery workshops.
- Existing CRM provides API access for lead capture synchronization.

## 11. Constraints
- Must comply with GDPR, PDPA (Vietnam), and HIPAA-like safeguards for health data.
- Brand guidelines mandate specific typography/color accessible combinations.
- Legacy data migration limited to last 24 months of records.

## 12. Risks & Mitigation
| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|-----------|
| Wearable API changes | Medium | Medium | Establish vendor SLAs, monitor API deprecation notices. |
| Adoption resistance by coaches | High | Medium | Provide training, champion program, gather feedback loops. |
| Data privacy breach | High | Low | Implement security audits, DPO oversight, incident response plan. |
| Manual payment errors | Medium | Medium | Add reconciliation workflows, dual approval, roadmap payment automation. |
| Scope creep | Medium | Medium | Enforce change control, maintain prioritized backlog. |

## 13. Benefits Analysis
- Revenue uplift via premium digital services and cross-sell opportunities.
- Reduced churn by offering data-backed coaching and community features.
- Operational efficiency through automation saving estimated 25 hours/week across staff.
- Enhanced brand perception and referral potential.

## 14. Implementation Considerations
- **Phasing:** Release 1 focuses on onboarding, scheduling, content delivery; Release 2 adds payment automation and deeper integrations.
- **Dependencies:** Identity provider selection, messaging vendor contracts, data warehouse readiness.
- **Training & Change Management:** Create e-learning modules, live webinars, and coach certification for platform usage.

## 15. Acceptance & Approval
- Business sponsors review BRD against strategic objectives.
- Sign-off required from Executive Sponsor, Head of Product, Head of Operations, and Compliance Officer.

