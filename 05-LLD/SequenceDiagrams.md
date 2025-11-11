# Mô tả trình tự (Sequence) - dạng văn bản

## 1. Tạo lịch lớp online (Admin)
```
Admin -> UI Admin: Chọn "Tạo lịch"
UI Admin -> Schedule API: POST /schedules {type, time, coach, participants, online_link}
Schedule API -> Validation Service: Kiểm tra trùng lịch coach
Validation Service --> Schedule API: Kết quả hợp lệ
Schedule API -> DB: Lưu bản ghi schedule + participants
Schedule API -> Message Queue: Publish event ScheduleCreated
Message Queue -> Notification Worker: Consume event
Notification Worker -> Email/SMS Service: Gửi thông báo tới coach & học viên
UI Admin <- Schedule API: Trả về lịch mới
```

## 2. Coach xác nhận lịch 1-1
```
Coach -> UI Coach: Mở thông báo lịch chờ xác nhận
UI Coach -> Schedule API: PATCH /schedules/{id}/confirm
Schedule API -> DB: Cập nhật trạng thái confirmed
Schedule API -> Message Queue: Publish event ScheduleConfirmed
Notification Worker -> Email học viên: Gửi xác nhận
UI Coach <- Schedule API: Trả về trạng thái mới
```

## 3. Coach cập nhật tiến trình học viên
```
Coach -> UI Coach: Nhập dữ liệu tiến trình
UI Coach -> Progress API: POST /trainees/{id}/progress
Progress API -> DB: Lưu ProgressLogs
Progress API -> Analytics Service: Trigger cập nhật dashboard
UI Coach <- Progress API: Trả về log mới
```
