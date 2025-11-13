# Acceptance Criteria Catalogue

## Epic ONB – Customer Onboarding & Accounts
- **AC-ONB-01:** Given a guest completes the registration form, when email or social login is verified, then the system must create a customer profile and redirect to intake questionnaire.
- **AC-ONB-02:** Given a customer fills the adaptive questionnaire, when a health risk flag is detected, then the system must surface recommended precautions and notify the assigned coach.
- **AC-ONB-03:** Given a customer schedules a discovery session, when time is confirmed, then calendar invites and reminders must be sent to customer and coach.
- **AC-ONB-04:** Customers can download their personal data and request deletion, and the system must confirm completion within 30 days.

## Epic SUB – Subscription & Commerce
- **AC-SUB-01:** When viewing the catalog, customers must be able to filter by goal, duration, price, and coach rating, with results updating instantly.
- **AC-SUB-02:** During checkout, promo codes must be validated in real time and order totals recalculated before confirmation.
- **AC-SUB-03:** After purchase, confirmation email and in-app receipt must include plan details, next billing date, and cancellation policy.
- **AC-SUB-04:** When a customer requests a plan change, the system must display proration details and require confirmation before applying the change.

## Epic TRN – Training Experience
- **AC-TRN-01:** The daily plan must display workouts, nutrition tasks, and habits with completion toggles and progress bar updates in real time.
- **AC-TRN-02:** Video workouts must stream at adaptive bitrates and provide captions and downloadable transcripts.
- **AC-TRN-03:** Customers can substitute exercises; when a substitute is chosen, updated instructions must appear instantly with coach notified asynchronously.
- **AC-TRN-04:** Habit streaks and badges must update immediately after completion and display on the profile dashboard.
- **AC-TRN-05:** Offline PDF export must include the latest plan metadata and QR codes linking to videos.

## Epic SCH – Scheduling & Sessions
- **AC-SCH-01:** Calendar views (day/week/month) must persist user-selected timezone and layout preferences across sessions.
- **AC-SCH-02:** Booking must prevent conflicts by validating coach availability and customer limits before confirmation.
- **AC-SCH-03:** Waitlisted customers must receive notifications and auto-confirmation options when a slot opens.
- **AC-SCH-04:** Rescheduling must update all affected parties, regenerate meeting links, and adjust reminders within 2 minutes.
- **AC-SCH-05:** Attendance status changes must sync to coach dashboards and analytics within 60 seconds.

## Epic COM – Communication & Community
- **AC-COM-01:** Messaging threads must support attachments up to 25MB with virus scanning before delivery.
- **AC-COM-02:** Read receipts must update once the recipient opens the message and be visible to both parties.
- **AC-COM-03:** Push/email/SMS announcements must record delivery status and failures for admin review.
- **AC-COM-04:** Community posts must support reactions, threaded comments, and moderation actions (approve, hide, ban user).
- **AC-COM-05:** Challenge leaderboards must update at least every 15 minutes during active events.
- **AC-COM-06:** Live stream sessions must support 500 concurrent viewers with <3 second latency.
- **AC-COM-07:** Support tickets must automatically assign priority based on SLA rules and escalate overdue items to operations leads.

## Epic ANL – Analytics & Insights
- **AC-ANL-01:** Progress dashboards must allow comparison between actual and target metrics with configurable time ranges.
- **AC-ANL-02:** Downloaded reports must match on-screen data and include timestamp, filters, and author details.
- **AC-ANL-03:** Cohort analytics must segment by membership type, coach, and engagement level, rendering within 5 seconds for 100k records.
- **AC-ANL-04:** Predictive trendlines must expose confidence intervals and allow export to CSV/PNG.

## Epic PAY – Payment Automation
- **AC-PAY-01:** Payment gateway must tokenize card/bank details and store only tokens in platform database.
- **AC-PAY-02:** Recurring invoices must retry failed payments three times before flagging for manual review.
- **AC-PAY-03:** Refund actions must require dual approval for transactions >$200 equivalent.
- **AC-PAY-04:** Financial reports must reconcile orders, refunds, and adjustments with audit trail.

## Epic AUT – Workflow Automation
- **AC-AUT-01:** Admins must be able to create automations using triggers, conditions, and actions with visual builder.
- **AC-AUT-02:** Automations must provide simulation mode to preview affected records before activation.
- **AC-AUT-03:** Execution logs must record trigger time, affected entities, and outcomes with retry mechanisms.

## Epic WEA – Wearable Integration
- **AC-WEA-01:** Customers must grant explicit consent before wearable data sync begins, with option to revoke anytime.
- **AC-WEA-02:** Synced metrics must show source attribution and last sync timestamp on dashboards.
- **AC-WEA-03:** Data ingestion failures must alert support with diagnostic context within 10 minutes.

## Epic INT – Partner Integrations
- **AC-INT-01:** Developers must obtain API keys via self-service portal with rate limit policies communicated.
- **AC-INT-02:** API documentation must include OpenAPI specs, code samples, and test data.
- **AC-INT-03:** Sandbox activity must be isolated from production and resettable on demand.

## Epic AI – Recommendations & Intelligence
- **AC-AI-01:** Recommendation engine must present explainable factors (e.g., goals, past adherence) for each suggestion.
- **AC-AI-02:** Customers must be able to dismiss recommendations and improve future personalization via feedback prompts.

