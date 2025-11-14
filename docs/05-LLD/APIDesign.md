# Thiết kế API chi tiết (trích)

## 1. Auth
### POST /auth/login
- Input: { email, password }
- Output: { access_token, refresh_token, user: {id, roles} }
- Lỗi: 401 khi thông tin không hợp lệ.

### POST /auth/refresh
- Input: { refresh_token }
- Output: { access_token }

## 2. Học viên
### GET /trainees
- Query: status, package_id, search, page, size.
- Output: danh sách học viên với phân trang.

### POST /trainees
- Input: { full_name, email, phone, status, package_id, goals }
- Xử lý: tạo user, gán vai trò TRAINEE, tạo bản ghi trainee.

### GET /trainees/{id}/progress
- Output: danh sách ProgressLogs.

### POST /trainees/{id}/progress
- Input: { recorded_at, weight, body_fat, muscle_mass, note }

### GET /trainees/{id}/progress/history
- Output: { sessions: [{schedule_id, recorded_at, weight, body_fat, muscle_mass, note}] }
- Ghi chú: trả về dữ liệu theo từng buổi tập đã ghi nhận.

## 3. Huấn luyện viên
### GET /coaches
- Output: danh sách coach với lịch khả dụng.

### POST /coaches
- Input: { full_name, email, phone, specialization, availability[] }

### PATCH /coaches/{id}/roles
- Input: { roles: ["COACH"] }
- Mục tiêu: cấp quyền truy cập trang coach.

## 4. Gói tập & chương trình
### GET /packages
- Output: danh sách gói (group/1-1).

### POST /packages
- Input: { name, type, duration_weeks, price, description }

### POST /programs
- Input: { name, description, goal, exercises: [{exercise_id, sets, reps}], meals: [{meal_id, day_of_week}] }

### POST /trainees/{id}/meal-plans
- Input: { week_start, meals: [{ day_of_week, meal_time, meal_id?, title, notes }] }
- Ghi chú: meal_time ∈ {breakfast, lunch, dinner, snack}.

### GET /trainees/{id}/meal-plans?week_start=YYYY-MM-DD
- Output: meal plan theo tuần với các bữa ăn mỗi ngày.

## 5. Bài tập (Lessons)
### POST /exercises
- Input: { category, name, video_url, description }
- Validation: video_url phải là link hợp lệ (youtube/https).

## 6. Lịch
### GET /schedules
- Query: role (admin/coach), range_start, range_end, status.

### POST /schedules
- Input: { type, start_time, end_time, coach_id, package_id?, participant_ids[], online_link? }
- Logic: nếu type = "one_on_one" → status = pending, yêu cầu coach xác nhận.

### PATCH /schedules/{id}/confirm
- Input: { action: "confirm" }
- Điều kiện: chỉ coach được phân công mới xác nhận.

### PATCH /schedules/{id}/cancel
- Input: { reason }
- Hệ thống gửi thông báo hủy tới coach/học viên.

### PATCH /schedules/{id}
- Input: { start_time?, end_time?, status?, reason }
- Logic: yêu cầu reason khi thay đổi thời gian; ghi log vào ScheduleChangeLogs và đẩy thông báo real-time.

### GET /schedules/coach-weekly-summary
- Query: week_start, coach_id?
- Output: { total_sessions, sessions: [{schedule_id, title, start_time, end_time, status}] }

### GET /schedules/{id}/changes
- Output: danh sách lịch sử thay đổi với thời gian, người cập nhật, lý do, trạng thái gửi thông báo.

## 7. Thông báo
### GET /notifications
- Query: status (new/read)

### PATCH /notifications/{id}/read
- Đánh dấu đã đọc.

## 8. Báo cáo doanh thu
### GET /reports/revenue
- Query: period=day/week/month/year, start_date, end_date.
- Output: { labels[], values[], total, comparison_previous }

## 9. Thống kê huấn luyện
### GET /coach/statistics
- Query: range_start, range_end, trainee_status?, coach_id?, group_by=trainee|coach, include_raw?
- Output: { summaries: [{subject_id, subject_name, sessions_completed, goal_completion_rate, average_rating, trend: []}], totals, alerts: [] }

### GET /coach/statistics/export
- Query: format=pdf|xlsx|csv, range_start, range_end, filters...
- Output: { download_url, expires_at }

## 10. Ghi chú/Nhắc việc
### GET /coach-notes
- Query: trainee_id?, status?, priority?, search?, page, size.
- Output: danh sách ghi chú với phân trang.

### POST /coach-notes
- Input: { trainee_id, schedule_id?, title, content, priority, due_at?, tags[] }
- Xử lý: tạo ghi chú, gán coach hiện tại, status mặc định "pending".

### PATCH /coach-notes/{id}
- Input: { title?, content?, priority?, status?, due_at?, tags?, attachment_url? }
- Cho phép cập nhật trạng thái hoàn thành, đính kèm tài liệu.

### DELETE /coach-notes/{id}
- Xóa mềm ghi chú, lưu timestamp.
