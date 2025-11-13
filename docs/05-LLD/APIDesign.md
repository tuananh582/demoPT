# API Design (Excerpt)

## 1. Identity & Onboarding
### POST /api/v1/auth/register
- **Body:** `{ "email": string, "password": string, "provider": "email" | "google" | "facebook" | "apple", "metadata": {} }`
- **Response:** `{ "accessToken", "refreshToken", "user": { "id", "roles" } }`
- **Notes:** MFA optional on registration; rate limited.

### POST /api/v1/onboarding/intake
- **Body:** `{ "goals": [], "preferences": {}, "healthFlags": [], "consentAccepted": true }`
- **Response:** `{ "profileId", "recommendedPrograms": [] }`
- **Errors:** `409` when consent missing; `422` invalid questionnaire version.

### GET /api/v1/customers/{id}/profile
- **Auth:** Customer or assigned coach/admin.
- **Response:** Demographics, goals, risk flags, coach assignments.

## 2. Catalog & Commerce
### GET /api/v1/catalog/products
- **Query:** `goal`, `duration`, `priceMin`, `priceMax`, `coachId`, `sort`
- **Response:** Paginated list with ratings, testimonials, comparison metadata.

### POST /api/v1/orders
- **Body:** `{ "productId", "addons": [], "promoCode": string }`
- **Flow:** Creates pending order + invoice; returns payment intent reference.

### POST /api/v1/orders/{id}/confirm
- **Body:** `{ "paymentMethodId", "saveMethod": boolean }`
- **Behaviour:** Captures payment (Release 2 automated), updates subscription, triggers notifications.

### POST /api/v1/subscriptions/{id}/change
- **Body:** `{ "action": "upgrade"|"downgrade"|"pause"|"cancel", "effectiveDate": date }`
- **Validations:** Checks proration rules, pause limits.

## 3. Training & Experience
### GET /api/v1/plans/today
- **Auth:** Customer
- **Response:** Daily schedule with workouts, meals, habits, completion states, media URLs.

### PATCH /api/v1/plans/{planId}/items/{itemId}
- **Body:** `{ "status": "completed"|"skipped", "substitutionId"?, "feedback": string, "metrics": {} }`
- **Side Effects:** Emits `PlanItemCompleted` event, updates streaks/badges.

### POST /api/v1/plans/{planId}/substitutions
- **Body:** `{ "itemId", "alternativeId", "reason" }`
- **Response:** Updated plan item details.

## 4. Scheduling
### GET /api/v1/sessions
- **Query:** `start`, `end`, `timezone`, `role`, `status`
- **Response:** Aggregated calendar entries with join links and attendance state.

### POST /api/v1/sessions
- **Body:** `{ "type", "startTime", "endTime", "timezone", "coachId", "location", "joinLink"?, "capacity", "participants": [] }`
- **Validations:** Conflict detection, capacity limit, membership entitlements.

### POST /api/v1/sessions/{id}/waitlist
- **Body:** `{ "customerId" }`
- **Response:** Waitlist position, estimated confirmation window.

### PATCH /api/v1/sessions/{id}
- **Body:** `{ "status", "newTime"?, "cancellationReason"? }`
- **Behaviour:** Updates calendar, reissues notifications, handles refunds if necessary.

## 5. Communication & Community
### GET /api/v1/threads
- **Query:** `context`, `participantId`, `page`, `pageSize`
- **Response:** Threads with last message preview, unread counts.

### POST /api/v1/messages
- **Body:** `{ "threadId"?, "recipientId", "body", "attachments": [] }`
- **Processing:** Virus scan attachments, push notifications, store read receipts.

### GET /api/v1/community/posts
- **Query:** `communityId`, `sort`, `filter`
- **Response:** Posts with reactions summary, moderation flags.

### POST /api/v1/support/tickets
- **Body:** `{ "subject", "description", "priority", "attachments": [] }`
- **Response:** Ticket id, SLA deadline, assigned agent (if auto-assigned).

## 6. Analytics & Reporting
### GET /api/v1/analytics/progress
- **Query:** `customerId`, `metrics[]`, `range`
- **Response:** Time series, trendlines, forecast data.

### GET /api/v1/analytics/cohorts
- **Query:** `dimension`, `metric`, `interval`
- **Response:** Aggregated cohort performance with drilldown tokens.

### GET /api/v1/reports/finance
- **Role:** Admin only.
- **Response:** Revenue breakdown, refunds, outstanding invoices, export links.

## 7. Automation & Integrations
### POST /api/v1/automations
- **Body:** `{ "name", "trigger", "conditions", "actions", "status" }`
- **Response:** Automation id, simulation preview results.

### POST /api/v1/automations/{id}/simulate
- **Body:** `{ "sampleSize" }`
- **Response:** Impact summary, affected entities.

### POST /api/v1/integrations/wearables/webhook
- **Auth:** Provider signature validation.
- **Body:** Provider-specific payload normalized to metrics.
- **Response:** `202 Accepted` once queued.

### POST /api/v1/integrations/api-keys
- **Role:** Admin.
- **Body:** `{ "name", "rateLimit", "scopes" }`
- **Response:** API key (one-time display).

## 8. Observability & Audit
### GET /api/v1/audit-logs
- **Query:** `actorId`, `resourceType`, `dateRange`
- **Response:** Paginated log entries with metadata.

### GET /api/v1/health
- **Response:** Status of critical dependencies, version info.

