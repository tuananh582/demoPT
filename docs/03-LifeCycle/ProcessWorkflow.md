# Process & Workflow Model (BPMN 2.0) – FitCampus Student Journey

```plantuml
@startuml
!pragma useVerticalIf on
!include <bpmn>

POOL "Learner" as Learner {
  START_EVENT(start_lrn, "Discover Portal")
  TASK(task_signup, "Complete Onboarding")
  TASK(task_orientation, "Finish Orientation Checklist")
  TASK(task_membership, "Activate Membership")
  TASK(task_book, "Book First Class")
  TASK(task_follow, "Follow Daily Plan")
  TASK(task_join, "Join Challenge")
  END_EVENT(end_lrn, "Achieve Goal")
}

POOL "Mentor" as Mentor {
  START_EVENT(start_mentor, "Cohort Assigned")
  TASK(task_review, "Review Learner Insights")
  TASK(task_nudge, "Send Nudge / Schedule Check-in")
  TASK(task_adjust, "Adjust Plan or Resources")
  END_EVENT(end_mentor, "Cohort Thriving")
}

POOL "Wellness Admin" as Admin {
  START_EVENT(start_admin, "Program Launch")
  TASK(task_publish, "Publish Content & Challenges")
  TASK(task_monitor, "Monitor KPIs & Feedback")
  TASK(task_support, "Handle Support Tickets")
  END_EVENT(end_admin, "Operations Stable")
}

start_lrn --> task_signup --> task_orientation --> task_membership --> task_book --> task_follow --> task_join --> end_lrn

start_mentor --> task_review --> task_nudge --> task_adjust --> end_mentor

start_admin --> task_publish --> task_monitor --> task_support --> end_admin

TASK(task_signup) ..> TASK(task_review) : "Orientation data"
TASK(task_membership) ..> TASK(task_support) : "Payment review"
TASK(task_book) ..> TASK(task_publish) : "Seat allocation"
TASK(task_follow) ..> TASK(task_review) : "Completion metrics"
TASK(task_review) ..> TASK(task_follow) : "Personalized advice"
TASK(task_support) ..> TASK(task_follow) : "Resolution guidance"
TASK(task_join) ..> TASK(task_monitor) : "Challenge stats"

@enduml
```

## Workflow Narrative
1. **Learner Pool:** Sinh viên khám phá portal, hoàn thành onboarding + orientation, kích hoạt membership, đặt lớp đầu tiên, theo dõi bảng kế hoạch hằng ngày và tham gia thử thách.
2. **Mentor Pool:** Nhận dữ liệu intake và tiến độ, gửi nhắc nhở, điều chỉnh kế hoạch, tổ chức check-in để giữ động lực cho cohort.
3. **Wellness Admin Pool:** Xuất bản nội dung mới, cấu hình thử thách, theo dõi KPI và xử lý yêu cầu hỗ trợ.
4. **Collaboration:** Message flows mô tả dữ liệu luân chuyển giữa learner ↔ mentor ↔ admin (orientation, booking, metrics, support).
5. **Exception Handling:**
   - Thanh toán lỗi → kích hoạt quy trình hỗ trợ thủ công.
   - Learner bỏ lỡ buổi học → hệ thống bật workflow nhắc nhở và mentor can thiệp.
   - Khi challenge đạt quá tải → admin cập nhật giới hạn hoặc tạo bảng mới.

## Alignment với BPMN 2.0
- Pools đại diện cho vai trò chính (Learner, Mentor, Wellness Admin).
- Tasks tương ứng yêu cầu trong SRS (LRN-FR-001, MEM-FR-002, SCH-FR-001, PROG-FR-001, OPS-FR-001).
- Message flows thể hiện trao đổi dữ liệu cung cấp nền tảng cho automation và cảnh báo.

