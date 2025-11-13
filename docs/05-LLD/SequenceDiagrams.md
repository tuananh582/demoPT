# Sequence Diagrams (Textual / PlantUML)

## 1. Customer Onboarding & Intake
```plantuml
@startuml
actor Guest
participant "Web App" as UI
participant "Identity Service" as ID
participant "Onboarding Service" as ONB
participant "PostgreSQL" as DB
participant "Notification Service" as NOTIF

Guest -> UI: Start sign-up
UI -> ID: POST /register (credentials/social token)
ID -> ID: Validate + create user
ID --> UI: Auth token
UI -> ONB: POST /intake (profile, goals)
ONB -> DB: Insert customer profile & intake responses
ONB -> NOTIF: Publish event CustomerOnboarded
NOTIF -> Guest: Send welcome email/SMS
UI <-- ONB: Intake summary + next steps
@enduml
```

## 2. Membership Purchase (Manual Confirmation Release 1)
```plantuml
@startuml
actor Customer
participant "Web App" as UI
participant "Subscription Service" as SUB
participant "Billing Adapter" as BILL
participant "Payment Gateway" as PAY
participant "Admin Console" as ADMIN
participant "Notification Service" as NOTIF

Customer -> UI: Select plan + add-ons
UI -> SUB: POST /orders
SUB -> BILL: Create pending invoice
BILL -> PAY: Create payment intent (manual capture)
PAY --> BILL: Pending payment reference
BILL --> SUB: Pending invoice
SUB --> UI: Show awaiting confirmation
ADMIN -> SUB: Approve payment (manual)
SUB -> BILL: Capture payment
BILL -> PAY: Capture request
PAY --> BILL: Capture success
BILL -> SUB: Update invoice = paid
SUB -> DB: Activate subscription, entitlements
SUB -> NOTIF: Publish SubscriptionActivated
NOTIF -> Customer: Send receipt & welcome message
@enduml
```

## 3. Daily Plan Completion & Analytics Update
```plantuml
@startuml
actor Customer
participant "PWA" as PWA
participant "Training Service" as TRN
participant "Analytics Service" as ANL
participant "Event Bus" as BUS
participant "Coach Console" as COACH

Customer -> PWA: Mark workout completed
PWA -> TRN: PATCH /plans/{id}/items/{itemId}
TRN -> TRN: Update progress + streaks
TRN -> BUS: Emit PlanItemCompleted
BUS -> ANL: Consume event, update metrics
ANL -> COACH: Push dashboard refresh notification
TRN --> PWA: Return updated plan summary
PWA -> Customer: Display updated badges & analytics snapshot
@enduml
```

## 4. Session Booking & Reminder Workflow
```plantuml
@startuml
actor Customer
participant "Scheduler UI" as UI
participant "Scheduling Service" as SCHED
participant "Calendar Adapter" as CAL
participant "Notification Service" as NOTIF
participant "Coach" as Coach

Customer -> UI: Book session slot
UI -> SCHED: POST /sessions
SCHED -> SCHED: Validate availability & conflicts
SCHED -> CAL: Create calendar event (OAuth)
CAL --> SCHED: Event ID + join link
SCHED -> DB: Persist session + waitlist state
SCHED -> NOTIF: Emit SessionBooked
NOTIF -> Customer: Confirmation + reminders
NOTIF -> Coach: Session assigned notification
Coach -> Calendar: Accept invite (optional)
@enduml
```

## 5. Support Ticket Resolution Automation
```plantuml
@startuml
actor Customer
participant "Support Portal" as PORTAL
participant "Support Service" as SUP
participant "Automation Engine" as AUTO
participant "Admin/Agent" as AGENT
participant "Notification Service" as NOTIF

Customer -> PORTAL: Submit support ticket
PORTAL -> SUP: POST /tickets
SUP -> SUP: Prioritize via SLA rules
SUP -> AUTO: Trigger workflow (assign agent, set due date)
AUTO -> AGENT: Notify assignment
AGENT -> SUP: Update status/resolution notes
SUP -> NOTIF: Send resolution email + CSAT survey
NOTIF -> Customer: Resolution confirmation
@enduml
```

