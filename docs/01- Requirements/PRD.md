# Product Requirements Document (PRD)

## FitCampus – Student Fitness Portal

## 1. Document Control

| Version | Date       | Author       | Notes                                              |
| ------- | ---------- | ------------ | -------------------------------------------------- |
| 0.9     | 2025-11-13 | Product Team | Student-focused rewrite aligned with FitCampus BRD |

## 2. Product Summary

- **Vision:** Provide every student with a personalized digital gym companion that simplifies onboarding, keeps them motivated, and connects them with campus wellness resources.
- **Target Users:** Prospective students, active learners, wellness mentors, student success staff.
- **Value Proposition:** Adaptive onboarding, curated training plans, accessible scheduling, real-time progress feedback, and vibrant community challenges—all optimized for student life.

## 3. Personas

| Persona                        | Goals                                    | Pain Points                                   | Key Journeys                                               |
| ------------------------------ | ---------------------------------------- | --------------------------------------------- | ---------------------------------------------------------- |
| Huy – First-year Student       | Build healthy routine amidst course load | Overwhelmed by choices, unsure where to start | Sign-up, orientation quiz, daily plan, peer challenges     |
| Lan – Resident Advisor         | Encourage dorm participation             | Manual tracking, limited incentives           | Promote classes, track group progress, share announcements |
| Minh – Student Wellness Mentor | Coach peers, monitor wellbeing           | No consolidated dashboard, hard to follow up  | Review cohorts, send nudges, adjust content                |

## 4. User Journey Highlights

1. **Discover & Commit:** Visitor sees orientation microsite, completes readiness quiz, selects starter path, and books intro class.
2. **Activate & Learn:** Learner confirms membership, unlocks personalized plan, adds workouts and study-friendly wellness tips to schedule.
3. **Engage & Progress:** Daily dashboard surfaces workouts, nutrition, mindfulness; streaks and badges reward consistency; wearables sync automatically.
4. **Connect & Thrive:** Learner joins peer groups, participates in dorm challenges, seeks support via chat, reviews progress reports with mentor.

## 5. Feature Requirements (Release Breakdown)

### Release 1 – Activation (Quarter 1)

- Guided onboarding wizard with readiness quiz and consent capture.
- Membership catalog with student pricing, manual payment confirmation.
- Training dashboard combining workouts, micro-lessons, and habit tracker.
- Unified scheduling for classes, workshops, and mentoring sessions.
- Peer and mentor messaging with attachment support.
- Learner progress dashboards with exports and advisor notes.

### Release 2 – Engagement (Quarter 2)

- Automated payments with recurring billing and perk tracking.
- Community hubs with forums, dorm challenges, and live streams.
- Wearable data sync MVP (Apple Health, Google Fit, Garmin).
- Gamification engine with quests, XP, and reward store.
- Support center with self-help guides and SLA-based ticket routing.

### Release 3 – Intelligence (Quarter 3)

- Recommendation engine for workouts, classes, and wellness articles.
- AI-powered nudges detecting dropout risk.
- Partner API for student clubs and external wellness partners.
- Advanced cohort analytics with retention and wellbeing indices.

## 6. Detailed Requirement Matrix

| ID          | Title                     | Description                                                | Acceptance Criteria Reference | Priority | Release |
| ----------- | ------------------------- | ---------------------------------------------------------- | ----------------------------- | -------- | ------- |
| PRD-LRN-01  | Adaptive onboarding       | Quiz adapts by goal and readiness, collecting consents.    | AC-LRN-01..03                 | Must     | R1      |
| PRD-MEM-01  | Membership catalog        | Student-centric catalog, promo codes, manual confirmation. | AC-MEM-01..04                 | Must     | R1      |
| PRD-PLAN-01 | Training dashboard        | Daily plan with workouts, lessons, habits, streaks.        | AC-PLAN-01..05                | Must     | R1      |
| PRD-SCH-01  | Smart scheduling          | Booking, waitlist, reminders, attendance sync.             | AC-SCH-01..05                 | Must     | R1      |
| PRD-COM-01  | Messaging & announcements | Peer messaging, read receipts, broadcasts.                 | AC-COM-01..04                 | Should   | R1      |
| PRD-PROG-01 | Learner analytics         | Dashboards, exports, trendlines.                           | AC-PROG-01..04                | Must     | R1      |
| PRD-MEM-02  | Automated billing         | Gateway integration, renewals, refunds.                    | AC-MEM-02..04                 | Must     | R2      |
| PRD-COM-02  | Community hub             | Challenges, leaderboards, moderation, live streams.        | AC-COM-04..06                 | Should   | R2      |
| PRD-EXP-01  | Gamification engine       | Quests, XP accrual, perk store.                            | AC-PLAN-04, AC-EXP-03         | Should   | R2      |
| PRD-WELL-01 | Wearable sync             | Consent-driven data ingestion and display.                 | AC-WELL-01..03                | Could    | R2      |
| PRD-EXP-02  | Recommendation engine     | Explainable recommendations with feedback loop.            | AC-EXP-01..02                 | Could    | R3      |
| PRD-API-01  | Partner API portal        | API keys, rate limits, sandbox.                            | AC-COM-03, AC-WELL-03         | Could    | R3      |

## 7. User Experience & Design Principles

- Mobile-first PWA with offline caching for daily plans and certificates.
- Visual identity matches campus brand; inclusive imagery representing diverse student body.
- Accessibility-first (WCAG 2.1 AA) with focus on cognitive load reduction and dyslexia-friendly typography options.
- Modular design system with learner widgets (streak card, challenge carousel, wellbeing alerts).

## 8. Analytics & Telemetry

- Track funnel: orientation microsite → quiz completion → account creation → membership activation.
- Engagement metrics: weekly active learners, streak retention, class attendance, wearable sync rate.
- Wellness indicators: self-reported energy/stress, advisor interventions, goal completion.
- Feedback & surveys: quick pulse polls after sessions and after 30-day usage.

## 9. Operational Readiness

- Define support SLAs: chat response ≤ 10 minutes during staffed hours, tickets resolved ≤ 24 hours.
- Provide mentor playbooks, student tutorial videos, and onboarding webinars.
- Establish incident response matrix with student affairs escalation paths.

## 10. Go-To-Market & Launch Plan

- Beta with 200 volunteer students across faculties and 20 wellness mentors.
- Ambassador program with dorm leaders promoting via social channels and events.
- Launch kit: orientation week booths, QR codes, integration with student portal announcements.
- Post-launch survey at week 4 and week 12 to capture sentiment and feature requests.

## 11. Open Questions & Follow-Ups

- Confirm primary payment gateway (Stripe vs. local banking integration) supporting student discounts.
- Align with counseling center on thresholds for wellness alerts and escalation protocols.
- Decide on integration timeline with learning management system (if wellness modules earn credits).
