# Sequence Diagrams – FitCampus Student Portal

## 1. Learner Onboarding & Orientation
```plantuml
@startuml
actor Visitor as Visitor
participant "PWA" as UI
participant "Identity Service" as ID
participant "Onboarding Service" as ONB
participant "Consent Store" as CONSENT
participant "Notification Service" as NOTIF

Visitor -> UI: Start sign-up
UI -> ID: POST /learners/register (credentials/SSO token)
ID -> ID: Validate + create learner user
ID --> UI: Access tokens + learner id
UI -> ONB: POST /learners/orientation (quiz + consent)
ONB -> CONSENT: Persist consent artifacts
ONB --> UI: Orientation checklist + recommended path
ONB -> NOTIF: Emit LearnerOnboarded event
NOTIF -> Visitor: Send welcome email/SMS
@enduml
```

## 2. Membership Activation with Student Pricing
```plantuml
@startuml
actor Learner
participant "PWA" as UI
participant "Membership Service" as MEM
participant "Billing Adapter" as BILL
participant "Payment Gateway" as PAY
participant "Notification Service" as NOTIF

Learner -> UI: Select membership + perks
UI -> MEM: POST /memberships/orders
MEM -> BILL: Create payment intent (student pricing)
BILL -> PAY: Create payment intent
PAY --> BILL: Pending reference
BILL --> MEM: Order pending confirmation
UI <-- MEM: Show checkout confirmation
Learner -> UI: Confirm payment method
UI -> MEM: POST /memberships/orders/{id}/confirm
MEM -> BILL: Capture payment
BILL -> PAY: Capture request
PAY --> BILL: Capture success
BILL -> MEM: Update order status = paid
MEM -> DB: Activate subscription + perks
MEM -> NOTIF: Publish MembershipActivated
NOTIF -> Learner: Send receipt + next steps
@enduml
```

## 3. Daily Plan Completion & XP Award
```plantuml
@startuml
actor Learner
participant "PWA" as PWA
participant "Training Hub" as PLAN
participant "Gamification" as XP
participant "Analytics" as ANL
participant "Mentor Console" as MENTOR

Learner -> PWA: Mark plan item completed
PWA -> PLAN: PATCH /dashboard/items/{id}
PLAN -> PLAN: Update plan entry status
PLAN -> XP: Award XP/Streak/Badges
XP --> PLAN: Updated gamification summary
PLAN -> EventBus: Publish PlanItemCompleted
EventBus -> ANL: Update progress metrics & risk score
ANL -> MENTOR: Push at-risk notification (if triggered)
PLAN --> PWA: Return updated dashboard state
PWA -> Learner: Refresh progress + XP widgets
@enduml
```

## 4. Session Booking & Waitlist Promotion
```plantuml
@startuml
actor Learner
participant "Scheduler UI" as UI
participant "Scheduling Service" as SCHED
participant "Calendar Adapter" as CAL
participant "Notification Service" as NOTIF
actor Mentor

Learner -> UI: Browse class timetable
UI -> SCHED: GET /sessions (filters)
Learner -> UI: Book session slot
UI -> SCHED: POST /sessions/{id}/book
SCHED -> SCHED: Validate conflicts, capacity, prerequisites
SCHED -> CAL: Create calendar event via OAuth
CAL --> SCHED: Event details + join link
SCHED -> DB: Persist booking
SCHED -> NOTIF: Emit SessionBooked
NOTIF -> Learner: Confirmation + reminders
NOTIF -> Mentor: New attendee notice
...
Waitlist Scenario:
Learner -> UI: Join waitlist
UI -> SCHED: POST /sessions/{id}/waitlist
SCHED -> DB: Save waitlist position
Later: SCHED -> NOTIF: Notify waitlist promotion
Learner -> UI: One-click confirm spot
@enduml
```

## 5. Support Ticket & Escalation Workflow
```plantuml
@startuml
actor Learner
participant "Support Portal" as PORTAL
participant "Support Service" as SUP
participant "Automation Engine" as AUTO
participant "Student Success Agent" as AGENT
participant "Notification Service" as NOTIF

Learner -> PORTAL: Submit support request
PORTAL -> SUP: POST /support/tickets
SUP -> SUP: Prioritize via SLA & category rules
SUP -> AUTO: Trigger workflow (assign agent / send acknowledgment)
AUTO -> AGENT: Notify assignment queue
AGENT -> SUP: Update ticket status, add resolution notes
SUP -> NOTIF: Send resolution + CSAT survey
NOTIF -> Learner: Delivery of response & feedback form
@enduml
```

