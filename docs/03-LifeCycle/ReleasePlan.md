# Release Plan – FitCampus Student Portal

## 1. Timeline Overview
| Release | Sprint Range | Focus | Key Deliverables |
|---------|--------------|-------|------------------|
| Release 0 (Discovery) | Sprint 0 | Thiết lập nền tảng | Research hành vi sinh viên, UX prototype, backlog ưu tiên, chuẩn hóa KPI |
| Release 1 (Activation) | Sprints 1-2 | Onboarding & Membership | Adaptive onboarding, orientation checklist, catalog membership, daily plan, booking lớp đầu tiên |
| Release 2 (Engagement) | Sprints 3-4 | Giữ chân & cộng đồng | Automated billing, community hub, messaging mentors, gamification XP/badges, progress dashboards |
| Release 3 (Intelligence) | Sprints 5-6 | Dữ liệu & cá nhân hóa | Recommendation engine, wearable sync MVP, cohort analytics, mentor toolkit nâng cao |
| Hardening & Launch | Sprint 7 | Ổn định & Go-live | Performance tuning, accessibility & security audit, UAT mở rộng, tài liệu & đào tạo mentor |

## 2. Milestones
- **M1 – Orientation Ready (End Sprint 2):** 80% sinh viên thử nghiệm hoàn thành onboarding và đặt lớp đầu tiên.
- **M2 – Community Ignition (End Sprint 4):** Messaging, challenges, XP store hoạt động với ≥ 50% học viên beta tham gia.
- **M3 – Insight Driven (End Sprint 6):** Mentor dashboard hiển thị cảnh báo rủi ro, wearable sync dữ liệu mẫu.
- **M4 – Launch Go/No-Go (Sprint 7):** SLA đạt chuẩn, tài liệu hỗ trợ đầy đủ, đội hypercare được đào tạo.

## 3. Go/No-Go Criteria
- Tất cả acceptance criteria cho release tương ứng có bằng chứng test.
- Không còn bug Sev1; Sev2 có workaround được phê duyệt.
- Kết quả kiểm thử hiệu năng: page load ≤ 2.5s P95, API median < 400ms @ 100 RPS.
- Security & accessibility audit (WCAG AA) pass, vấn đề blocker đã giải quyết.
- Mentor & hỗ trợ sinh viên hoàn thành đào tạo, kịch bản hypercare sẵn sàng.

## 4. Rollback Strategy
- Blue/green deployment, feature flags cho module mới (community, wearable, recommendation).
- Snapshot DB + backup object storage trước release; kiểm tra khôi phục hàng quý.
- Plan fallback thủ công cho thanh toán (gửi email + xác nhận offline) nếu gateway gặp sự cố.

## 5. Post-Launch Activities
- Hypercare 2 tuần với war room (Slack + hotline) và báo cáo hàng ngày.
- Theo dõi KPI: orientation completion, weekly active learners, class fill rate, challenge participation, ticket SLA.
- Thu thập phản hồi chi tiết từ survey tuần 2 và 6; cập nhật backlog cải tiến.
- Tổ chức retrospective với sinh viên beta, mentor, admin; điều chỉnh roadmap (LMS integration, native app).

