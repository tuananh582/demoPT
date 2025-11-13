# Product Backlog & User Stories – FitCampus Student Portal

## Agile Cadence
- Framework: Scrum với sprint 2 tuần.
- Vai trò: Product Owner (Student Affairs), Scrum Master, Squad đa chức năng (FE, BE, QA, UX, Data, Student Ambassador).
- Nghi thức: Sprint Planning, Daily Stand-up, Sprint Review, Retro, Backlog Refinement.

## Epic Mapping
| Epic | Description | Linked SRS Feature | Priority |
|------|-------------|--------------------|----------|
| EP-LRN | Learner Onboarding & Orientation | F1 | Must |
| EP-MEM | Membership & Billing | F2 | Must |
| EP-PLAN | Training Hub & Content | F3 | Must |
| EP-SCH | Class & Session Scheduling | F4 | Must |
| EP-PROG | Progress & Analytics | F5 | Must |
| EP-COM | Community & Support | F6 | Should |
| EP-EXP | Gamification & Recommendations | F7 | Should |
| EP-WELL | Wearable & Wellness Integrations | F8 | Could |
| EP-OPS | Mentor & Advisor Toolkit | F9 | Should |

## Sprint 1 (Activation)
1. **US-LRN-01** – *Là sinh viên mới, tôi muốn đăng ký bằng email hoặc tài khoản trường để truy cập lộ trình định hướng.*
   - Acceptance: AC-LRN-01
2. **US-LRN-02** – *Là sinh viên, tôi muốn hoàn thành bài kiểm tra sẵn sàng để nhận kế hoạch phù hợp.*
   - Acceptance: AC-LRN-02
3. **US-MEM-01** – *Là sinh viên, tôi muốn xem và so sánh gói thành viên để chọn lựa dễ dàng.*
   - Acceptance: AC-MEM-01
4. **US-PLAN-01** – *Là sinh viên, tôi muốn xem bảng điều khiển hàng ngày để biết bài tập và nhiệm vụ hôm nay.*
   - Acceptance: AC-PLAN-01
5. **US-SCH-01** – *Là sinh viên, tôi muốn đặt chỗ cho buổi tập định hướng để bắt đầu nhanh chóng.*
   - Acceptance: AC-SCH-02, AC-SCH-03
6. **US-COM-01** – *Là sinh viên, tôi muốn nhắn tin với bạn cùng lớp để trao đổi kinh nghiệm.*
   - Acceptance: AC-COM-01..02

## Sprint 2 (Engagement)
1. **US-PLAN-02** – *Là sinh viên, tôi muốn thay thế bài tập không phù hợp với thiết bị của mình.*
   - Acceptance: AC-PLAN-03
2. **US-SCH-02** – *Là sinh viên, tôi muốn nhận nhắc nhở phiên học để không bỏ lỡ.*
   - Acceptance: AC-SCH-04
3. **US-PROG-01** – *Là sinh viên, tôi muốn xem biểu đồ tiến độ để duy trì động lực.*
   - Acceptance: AC-PROG-01..02
4. **US-EXP-01** – *Là sinh viên, tôi muốn nhận huy hiệu và điểm thưởng khi duy trì streak.*
   - Acceptance: AC-PLAN-04
5. **US-COM-02** – *Là cộng tác viên RA, tôi muốn gửi thông báo cho cư dân ký túc xá về thử thách mới.*
   - Acceptance: AC-COM-03..05
6. **US-OPS-01** – *Là mentor, tôi muốn xem nhanh danh sách học viên có nguy cơ bỏ cuộc để hỗ trợ.*
   - Acceptance: AC-PROG-03

## Sprint 3 (Intelligence)
1. **US-MEM-02** – *Là sinh viên, tôi muốn thanh toán tự động để tiện gia hạn.*
   - Acceptance: AC-MEM-02..04
2. **US-COM-03** – *Là sinh viên, tôi muốn tham gia bảng xếp hạng thử thách để cạnh tranh cùng bạn bè.*
   - Acceptance: AC-COM-05
3. **US-PROG-02** – *Là nhân viên wellness, tôi muốn xem phân tích cohort để tối ưu chương trình.*
   - Acceptance: AC-PROG-03
4. **US-WELL-01** – *Là sinh viên, tôi muốn đồng bộ thiết bị đeo để kế hoạch cập nhật chính xác.*
   - Acceptance: AC-WELL-01..03
5. **US-EXP-02** – *Là sinh viên, tôi muốn nhận gợi ý buổi tập dựa trên hành vi trước đó.*
   - Acceptance: AC-EXP-01..02
6. **US-OPS-02** – *Là mentor, tôi muốn tự động hóa thông báo khi học viên bỏ lỡ buổi học.*
   - Acceptance: AC-COM-07

## Product Backlog (Ordered)
| Rank | User Story | Epic | MoSCoW | Dependencies |
|------|------------|------|--------|---------------|
| 1 | US-LRN-01 | EP-LRN | Must | None |
| 2 | US-LRN-02 | EP-LRN | Must | US-LRN-01 |
| 3 | US-MEM-01 | EP-MEM | Must | US-LRN-01 |
| 4 | US-PLAN-01 | EP-PLAN | Must | US-LRN-02 |
| 5 | US-SCH-01 | EP-SCH | Must | US-LRN-02 |
| 6 | US-COM-01 | EP-COM | Should | US-LRN-02 |
| 7 | US-PLAN-02 | EP-PLAN | Should | US-PLAN-01 |
| 8 | US-SCH-02 | EP-SCH | Should | US-SCH-01 |
| 9 | US-PROG-01 | EP-PROG | Must | US-PLAN-01 |
|10 | US-EXP-01 | EP-EXP | Should | US-PLAN-01 |
|11 | US-COM-02 | EP-COM | Should | US-COM-01 |
|12 | US-OPS-01 | EP-OPS | Should | US-PROG-01 |
|13 | US-MEM-02 | EP-MEM | Must | US-MEM-01 |
|14 | US-COM-03 | EP-COM | Could | US-COM-02 |
|15 | US-PROG-02 | EP-PROG | Should | US-PROG-01 |
|16 | US-WELL-01 | EP-WELL | Could | US-PROG-01 |
|17 | US-OPS-02 | EP-OPS | Should | US-OPS-01 |
|18 | US-EXP-02 | EP-EXP | Could | US-EXP-01 |
|19 | US-API-01 | EP-OPS | Could | US-MEM-02 |
|20 | US-SUP-01 | EP-COM | Should | US-COM-01 |

## Definition of Ready (DoR)
- Story có persona rõ ràng, mục tiêu, acceptance dạng Given/When/Then.
- Phụ thuộc xác định và xử lý trong sprint.
- Mockup/flow đính kèm khi cần.
- Test scenario nháp có sẵn.

## Definition of Done (DoD)
- Code merge qua peer review, CI/CD pass.
- Acceptance criteria xác nhận trên staging.
- Tài liệu và release notes cập nhật, hạ tầng giám sát cấu hình.

