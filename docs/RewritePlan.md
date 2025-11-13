# Documentation Rewrite Plan – Student Fitness Portal

## 1. Goal & Scope
- Chuyển toàn bộ tài liệu trong `/docs` sang bối cảnh website học viên tập gym (student fitness portal).
- Hai hướng tập trung chính:
  - Định nghĩa trải nghiệm học viên: onboarding, khóa học luyện tập, lịch học, tiến độ.
  - Loại bỏ góc nhìn quản trị/coach, giữ lại nội dung cần thiết cho học viên tự phục vụ.

## 2. Deliverables
- Bộ tài liệu yêu cầu (BRD, PRD, SRS, AcceptanceCriteria, ProductBacklog, UseCases) tái viết theo persona học viên.
- Bộ tài liệu kiến trúc/vòng đời (ContextDiagram, SystemArchitecture, ProcessWorkflow, ProjectLifeCycle, ReleasePlan) cập nhật bối cảnh học viên.
- Bộ tài liệu hỗ trợ (Glossary, StakeholderAnalysis, TraceabilityMatrix).
- Bộ thiết kế chi tiết (APIDesign, DataModel, SequenceDiagrams).

## 3. Timeline & Milestones
| Mốc | Thời gian dự kiến | Nội dung |
|-----|------------------|----------|
| M1 | +1 ngày | Hoàn thành bộ yêu cầu (BRD/PRD/SRS/Acceptance/Backlog/UseCases) |
| M2 | +2 ngày | Cập nhật tài liệu kiến trúc & vòng đời |
| M3 | +3 ngày | Cập nhật tài liệu hỗ trợ & LLD |
| M4 | +3 ngày | Rà soát toàn bộ, đảm bảo truy vết & nhất quán |

## 4. Risks & Mitigations
| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|-----------|
| Thiếu thông tin cụ thể về chương trình học viên | Medium | Medium | Đánh dấu TBD trong tài liệu, giả định rõ ràng |
| Phạm vi tài liệu lớn dẫn đến sai sót nhất quán | High | Medium | Thiết lập checklist truy vết giữa BRD ↔ PRD ↔ SRS ↔ RTM |
| Chưa rõ tích hợp thiết bị đeo cho học viên | Low | Medium | Giữ mô-đun nhưng mô tả theo góc nhìn học viên, ghi chú TBD |

## 5. Dependencies
- Phản hồi từ đội marketing về messaging dành cho học viên.
- Quy định bảo vệ dữ liệu cá nhân (PDPA, GDPR) trong bối cảnh học viên.
- Tài liệu chương trình luyện tập & thư viện nội dung số.

## 6. Assumptions
- Website vận hành theo múi giờ Asia/Bangkok.
- Học viên sử dụng desktop & mobile; mong muốn trải nghiệm PWA.
- Học viên thanh toán qua cổng quốc tế và nội địa (Stripe/MoMo) – giữ lại cho minh bạch.

## 7. Next Steps Checklist
- [ ] Tổng hợp persona & journey học viên.
- [ ] Viết lại tài liệu yêu cầu ưu tiên cao.
- [ ] Cập nhật kiến trúc & vòng đời.
- [ ] Hoàn thiện tài liệu hỗ trợ và chi tiết kỹ thuật.
