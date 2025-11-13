# Acceptance Criteria Catalogue – Student Fitness Portal

## Epic LRN – Learner Onboarding & Orientation

- **AC-LRN-01:** Given a visitor fills out the student sign-up form, when email or social account is verified, then the portal SHALL create a learner profile and guide them to the orientation checklist.
- **AC-LRN-02:** Given a learner completes the fitness-readiness quiz, when any high-risk answer is detected, then the portal SHALL display safety guidance and collect acknowledgement before access continues.
- **AC-LRN-03:** Given a learner requests a campus gym tour or intro call, when a slot is confirmed, then the portal SHALL send confirmations, reminders, and add the event to the learner calendar.
- **AC-LRN-04:** Learners SHALL be able to download their personal data and request deletion, and the portal SHALL confirm completion within 30 days.

## Epic MEM – Membership & Perks

- **AC-MEM-01:** When browsing available memberships, learners SHALL filter by goal, session count, price, and facility, with instant result updates.
- **AC-MEM-02:** During checkout, promo codes SHALL be validated in real time and totals recalculated before the learner confirms.
- **AC-MEM-03:** After payment, confirmation email and in-app receipt SHALL display plan details, next renewal date, and cancellation steps.
- **AC-MEM-04:** When a learner changes membership, the portal SHALL show proration impacts and require explicit confirmation before applying changes.

## Epic PLAN – Training Plan & Content

- **AC-PLAN-01:** The daily dashboard SHALL show workouts, learning modules, nutrition tasks, and wellness tips with completion toggles updating progress instantly.
- **AC-PLAN-02:** Workout videos SHALL stream at adaptive bitrates with captions and downloadable transcripts for accessibility.
- **AC-PLAN-03:** Learners SHALL substitute exercises; when a substitute is chosen, updated instructions SHALL appear immediately and sync across devices.
- **AC-PLAN-04:** Habit streaks, badges, and XP points SHALL update instantly after completion and display on learner profile.
- **AC-PLAN-05:** Offline PDF exports SHALL include the most recent plan metadata plus QR codes linking to video resources.

## Epic SCH – Class & Session Scheduling

- **AC-SCH-01:** Calendar views (day/week/month) SHALL remember learner timezone and layout preferences across sessions.
- **AC-SCH-02:** Booking SHALL prevent conflicts by validating seat availability, prerequisite completion, and learner limits before confirmation.
- **AC-SCH-03:** Waitlisted learners SHALL receive notifications and one-tap confirmation options when a spot opens.
- **AC-SCH-04:** Rescheduling SHALL notify all peers involved, regenerate meeting links, and adjust reminders within 2 minutes.
- **AC-SCH-05:** Attendance updates SHALL sync to progress dashboards and unlock modules within 60 seconds.

## Epic PROG – Progress & Analytics

- **AC-PROG-01:** Progress dashboards SHALL compare actual vs. target metrics with configurable ranges (daily/weekly/monthly).
- **AC-PROG-02:** Downloaded progress reports SHALL match on-screen data and include timestamp, filters, and advisor notes.
- **AC-PROG-03:** Cohort comparisons SHALL segment by goal path, dorm/facility, and engagement tier, rendering within 5 seconds for 100k records.
- **AC-PROG-04:** Personalized trendlines SHALL present confidence intervals and export options (CSV/PNG).

## Epic COM – Community & Support

- **AC-COM-01:** Peer messaging threads SHALL support attachments up to 25MB with virus scanning before delivery.
- **AC-COM-02:** Read receipts SHALL update once a recipient opens a message and be visible to both parties.
- **AC-COM-03:** Announcements (push/email/SMS) SHALL log delivery status and failures for student services review.
- **AC-COM-04:** Community posts SHALL allow reactions, threaded comments, and moderation (report, hide, suspend user).
- **AC-COM-05:** Challenge leaderboards SHALL refresh at least every 15 minutes during active events.
- **AC-COM-06:** Live streams SHALL support 500 concurrent learners with latency under 3 seconds.
- **AC-COM-07:** Support tickets SHALL auto-prioritize by SLA rules and escalate overdue cases to student success leads.

## Epic WELL – Wellness & Wearables

- **AC-WELL-01:** Learners SHALL grant explicit consent before wearable sync begins, with an always-on revoke option.
- **AC-WELL-02:** Synced metrics SHALL show device source and last-sync timestamp on dashboards.
- **AC-WELL-03:** Sync failures SHALL alert support with diagnostic context within 10 minutes.

## Epic EXP – Experience & Personalization

- **AC-EXP-01:** Recommendation tiles SHALL list top reasons (e.g., goal match, streak pattern) for each suggested workout or module.
- **AC-EXP-02:** Learners SHALL dismiss recommendations and provide feedback that tunes future suggestions.
- **AC-EXP-03:** Gamified quests SHALL unlock only after prerequisites are met and reward XP, badge, or perk credits upon completion.
