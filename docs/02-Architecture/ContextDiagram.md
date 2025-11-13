# System Context Diagram (Textual)

## 1. External Actors
- **Guest/Customer:** Browses marketing site, registers, purchases memberships, books sessions, consumes content.
- **Coach:** Manages assigned customers, schedules, and communications.
- **Administrator/Operations:** Configures catalog, billing, automations, and support.
- **Payment Gateway (Stripe/MoMo):** Processes transactions and refunds.
- **Calendar Providers (Google, Microsoft):** Syncs sessions, sends invites.
- **Notification Services (SendGrid, Twilio, Push):** Delivers transactional and marketing messages.
- **Wearable Integrators:** Supplies biometric data when customers grant consent.
- **CRM/Marketing Automation:** Receives lifecycle events for campaigns.

## 2. Data Flows
1. Guests/customers interact with the web application → API gateway → Identity/Onboarding service → PostgreSQL.
2. Customers purchase memberships → Subscription service → Payment gateway → Billing adapter → ledger updates.
3. Coaches update plans and attendance → Training/Scheduling services → Analytics pipeline → dashboards.
4. Sessions created/updated → Calendar adapter → External calendar providers → invites and reminders.
5. Notifications triggered → Messaging service → Email/SMS/Push providers → delivery receipts.
6. Wearable data webhooks → Integration hub → Analytics service → customer dashboards.
7. Support tickets raised → Support/Automation services → Operations workflows → resolution updates.

## 3. ASCII Representation
```
          [Payment Gateway]
                 ^
                 |
[CRM/Marketing]  |    [Calendar Providers]
        ^        |           ^
        |        |           |
[Notification Services]   [Wearable Integrators]
        ^        |           |
        |        v           |
     [Messaging Service]   |
             \             |
              \            |
           [PT Platform Core] <---- [Customer/Guest]
             /   |    \
            /    |     \
        [Coach] [Admin] [Support Ops]
```

## 4. Context Notes
- PT Platform Core encompasses identity, subscription, training, scheduling, automation, analytics, and support modules.
- External services communicate via secure APIs (OAuth 2.0, webhooks) with monitoring and retry policies.
- Data residency and privacy constraints govern cross-border data flows, especially for wearable and payment information.

