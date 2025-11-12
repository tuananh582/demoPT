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
  3. Admin nhập thông tin học viên và chọn gói tập từ danh sách thả xuống.
  4. Hệ thống lưu thông tin, hiển thị tiến độ hiện tại và lịch sử.
- **Luồng thay thế**: Admin chọn xóa → hệ thống yêu cầu xác nhận trước khi loại bỏ học viên.
- **Ngoại lệ**: Thiếu thông tin bắt buộc → hiển thị lỗi.

## UC-ADM-03: Quản lý huấn luyện viên
- **Tác nhân chính**: Admin
- **Mục tiêu**: Quản lý danh sách coach và lịch làm việc.
- **Luồng chính**:
  1. Admin truy cập module coach.
  2. Xem lịch làm việc và phân công lớp.
  3. Tạo/cập nhật thông tin coach, chọn chuyên môn từ danh sách cấu hình.
  4. Xóa hoặc vô hiệu hóa coach khi nghỉ việc.
- **Ngoại lệ**: Coach trùng email → thông báo lỗi.

## UC-ADM-04: Quản lý tài khoản người dùng
- **Tác nhân chính**: Admin
- **Mục tiêu**: Cấp, chỉnh sửa hoặc thu hồi tài khoản đăng nhập.
- **Luồng chính**:
  1. Admin chọn học viên hoặc coach cần tạo tài khoản.
  2. Nhập thông tin đăng nhập, vai trò và kích hoạt tài khoản.
  3. Hệ thống tạo tài khoản và gửi thông báo.
  4. Khi cần, admin chỉnh sửa vai trò, trạng thái hoặc xóa tài khoản.
- **Ngoại lệ**: Email đã tồn tại → hiển thị lỗi.

## UC-ADM-05: Quản lý nội dung đào tạo
- **Tác nhân chính**: Admin
- **Mục tiêu**: CRUD bài tập, program, meals, meal mẫu, feedback.
- **Luồng chính**:
  1. Admin chọn danh mục tương ứng.
  2. Tạo hoặc cập nhật nội dung (ví dụ bài tập gồm nhóm, tên, link youtube).
  3. Admin xóa nội dung không còn phù hợp.
  4. Hệ thống lưu và hiển thị danh sách cập nhật.

## UC-ADM-06: Tạo lịch lớp online
- **Tác nhân chính**: Admin
- **Mục tiêu**: Tạo lịch với link Google Meet/Zoom.
- **Luồng chính**:
  1. Admin tạo buổi học và gắn coach, học viên/gói.
  2. Nhập link online.
  3. Hệ thống lưu và gửi thông báo đến coach, học viên.

## UC-ADM-07: Sắp xếp và chỉnh sửa lịch học
- **Tác nhân chính**: Admin
- **Mục tiêu**: Sắp xếp lại thứ tự ưu tiên, chỉnh sửa thời gian hoặc link lớp.
- **Điều kiện tiên quyết**: Đã có lịch được tạo.
- **Luồng chính**:
  1. Admin mở công cụ sắp xếp lịch.
  2. Chọn buổi học cần chỉnh sửa.
  3. Cập nhật thời gian, link Google Meet/Zoom hoặc di chuyển thứ tự.
  4. Hệ thống lưu thay đổi và cập nhật thông báo.
- **Ngoại lệ**: Trùng lịch với coach khác → cảnh báo.

## UC-ADM-08: Chỉnh sửa trang marketing PT
- **Tác nhân chính**: Admin
- **Mục tiêu**: Cập nhật nội dung marketing (tiêu đề, mô tả, hình ảnh, giá).
- **Luồng chính**:
  1. Admin truy cập module marketing.
  2. Chỉnh sửa nội dung và tải lên hình ảnh.
  3. Xem trước thay đổi.
  4. Xuất bản nội dung.
- **Ngoại lệ**: Tệp ảnh không hợp lệ → hiển thị lỗi.

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

## UC-COA-04: Quản lý lịch làm việc
- **Tác nhân chính**: Coach
- **Luồng chính**:
  1. Coach xem lịch cá nhân.
  2. Nhấp vào buổi học để xem chi tiết và link online.
  3. Xác nhận yêu cầu 1-1 nếu có.

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
