# Business Requirements Document (BRD)
## FitCampus – Student Fitness Portal

## 1. Executive Summary
The FitCampus initiative delivers a holistic digital experience that empowers students to manage their fitness journey end-to-end. The portal centralizes orientation, membership, training content, scheduling, and social motivation in one learner-first interface. This BRD defines the business needs, scope, and success criteria for launching a modern student-facing platform that drives healthy habits, increases facility utilization, and elevates campus wellness outcomes.

## 2. Business Objectives & Success Metrics
| Objective | KPI / Target |
|-----------|--------------|
| Boost student onboarding to fitness programs | +40% new learner activations per semester |
| Increase recurring participation | ≥ 70% weekly active learners |
| Improve facility utilization | +25% average class fill rate |
| Drive engagement in wellness challenges | ≥ 60% learners joining at least one challenge per term |
| Elevate student satisfaction | NPS ≥ 65, CSAT ≥ 4.6/5 |

## 3. Background & Business Need
- Students juggle academics, part-time jobs, and social life; they need flexible, personalized fitness guidance available anytime.
- Current campus wellness touchpoints are fragmented (emails, posters, manual sign-up sheets), causing low conversion and abandoned goals.
- Student affairs seeks actionable insights on participation and wellness trends to tailor programming and justify investments.
- Competing universities offer mobile-first wellness apps; FitCampus must match or exceed digital expectations to stay competitive.

## 4. Stakeholder Analysis
| Stakeholder | Role | Needs |
|-------------|------|-------|
| Student Affairs Leadership | Sponsors, budget owners | Proof of wellness impact, adoption dashboards |
| Campus Wellness Team | Program coordinators | Simplified content publishing, attendance visibility |
| Student Success Coaches | Peer mentors | Real-time learner progress, nudge automations |
| IT & Data Services | Platform support | Secure architecture, integrations, analytics |
| Students (Learners) | Primary users | Quick onboarding, engaging content, transparent plans |
| Resident Advisors | Influencers | Group programming tools, challenge leaderboards |
| Marketing & Comms | Awareness | Campaign automation, conversion tracking |
| Compliance & Legal | Risk management | Consent, privacy, accessibility compliance |

## 5. Current State Assessment
- Club sign-ups rely on paper forms and manual spreadsheet tracking.
- Workout plans and nutrition tips scattered across PDFs and social channels.
- No unified calendar for classes or mentoring sessions; conflicts lead to no-shows.
- Limited feedback loops; wellness team relies on annual surveys with low response rates.

## 6. Future State Vision
- Learners join via mobile or web onboarding, complete readiness checks, and receive tailored plans instantly.
- Students manage memberships, book classes, and access multimedia lessons in one place.
- Progress analytics, wearables, and gamification maintain motivation and highlight at-risk learners.
- Communities, challenges, and peer messaging strengthen accountability and campus culture.

## 7. Business Scope
### 7.1 In Scope
- Student-facing portal with onboarding, memberships, training plans, scheduling, analytics, and community features.
- Advisor dashboards for monitoring cohorts, nudging learners, and curating content.
- Integrations with campus identity, payment gateway, notification services, and wearable aggregators.

### 7.2 Out of Scope
- Faculty/staff wellness programs (future expansion).
- Native mobile apps (planned for later phase).
- Physical access control hardware integrations.
- Meal plan billing reconciliation outside fitness memberships.

## 8. Business Requirements
| ID | Requirement | Description | Priority |
|----|-------------|-------------|----------|
| BR-01 | Student self-onboarding | Deliver guided registration, readiness quiz, and orientation journey without staff intervention. | Must |
| BR-02 | Personalized training hub | Provide multimedia workouts, nutrition lessons, and habit trackers tailored to learner goals. | Must |
| BR-03 | Smart scheduling | Offer unified calendar for classes, mentoring, and events with waitlists and reminders. | Must |
| BR-04 | Progress intelligence | Surface learner dashboards, cohort analytics, and proactive nudges to sustain engagement. | Must |
| BR-05 | Community motivation | Enable messaging, challenges, and campus-wide announcements to build accountability. | Should |
| BR-06 | Membership & perks | Manage student memberships, perks, upgrades, and cancellations with transparency. | Must |
| BR-07 | Gamification & rewards | Support streaks, badges, and quests that reinforce healthy routines. | Should |
| BR-08 | Privacy & wellbeing safeguards | Enforce consent, data protection, and wellness escalation protocols. | Must |
| BR-09 | Wearable & app integrations | Allow secure data sync from popular fitness apps to enrich insights. | Could |

## 9. Business Rules & Policies
- Students must acknowledge liability waivers and campus wellness policies before accessing workouts.
- Refund rules follow campus finance policy: full refund within 7 days, 50% within 21 days, thereafter only for documented medical reasons.
- Membership pauses limited to 2 per academic year, each up to 30 days.
- Learners under 18 require guardian approval for data sharing and communication features.
- Wellness alerts (injury, mental health risk) trigger escalation pathways to student services.

## 10. Assumptions
- Funding approved for phased rollout across academic year.
- Student ambassadors and resident advisors available to pilot test flows.
- Campus SSO provides OAuth/OIDC integration for single sign-on.

## 11. Constraints
- Must comply with GDPR, PDPA (Vietnam), FERPA-like guidelines for student records, and campus accessibility standards.
- Branding must align with university digital style guide (contrast, typography, mascot usage).
- Legacy student wellness data only available for import for the past 24 months.

## 12. Risks & Mitigation
| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|-----------|
| Low adoption due to awareness gaps | High | Medium | Launch ambassadors, integrate with orientation events |
| Integration delays with campus SSO | High | Low | Secure IT involvement early, stage sandbox testing |
| Data privacy incident | High | Low | Enforce security audits, DPO review, incident response drills |
| Content freshness | Medium | Medium | Establish content calendar, assign student creators |
| Wearable vendor changes | Medium | Medium | Use abstraction layer, monitor API updates |

## 13. Benefits Analysis
- Improves student wellbeing outcomes and retention through data-driven support.
- Streamlines operations for wellness team, saving ~20 hours/week on manual tasks.
- Enhances campus brand perception and recruitment via modern digital experience.
- Creates monetization opportunities through tiered memberships and partner perks.

## 14. Implementation Considerations
- **Phasing:** Release 1 emphasizes onboarding, memberships, training hub; Release 2 adds gamification, community, and wearables.
- **Dependencies:** Finalize integrations (SSO, payments, messaging), source multimedia content, onboard support staff.
- **Change Management:** Provide student tutorials, ambassador-led walkthroughs, and self-service knowledge base.

## 15. Acceptance & Approval
- Student Affairs leadership, Campus Wellness director, IT security officer, and Compliance officer provide sign-off.

