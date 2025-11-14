# Development Task List - Coach Portal Enhancement

## 📋 Project Overview
Tích hợp các tính năng bổ sung cho trang coach:
1. Lịch drag-drop với thông báo
2. Thống kê chi tiết
3. Ghi chú/Nhắc việc
4. Cải thiện UI (icon, card layout)

---

## ⏳ CURRENT - In Progress

### [WIP] Phase 1: UI/UX Enhancement
- [ ] **1.1** Thêm icon library (lucide-react/heroicons) vào package.json [context: coach menu, sidebar icons]
- [ ] **1.2** Cập nhật CoachLayout component - thêm icon cho menu items (Dashboard, Users, Calendar, Programs, Notifications, Notes)
- [ ] **1.3** Refactor Trainer Info Card: tách thành grid layout 2-3 cột với card riêng (Email, Specialty, Height, Weight, Experience)
- [ ] **1.4** Cải thiện styling globals.css - thêm design system (color palette, spacing, shadows)

### [TBD] Phase 2: Drag-Drop Schedule Component  
- [ ] **2.1** Install drag-drop library (@dnd-kit hoặc react-dnd) [context: app/coach/schedule/page.tsx]
- [ ] **2.2** Tạo hook useScheduleDragDrop với logic drag/drop session handling
- [ ] **2.3** Tạo component InteractiveScheduleCalendar - hỗ trợ drag-drop buổi tập, time range adjustment
- [ ] **2.4** Implement notification service trigger khi coach thay đổi schedule
- [ ] **2.5** Test drag-drop flow + notification e2e

### [TBD] Phase 3: Detailed Statistics Page
- [ ] **3.1** Tạo app/coach/statistics/page.tsx - hiển thị:
  - Tổng buổi tập tuần/tháng/năm per trainee
  - Tỷ lệ hoàn thành mục tiêu (%)
  - Chất lượng buổi tập (rating)
- [ ] **3.2** Tạo hook useStatisticsData - fetch + calculate metrics từ mock data
- [ ] **3.3** Tạo Chart components (bar, line) cho stats display
- [ ] **3.4** Thêm date range filter + export PDF/Excel button

### [TBD] Phase 4: Notes/Reminders Feature
- [ ] **4.1** Tạo app/coach/notes/page.tsx - danh sách ghi chú
- [ ] **4.2** Tạo NoteModal component - thêm/sửa ghi chú với fields:
  - Trainee name
  - Session reference
  - Note content
  - Status (pending/in-progress/completed)
  - Tags
- [ ] **4.3** Tạo hook useNotes - CRUD operations trên mock data
- [ ] **4.4** Thêm search, filter, sort functionality

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


