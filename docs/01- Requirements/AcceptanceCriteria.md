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
- **AC2.5**: Form học viên sử dụng menu chọn gói tập lấy từ danh mục gói hiện có.

## Epic 3: Quản lý huấn luyện viên
- **AC3.1**: Danh sách coach hiển thị lịch làm việc trong tuần hiện tại.
- **AC3.2**: Cho phép tạo mới coach với các trường: họ tên, email, chuyên môn, khung giờ làm việc.
- **AC3.3**: Phân quyền coach truy cập trang coach ngay khi tài khoản được kích hoạt.
- **AC3.4**: Chuyên môn coach được chọn từ danh sách chuẩn hóa và có thể chỉnh sửa/xóa coach.

## Epic 4: Quản lý nội dung đào tạo
- **AC4.1**: Admin có thể tạo bài tập với nhóm bài tập, tên, link youtube hợp lệ.
- **AC4.2**: Program bao gồm danh sách bài tập và meal plan liên kết.
- **AC4.3**: Feedback được gắn với học viên và buổi tập cụ thể.
- **AC4.4**: Admin có thể chỉnh sửa/xóa bài tập khỏi thư viện.

## Epic 5: Lịch và lớp online
- **AC5.1**: Admin tạo buổi học với thời gian, địa điểm (offline/online), coach, học viên/gói.
- **AC5.2**: Với lớp online, link Meet/Zoom phải hiển thị trong lịch của admin và coach.
- **AC5.3**: Thông báo gửi cho coach và học viên trong vòng 5 phút sau khi tạo hoặc thay đổi lịch.
- **AC5.4**: Lịch 1-1 yêu cầu coach xác nhận trước khi chuyển sang trạng thái "đã xác nhận".
- **AC5.5**: Công cụ sắp xếp lịch cho phép di chuyển thứ tự và cập nhật thời gian/link buổi học.

## Epic 6: Trang coach
- **AC6.1**: Dashboard coach hiển thị tổng số học viên lead/trial/active.
- **AC6.2**: Coach cập nhật mục tiêu, meal plan và program cá nhân hóa cho từng học viên.
- **AC6.3**: Coach ghi nhận kết quả buổi tập và phản hồi, hệ thống lưu kèm timestamp.
- **AC6.4**: Coach nhận thông báo khi học viên hủy buổi tập.
- **AC6.5**: Trang `/coach/statistics` phải có bộ lọc timeframe (tuần, tháng, năm) và bộ môn, cập nhật biểu đồ ngay khi thay đổi.
- **AC6.6**: Tooltip khi hover trên biểu đồ hiển thị ngày và giá trị cụ thể; nút zoom +/- hoặc thanh trượt thay đổi cửa sổ quan sát.
- **AC6.7**: Nút "Xem chi tiết" mở bảng phân tích của chỉ số đang chọn với ít nhất 3 dữ liệu hữu ích (ví dụ ngày cao nhất, % thay đổi, gợi ý).
- **AC6.8**: Activity feed có thể tải thêm sau mỗi 10 mục hoặc hiển thị thanh cuộn độc lập tối đa 320px chiều cao.

## Epic 7: Marketing phòng PT
- **AC7.1**: Admin chỉnh sửa được tiêu đề, đoạn mô tả và hình ảnh chính của landing page.
- **AC7.2**: Admin quản lý được danh sách gói nổi bật, bao gồm tên, giá hiển thị và mô tả ngắn.
- **AC7.3**: Trước khi lưu, hệ thống hiển thị bản xem trước nội dung marketing.

## Epic 8: Thông báo realtime
- **AC8.1**: Khi có học viên mới được tạo, admin nhìn thấy sự kiện realtime trong vòng 5 giây.
- **AC8.2**: Khi coach cập nhật log tiến trình, sự kiện tương ứng xuất hiện trong danh sách thông báo realtime.
- **AC8.3**: Admin có thể lọc feed theo loại sự kiện (Lead mới, Cập nhật coach, Lịch) và đánh dấu từng mục là đã đọc.
- **AC8.4**: Activity feed lưu trữ được ít nhất 50 sự kiện với phân trang hoặc nút "Tải thêm".

## Epic 9: Quản lý quyền truy cập
- **AC9.1**: Trang `/admin/access-control` hiển thị danh sách vai trò cùng các quyền chính (ví dụ: Duyệt thanh toán, Sửa lịch, Xuất dữ liệu).
- **AC9.2**: Admin có thể bật/tắt từng quyền và lưu thay đổi; giao diện phản hồi trạng thái lưu thành công/thất bại.
- **AC9.3**: Bất kỳ thay đổi nào đều được ghi lại trong bảng audit (ngày giờ, người thực hiện, hành động).
- **AC9.4**: Hệ thống ngăn không cho admin hạ cấp chính mình xuống mức không đủ quyền (hiển thị thông báo lỗi rõ ràng).
