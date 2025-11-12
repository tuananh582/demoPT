# Use Case - Hệ thống quản lý phòng gym trực tuyến

## UC-ADM-01: Xem dashboard doanh thu
- **Tác nhân chính**: Admin
- **Mục tiêu**: Xem doanh thu theo ngày/tuần/tháng/năm.
- **Điều kiện tiên quyết**: Admin đã đăng nhập.
- **Luồng chính**:
  1. Admin truy cập dashboard.
  2. Admin chọn khoảng thời gian.
  3. Hệ thống hiển thị biểu đồ và số liệu tương ứng.
- **Luồng thay thế**: Nếu không có dữ liệu, hiển thị thông báo "Không có dữ liệu".
- **Yêu cầu phi chức năng**: Thời gian phản hồi < 3 giây.

## UC-ADM-02: Quản lý học viên
- **Tác nhân chính**: Admin
- **Mục tiêu**: Tạo, xem, sửa, xóa học viên và gán gói tập.
- **Điều kiện tiên quyết**: Admin đã đăng nhập.
- **Luồng chính**:
  1. Admin mở danh sách học viên.
  2. Admin chọn tạo mới hoặc chỉnh sửa.
  3. Admin nhập thông tin học viên và gói tập.
  4. Hệ thống lưu thông tin, hiển thị tiến độ hiện tại và lịch sử.
- **Ngoại lệ**: Thiếu thông tin bắt buộc → hiển thị lỗi.

## UC-ADM-03: Quản lý huấn luyện viên
- **Tác nhân chính**: Admin
- **Mục tiêu**: Quản lý danh sách coach và lịch làm việc.
- **Luồng chính**:
  1. Admin truy cập module coach.
  2. Xem lịch làm việc và phân công lớp.
  3. Tạo/cập nhật thông tin coach.
- **Ngoại lệ**: Coach trùng email → thông báo lỗi.

## UC-ADM-04: Tạo tài khoản học viên
- **Tác nhân chính**: Admin
- **Mục tiêu**: Cấp tài khoản đăng nhập cho học viên.
- **Luồng chính**:
  1. Admin chọn học viên cần cấp tài khoản.
  2. Nhập thông tin đăng nhập và gửi email kích hoạt.
  3. Hệ thống tạo tài khoản và gửi thông báo.

## UC-ADM-05: Quản lý nội dung đào tạo
- **Tác nhân chính**: Admin
- **Mục tiêu**: CRUD bài tập, program, meals, meal mẫu, feedback.
- **Luồng chính**:
  1. Admin chọn danh mục tương ứng.
  2. Tạo hoặc cập nhật nội dung (ví dụ bài tập gồm nhóm, tên, link youtube).
  3. Hệ thống lưu và hiển thị danh sách cập nhật.

## UC-ADM-07: Lên thực đơn cho học viên
- **Tác nhân chính**: Admin/Coach
- **Mục tiêu**: Tạo meal plan theo tuần cho học viên.
- **Luồng chính**:
  1. Admin/Coach mở hồ sơ học viên.
  2. Chọn tuần áp dụng và nhập bữa sáng/trưa/tối từng ngày.
  3. Hệ thống lưu meal plan và hiển thị cho học viên.

## UC-ADM-06: Tạo lịch lớp online
- **Tác nhân chính**: Admin
- **Mục tiêu**: Tạo lịch với link Google Meet/Zoom.
- **Luồng chính**:
  1. Admin tạo buổi học và gắn coach, học viên/gói.
  2. Nhập link online.
  3. Hệ thống lưu và gửi thông báo đến coach, học viên.

## UC-COA-01: Quản lý danh sách học viên
- **Tác nhân chính**: Coach
- **Mục tiêu**: Xem danh sách học viên và trạng thái.
- **Luồng chính**:
  1. Coach đăng nhập trang coach.
  2. Dashboard hiển thị học viên lead/trial/active.
  3. Coach lọc theo trạng thái và chọn học viên.

## UC-COA-02: Thiết lập mục tiêu và chương trình cá nhân
- **Tác nhân chính**: Coach
- **Luồng chính**:
  1. Coach mở hồ sơ học viên.
  2. Nhập mục tiêu, thời hạn.
  3. Tạo meal plan và program dựa trên danh mục.
  4. Lưu và cập nhật kế hoạch.

## UC-COA-03: Theo dõi tiến trình
- **Tác nhân chính**: Coach
- **Luồng chính**:
  1. Coach chọn học viên.
  2. Xem biểu đồ chỉ số, tiến trình.
  3. Thêm ghi chú, phản hồi.
  4. Mở bảng lịch sử đo chỉ số theo từng buổi tập.

## UC-COA-04: Quản lý lịch làm việc
- **Tác nhân chính**: Coach
- **Luồng chính**:
  1. Coach xem lịch cá nhân.
  2. Nhấp vào buổi học để xem chi tiết và link online.
  3. Xác nhận yêu cầu 1-1 nếu có.

## UC-COA-06: Xem tổng số buổi đã dạy trong tuần
- **Tác nhân chính**: Coach/Admin
- **Mục tiêu**: Nắm số lượng buổi huấn luyện trong tuần hiện tại.
- **Luồng chính**:
  1. Người dùng mở dashboard lịch.
  2. Hệ thống tính và hiển thị tổng số buổi đã hoàn thành theo coach.
  3. Người dùng nhấp vào từng coach để xem danh sách buổi chi tiết.

## UC-COA-05: Nhận thông báo
- **Tác nhân chính**: Coach
- **Luồng chính**:
  1. Hệ thống gửi thông báo khi có lịch mới/hủy/sắp tới.
  2. Coach mở thông báo và xem chi tiết.

## Ma trận truy vết (trích)
| Use Case | Yêu cầu chức năng | Module |
|----------|-------------------|--------|
| UC-ADM-01 | SRS 3.1.1 | Dashboard admin |
| UC-ADM-02 | SRS 3.1.2 | Quản lý học viên |
| UC-ADM-06 | SRS 3.1.8 | Lịch online |
| UC-COA-02 | SRS 3.2.2 | Hồ sơ học viên |
| UC-COA-04 | SRS 3.2.4 | Lịch coach |
