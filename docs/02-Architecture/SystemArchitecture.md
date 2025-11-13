# System Architecture – FitCampus Student Portal

## 1. Architectural Overview

FitCampus áp dụng kiến trúc dịch vụ mô-đun với Next.js PWA ở tầng trình bày và cụm dịch vụ backend NestJS. Trọng tâm là trải nghiệm học viên, cung cấp onboarding, kế hoạch tập luyện, đặt lịch, cộng đồng và phân tích theo thời gian thực.

Thành phần chính:

- **Learner Experience Layer:** PWA responsive hỗ trợ offline cache cho bảng điều khiển hằng ngày.
- **Mentor & Wellness Consoles:** Workspace chia sẻ design system, truy cập dựa trên vai trò.
- **API Gateway & BFF:** Façade GraphQL/REST điều phối, quản lý rate limit, auth PKCE.
- **Domain Services:** Onboarding, Membership, Training Hub, Scheduling, Gamification, Communication, Analytics, Mentor Toolkit.
- **Data Platform:** PostgreSQL (OLTP), Redis cache, Object Storage (media), Event Bus (Kafka/RabbitMQ), Analytics Warehouse (BigQuery/Snowflake).
- **Integration Hub:** Kết nối SSO, thanh toán, thông báo, wearable, LMS (TBD).

## 2. Component Diagram (Textual)

```
[PWA Learner] ---
                \
[Mentor Console] ----> [Edge CDN] ---> [API Gateway / BFF]
[Admin Console] ---/                       |
                                          v
                                   [Auth & Identity]
                                          |
          +----------------------+--------+--------+----------------+
          |                      |                 |                |
   [Onboarding Service]   [Membership Service] [Training Hub] [Scheduling Service]
          |                      |                 |                |
          v                      v                 v                v
  [Orientation Engine]   [Billing Adapter]   [Content Store]   [Calendar Adapter]
                                |                                |
                          [Payment Gateway]                  [Google/M365]

      [Gamification Service] --> [XP/Badge Store]
      [Communication Service] --> [Notification Providers]
      [Analytics Service] --> [Event Stream] --> [Analytics Warehouse]
      [Mentor Toolkit Service] --> [Cohort Insights]

Shared Infra: [PostgreSQL] [Redis Cluster] [Object Storage/CDN] [Event Bus] [Observability Stack]
```

## 3. Layered Architecture

- **Presentation:** Next.js PWA, mentor/admin consoles, component library với theme học viên.
- **API/BFF:** GraphQL gateway + REST endpoints, policy engine (OPA) cho RBAC/ABAC.
- **Domain:** Services cho LRN, MEM, PLAN, SCH, PROG, COM, EXP, OPS, INT; giao tiếp qua events.
- **Infrastructure:** Kubernetes, IaC (Terraform), observability (Prometheus, Grafana, OpenTelemetry).

## 4. Data Architecture

- **Operational Store:** PostgreSQL phân tách schema theo bounded context (learner, membership, training, engagement).
- **Event Streaming:** Domain events (`LearnerOnboarded`, `PlanItemCompleted`, `ChallengeLeaderboardUpdated`).
- **Analytics Pipeline:** CDC tới warehouse, cung cấp dashboard KPI và mô hình dự báo.
- **Media Delivery:** Video/tài liệu qua CDN với URL ký hạn.

## 5. Integration Architecture

- **SSO:** OAuth/OIDC với campus identity.
- **Payments:** Stripe/MoMo thông qua billing adapter, hỗ trợ student discount và hoàn tiền.
- **Calendar:** Google/Microsoft qua OAuth & ICS.
- **Wearables:** Terra aggregator + Apple Health/Google Fit webhook.
- **Notifications:** SendGrid (email), Twilio (SMS/WhatsApp), Firebase Web Push.
- **LMS (Optional):** REST/LTI kết nối, đánh dấu TBD trong §13.

## 6. Security Architecture

- MFA bắt buộc cho mentor/admin; learners tùy chọn.
- RBAC/ABAC với policy engine; phân tách quyền theo persona (learner, mentor, admin).
- Secrets quản lý bằng Vault với rotation tự động.
- Content Security Policy, kiểm soát download, DLP cho dữ liệu sức khỏe.
- Audit trail đẩy tới SIEM cho cảnh báo bất thường.

## 7. Scalability & Reliability

- Dịch vụ stateless autoscale qua HPA.
- PostgreSQL read replica, Redis cluster sentinel.
- Blue/green & canary release cho frontend/backend.
- DR đa vùng: RPO ≤ 15 phút, RTO ≤ 2 giờ, rehearsal hàng quý.

## 8. Observability & Operations

- Logging tập trung (OpenSearch), tracing (OpenTelemetry + Jaeger), metrics (Prometheus).
- SLOs: đăng nhập P95 < 2s, booking success ≥ 99%.
- Synthetic monitoring cho luồng signup, booking, completion.
- Incident response liên kết PagerDuty, runbook lưu tại `/docs/03-LifeCycle/ProcessWorkflow.md`.

## 9. Compliance & Governance

- Dữ liệu phân loại và retention theo §7 của SRS.
- Quy trình DPIA (Data Protection Impact Assessment) trước khi bật wearable sync.
- Secure SDLC: kiểm tra SAST/DAST, dependency scanning, IaC policy as code.
