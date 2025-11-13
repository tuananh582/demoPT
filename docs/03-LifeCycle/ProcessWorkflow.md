# Process & Workflow Model (BPMN 2.0)

```plantuml
@startuml
!pragma useVerticalIf on
!include <bpmn>

' Pools
POOL "Customer" as Customer {
  START_EVENT(start_cus, "Start")
  TASK(task_signup, "Complete Onboarding")
  EXCLUSIVE_GATEWAY(gw_membership, "Membership?" )
  TASK(task_select_plan, "Select Plan")
  TASK(task_book_session, "Book Session")
  TASK(task_follow_plan, "Follow Daily Plan")
  END_EVENT(end_cus, "Goal Achieved")
}

POOL "Coach" as Coach {
  START_EVENT(start_coach, "Assigned")
  TASK(task_review_intake, "Review Intake")
  TASK(task_customize_plan, "Customize Program")
  TASK(task_conduct_session, "Conduct Session")
  TASK(task_monitor_progress, "Monitor Progress")
  END_EVENT(end_coach, "Customer Succeeds")
}

POOL "Admin" as Admin {
  START_EVENT(start_admin, "Customer Joins")
  TASK(task_verify_payment, "Verify Payment")
  TASK(task_manage_catalog, "Manage Catalog")
  TASK(task_handle_support, "Handle Support Ticket")
  END_EVENT(end_admin, "Ops Stable")
}

' Flows Customer
start_cus --> task_signup --> gw_membership
(gw_membership) --> task_select_plan : yes
(gw_membership) --> task_book_session : trial
(task_select_plan) --> task_book_session --> task_follow_plan --> end_cus

' Coach collaboration
start_coach --> task_review_intake --> task_customize_plan --> task_conduct_session --> task_monitor_progress --> end_coach

' Message flows
TASK(task_signup) ..> TASK(task_review_intake) : "Send intake"
TASK(task_select_plan) ..> TASK(task_verify_payment) : "Purchase details"
TASK(task_book_session) ..> TASK(task_conduct_session) : "Session booking"
TASK(task_follow_plan) ..> TASK(task_monitor_progress) : "Completion data"
TASK(task_monitor_progress) ..> TASK(task_follow_plan) : "Feedback"
TASK(task_handle_support) ..> TASK(task_follow_plan) : "Resolved guidance"
TASK(task_follow_plan) ..> TASK(task_handle_support) : "Support request"

' Admin flow
start_admin --> task_verify_payment --> task_manage_catalog --> task_handle_support --> end_admin

@enduml
```

## Workflow Narrative
1. **Customer Pool:** Begins with onboarding, chooses membership path, books sessions, and follows daily plans until goals are met.
2. **Coach Pool:** Receives intake data, customizes programs, delivers sessions, and monitors progress to reinforce adherence.
3. **Admin Pool:** Confirms payments, curates catalog, and resolves escalated support issues to maintain operational stability.
4. **Collaboration:** Message flows represent information exchange between pools, aligning with BPMN 2.0 choreography semantics.
5. **Exception Handling:**
   - Payment verification failure triggers alternate admin subprocess for manual review.
   - Missed sessions loop customers back to booking with automated nudges from workflow engine.

## Alignment with BPMN 2.0 Elements
- **Pools & Lanes:** Distinguish organizational boundaries (Customer, Coach, Admin).
- **Events:** Start/End events mark process lifecycle.
- **Gateways:** Exclusive gateway determines whether customer goes to paid membership or trial session booking.
- **Tasks:** Atomic activities align with SRS functional requirements (onboarding, scheduling, coaching, support).
- **Message Flows:** Represent inter-pool communication (intake data, bookings, support interactions).

