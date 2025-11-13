# API Design (Excerpt) – FitCampus Student Portal

## 1. Onboarding & Orientation
### POST /api/v1/learners/register
- **Body:** `{ "email": string, "password": string, "provider": "email"|"sso"|"google"|"facebook", "profile": { "firstName", "lastName", "studentId"? } }`
- **Response:** `{ "accessToken", "refreshToken", "learner": { "id", "roles": ["LEARNER"], "orientationStatus" } }`
- **Notes:** Supports campus SSO redirect; throttled 5 req/min.

### POST /api/v1/learners/orientation
- **Body:** `{ "readinessAnswers": [], "consents": [{ "code", "granted": boolean }], "preferredGoal": string }`
- **Response:** `{ "orientationChecklist": [...], "recommendedPath": string }`
- **Errors:** `422` khi thiếu consent; `409` nếu checklist khóa do mentor.

### POST /api/v1/learners/orientation/sessions
- **Body:** `{ "slotId": string }`
- **Response:** `{ "reservationId", "startTime", "calendarLinks": { "google", "outlook" } }`

## 2. Membership & Billing
### GET /api/v1/memberships
- **Query:** `goal`, `facility`, `priceMin`, `priceMax`, `durationWeeks`, `sort`
- **Response:** Paginated plans với perks, testimonial học viên, badge yêu cầu.

### POST /api/v1/memberships/orders
- **Body:** `{ "membershipId", "perks": [], "promoCode"?, "paymentMethodId"? }`
- **Response:** `{ "orderId", "status", "paymentIntent" }`

### POST /api/v1/memberships/orders/{orderId}/confirm
- **Body:** `{ "paymentMethodId", "saveMethod": boolean }`
- **Behaviour:** Tạo subscription, gửi receipt, phát sự kiện `MembershipActivated`.

### PATCH /api/v1/memberships/{id}
- **Body:** `{ "action": "upgrade"|"downgrade"|"pause"|"resume"|"cancel", "effectiveDate" }`
- **Validations:** Kiểm tra giới hạn pause (≤30 ngày, max 2 lần/năm học), tính toán proration.

## 3. Training Hub & Daily Plan
### GET /api/v1/dashboard/today
- **Auth:** Learner
- **Response:** `{ "date", "timezone", "items": [{ "id", "type": "WORKOUT"|"LESSON"|"HABIT"|"TIP", "title", "media", "status", "xp" }] }`

### PATCH /api/v1/dashboard/items/{itemId}
- **Body:** `{ "status": "completed"|"skipped", "feedback"?, "metrics"?: { "reps"?, "duration"?, "intensity"? } }`
- **Side Effects:** Emits `PlanItemCompleted`, cập nhật streak + XP.

### POST /api/v1/dashboard/items/{itemId}/substitution
- **Body:** `{ "alternativeId", "reason": string }`
- **Response:** Cập nhật item với media và hướng dẫn mới.

## 4. Scheduling & Sessions
### GET /api/v1/sessions
- **Query:** `start`, `end`, `timezone`, `goal`, `location`, `status`
- **Response:** Sessions hiển thị capacity, waitlist state, yêu cầu prerequisite.

### POST /api/v1/sessions/{id}/book
- **Body:** `{ "learnerId"?, "notes"? }`
- **Behaviour:** Xác nhận chỗ, gửi notification, log attendance placeholder.

### POST /api/v1/sessions/{id}/waitlist
- **Body:** `{ "learnerId" }`
- **Response:** `{ "position", "expiresAt", "autoConfirm": boolean }`

### PATCH /api/v1/sessions/{id}
- **Body:** `{ "status": "confirmed"|"cancelled"|"completed", "newTime"?, "reason"? }`
- **Side Effects:** Resend invites, xử lý hoàn tiền (nếu cần), cập nhật leaderboard.

## 5. Community, Messaging & Support
### GET /api/v1/messages/threads
- **Query:** `context`, `participantId`, `page`, `pageSize`
- **Response:** Threads với unread count, thông tin mentor/peer.

### POST /api/v1/messages
- **Body:** `{ "threadId"?, "recipientId"?, "groupId"?, "body", "attachments": [{ "url", "type" }] }`
- **Processing:** Quét virus, lưu read receipt, broadcast qua WebSocket.

### GET /api/v1/challenges
- **Query:** `status`, `goal`, `dorm`
- **Response:** Danh sách challenge với quy tắc, phần thưởng, leaderboard snapshot.

### POST /api/v1/challenges/{id}/join
- **Body:** `{ "teamId"?, "consent": boolean }`
- **Response:** `{ "enrollmentId", "xpReward" }`

### POST /api/v1/support/tickets
- **Body:** `{ "subject", "description", "priority", "category", "attachments": [] }`
- **Response:** `{ "ticketId", "slaDueAt", "assignedTo"? }`

## 6. Progress & Analytics
### GET /api/v1/progress/metrics
- **Query:** `range`, `metrics[]`, `cohort`?
- **Response:** `{ "series": [{ "metric", "data": [{ "timestamp", "value", "target"?, "source" }] }], "cohortBenchmark" }`

### GET /api/v1/progress/reports
- **Query:** `format=pdf|csv`, `range`, `includeAdvisorNotes`
- **Response:** Download link; metadata: filters, generatedAt, preparedBy.

### GET /api/v1/cohorts/at-risk
- **Auth:** Mentor/Admin
- **Response:** `{ "learners": [{ "id", "riskScore", "drivers": [], "recommendedActions": [] }] }`

## 7. Gamification & Integrations
### GET /api/v1/xp/summary
- **Auth:** Learner
- **Response:** `{ "currentXP", "level", "streakDays", "badges": [] }`

### POST /api/v1/quests/{id}/complete
- **Body:** `{ "evidence"?: { "type", "url" }, "notes"? }`
- **Behaviour:** Validate prerequisites, grant rewards, log audit.

### POST /api/v1/integrations/wearables/webhook
- **Auth:** HMAC signature header
- **Body:** `{ "learnerId", "metrics": [{ "type", "value", "unit", "timestamp" }] }`
- **Response:** `202 Accepted` sau khi enqueue xử lý.

### POST /api/v1/integrations/api-keys
- **Role:** Wellness Admin
- **Body:** `{ "name", "rateLimit", "scopes": ["sessions:read", "challenges:read"], "expiresAt"? }`
- **Response:** `{ "apiKey" }` hiển thị một lần.

## 8. Observability & Health
### GET /api/v1/health
- **Response:** `{ "status": "ok", "services": { "database": "ok", "cache": "ok", "queue": "ok" } }`

### GET /api/v1/audit-logs
- **Query:** `actorId`, `resourceType`, `action`, `range`
- **Response:** Trang kết quả 50 bản ghi/trang, hỗ trợ sort, export CSV.

---
**Standards:**
- JSON:API style responses, `status` + `message` envelope for errors.
- Pagination: cursor-based (`nextCursor`).
- Idempotency: `Idempotency-Key` header cho POST/patch quan trọng.
- Localization: `Accept-Language` header (vi-VN default, en-US optional).

