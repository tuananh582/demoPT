# Development Task List - Coach Portal Enhancement

## 📋 Project Overview
Tích hợp các tính năng bổ sung cho trang coach:
1. Lịch drag-drop với thông báo
2. Thống kê chi tiết
3. Ghi chú/Nhắc việc
4. Cải thiện UI (icon, card layout)

---

## ⏳ CURRENT - In Progress

### Phase 5: QA & Lint Cleanup
- [x] **5.1** Loại bỏ `setState` đồng bộ trong effect của `components/auth/LoginForm.tsx` bằng cách đọc `redirect` từ `useSearchParams` và chuẩn hóa đích đến.
- [x] **5.2** Refactor `app/(app)/coach/trainees/page.tsx` để tránh đặt state trong effect, bảo toàn lựa chọn học viên khi lọc và tự động đặt tab về "overview" trong hàm xử lý.
- [x] **5.3** Xoá biến chưa sử dụng ở `app/(app)/coach/progress/page.tsx` và đảm bảo truy vấn danh sách đo lường tối ưu.

---

## 📦 Backend / Mock Data Updates (Concurrent)
- [ ] **B1** Cập nhật mockData.ts - thêm trainingNotes, sessionFeedback, statisticsData
- [ ] **B2** Tạo hook useCoachData aggregating all coach-related data
- [ ] **B3** Tạo notification mock service - simulate real-time alerts

---

## ✅ COMPLETED
- [done] ✓ Cập nhật docs/01-Requirements/SRS.md - thêm 5 feature mới
- [done] ✓ Cập nhật docs/01-Requirements/AcceptanceCriteria.md - Epic 7-10
- [done] ✓ Tạo docs/todo.md
- [done] ✓ Phase 1 - UI tối giản: thêm icon `lucide-react`, cập nhật CoachLayout và refactor Trainer Info Card sang grid tối giản.
- [done] ✓ Phase 2 - Lịch kéo thả: xây dựng `InteractiveScheduleCalendar` sử dụng native drag events, ghi nhận lý do, thông báo và lịch sử thay đổi.
- [done] ✓ Phase 3 - Trang thống kê: dựng dashboard filterable với biểu đồ Recharts, export CSV và lịch sử báo cáo.
- [done] ✓ Phase 4 - Notes/Reminders: tái thiết kế trang ghi chú với modal CRUD, tìm kiếm, filter, due date và đính kèm.
- [done] ✓ Backend mock - Mở rộng `mockData.ts` với notes, statistics, change logs và điều hướng "Thống kê".

---

## 🎯 Acceptance Criteria Summary

### UI/UX (Epic 10)
- Menu sidebar có icon rõ ràng cho 6 mục chính
- Trainer info card hiển thị 2-3 cột responsive
- Styling consistent, minimal design language

### Schedule Drag-Drop (Epic 7)
- Coach kéo thả buổi tập để sắp xếp
- Thông báo gửi automatically trong 5 phút
- Highlight/shadow khi drag

### Statistics (Epic 8)
- Hiển thị tuần/tháng/năm breakdown
- Completion rate (%) + rating (1-5 star)
- Export capability

### Notes (Epic 9)
- Thêm/sửa/xóa ghi chú per trainee
- Status tracking (pending/in-progress/completed)
- Search/filter/sort

---

## 🔧 Technologies & Dependencies
- **UI**: React 19, Tailwind CSS 4, Next.js 16
- **Icons**: lucide-react or @heroicons/react (TBD)
- **Drag-Drop**: @dnd-kit/core @dnd-kit/utilities (TBD - testing needed)
- **Charts**: recharts (recommended, to install)
- **Export**: papaparse (CSV), jsPDF (PDF) - optional

---

## 📅 Timeline Estimate
- Phase 1 (UI): 3-4 days
- Phase 2 (Drag-Drop): 4-5 days
- Phase 3 (Stats): 3-4 days
- Phase 4 (Notes): 2-3 days
- **Total**: ~13-16 days (2+ weeks)

---

## ⚠️ Known Risks & TBD

### TBD-001: Drag-Drop Library Choice
- Candidates: @dnd-kit vs react-dnd vs react-beautiful-dnd
- Decision needed: weight performance vs API simplicity
- **Owner**: Lead Architect
- **Due**: Before Phase 2 starts

### TBD-002: Notification Service Integration
- Current mock, need actual backend API endpoint
- Email/SMS vs in-app only?
- **Owner**: Backend Lead
- **Due**: Before Phase 2 testing

### TBD-003: Statistics Calculation Logic
- Rules for "completion rate" calculation (per week? cumulative?)
- Rating aggregation method (average? weighted?)
- **Owner**: Business Analyst
- **Due**: Before Phase 3 starts

### TBD-004: Export Format & Performance
- PDF/Excel export - library choice (jsPDF vs pdfkit, papaparse vs xlsx)
- Max records per export (limit?), async job queue needed?
- **Owner**: Backend + Frontend
- **Due**: Phase 3 design review

---

## 📝 Change History
| Version | Date | Author | Changes |
|---------|------|--------|---------|
| v0.1 | 2025-11-14 | AI Assistant | Initial task breakdown, docs updated with SRS/AC |


