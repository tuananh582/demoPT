# Tiêu chí chấp nhận chính

## Epic 1: Dashboard doanh thu
- **AC1.1**: Khi admin chọn khoảng thời gian, hệ thống phải trả về biểu đồ và tổng doanh thu tương ứng.
- **AC1.2**: Cho phép chuyển đổi nhanh giữa tab tuần/tháng/năm.
- **AC1.3**: Khi không có dữ liệu, hiển thị thông báo "Không có dữ liệu" và biểu đồ trống.

## Epic 2: Quản lý học viên
- **AC2.1**: Danh sách học viên hiển thị các trường: họ tên, email, số điện thoại, trạng thái, gói tập.
- **AC2.2**: Cho phép tạo học viên mới với dữ liệu bắt buộc (họ tên, email, số điện thoại, gói tập).
- **AC2.3**: Hệ thống lưu lại lịch sử tiến độ với dấu thời gian.
- **AC2.4**: Khi xóa học viên, hệ thống yêu cầu xác nhận và lưu trạng thái vô hiệu hóa.

## Epic 3: Quản lý huấn luyện viên
- **AC3.1**: Danh sách coach hiển thị lịch làm việc trong tuần hiện tại.
- **AC3.2**: Cho phép tạo mới coach với các trường: họ tên, email, chuyên môn, khung giờ làm việc.
- **AC3.3**: Phân quyền coach truy cập trang coach ngay khi tài khoản được kích hoạt.

## Epic 4: Quản lý nội dung đào tạo
- **AC4.1**: Admin có thể tạo bài tập với nhóm bài tập, tên, link youtube hợp lệ.
- **AC4.2**: Program bao gồm danh sách bài tập và meal plan liên kết.
- **AC4.3**: Feedback được gắn với học viên và buổi tập cụ thể.

## Epic 5: Lịch và lớp online
- **AC5.1**: Admin tạo buổi học với thời gian, địa điểm (offline/online), coach, học viên/gói.
- **AC5.2**: Với lớp online, link Meet/Zoom phải hiển thị trong lịch của admin và coach.
- **AC5.3**: Thông báo gửi cho coach và học viên trong vòng 5 phút sau khi tạo hoặc thay đổi lịch.
- **AC5.4**: Lịch 1-1 yêu cầu coach xác nhận trước khi chuyển sang trạng thái "đã xác nhận".

## Epic 6: Trang coach
- **AC6.1**: Dashboard coach hiển thị tổng số học viên lead/trial/active.
- **AC6.2**: Coach cập nhật mục tiêu, meal plan và program cá nhân hóa cho từng học viên.
- **AC6.3**: Coach ghi nhận kết quả buổi tập và phản hồi, hệ thống lưu kèm timestamp.
- **AC6.4**: Coach nhận thông báo khi học viên hủy buổi tập.
