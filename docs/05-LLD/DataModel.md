# Mô hình dữ liệu chi tiết

## 1. Bảng Users
- **Trường chính**: id (UUID)
- Thuộc tính: email (unique), password_hash, full_name, phone, status, created_at, updated_at.
- Quan hệ: 1-n với Roles (UserRoles), 1-1 với Trainees/Coaches.

## 2. Bảng Roles
- id, code (ADMIN/COACH/TRAINEE), description.
- Bảng trung gian UserRoles (user_id, role_id).

## 3. Bảng Trainees
- user_id (PK, FK Users), date_of_birth, gender, height, weight_current, package_id, status (lead/trial/active), notes.
- Quan hệ: 1-n với ProgressLogs, MealAssignments, ProgramAssignments, Feedbacks.

## 4. Bảng Coaches
- user_id (PK), specialization, certifications, bio, calendar_link(optional).
- Quan hệ: 1-n với ScheduleSessions, TraineeCoach (mapping học viên -> coach).

## 5. Bảng Packages
- id, name, type (group/1-1), duration_weeks, price, description.

## 6. Bảng Programs
- id, name, description, goal, level, created_by (coach/admin).
- Quan hệ: 1-n với ProgramExercises, ProgramMeals, ProgramAssignments.

## 7. Bảng Exercises
- id, category, name, video_url, description, difficulty.

## 8. Bảng ProgramExercises
- id, program_id, exercise_id, reps, sets, rest_time.

## 9. Bảng Meals
- id, name, description, calories, macros (carb/protein/fat).

## 10. Bảng MealTemplates
- id, name, description, total_calories.
- Quan hệ: 1-n MealTemplateItems (meal_template_id, meal_id, order_index).

## 11. Bảng MealPlans
- id, trainee_id, start_date, end_date, total_calories_target.
- Quan hệ: 1-n MealPlanItems (meal_plan_id, meal_id, schedule_time).

## 12. Bảng Schedules
- id, type (group/one_on_one), start_time, end_time, location, online_link, package_id(optional), coach_id, status (pending/confirmed/cancelled).

## 13. Bảng ScheduleParticipants
- schedule_id, trainee_id, attendance_status, joined_link.

## 14. Bảng ProgressLogs
- id, trainee_id, recorded_at, weight, body_fat, muscle_mass, note, adherence_rate.

## 15. Bảng Feedbacks
- id, trainee_id, coach_id, schedule_id, rating, comment, created_at.

## 16. Bảng Revenues
- id, period_start, period_end, total_amount, breakdown_json.

## 17. Bảng Notifications
- id, user_id, type, message, reference_id, status (new/read), sent_at.

## 18. Bảng CoachAvailability
- id, coach_id, day_of_week, start_time, end_time, capacity.

## 19. Bảng TraineeCoach
- id, trainee_id, coach_id, assigned_at, is_primary.

## 20. Bảng RolePermissions
- id, role_id, permission_code (ví dụ `CAN_APPROVE_PAYMENT`, `CAN_EDIT_SCHEDULE`, `CAN_EXPORT_DATA`), is_allowed (boolean), updated_at.
- Quan hệ: nhiều-1 với Roles. Hỗ trợ cấu hình quyền khác nhau giữa admin/phó admin.

## 21. Bảng PermissionAudit
- id, actor_user_id, role_id, permission_code, previous_value, new_value, changed_at, note.
- Dùng để lưu lịch sử thay đổi quyền truy cập và phục vụ kiểm soát nội bộ.

## 22. Bảng ActivityEvents
- id, event_type (`trainee_registered`, `coach_progress_updated`, `schedule_changed`), payload_json, actor_id, created_at, status (new/read).
- Được đẩy vào Notification Streaming Service và truy vấn để hiển thị activity feed có phân trang.
