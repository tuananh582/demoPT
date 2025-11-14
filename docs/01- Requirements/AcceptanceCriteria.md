# Tiêu chí chấp nhận chính

## Epic 1: Dashboard doanh thu
|- **AC1.1**: Khi admin chọn khoảng thời gian, hệ thống phải trả về biểu đồ và tổng doanh thu tương ứng.
|- **AC1.2**: Cho phép chuyển đổi nhanh giữa tab tuần/tháng/năm.
|- **AC1.3**: Khi không có dữ liệu, hiển thị thông báo "Không có dữ liệu" và biểu đồ trống.

## Epic 2: Quản lý học viên
|- **AC2.1**: Danh sách học viên hiển thị các trường: họ tên, email, số điện thoại, trạng thái, gói tập.
|- **AC2.2**: Cho phép tạo học viên mới với dữ liệu bắt buộc (họ tên, email, số điện thoại, gói tập).
|- **AC2.3**: Hệ thống lưu lại lịch sử tiến độ với dấu thời gian.
|- **AC2.4**: Khi xóa học viên, hệ thống yêu cầu xác nhận và lưu trạng thái vô hiệu hóa.
|- **AC2.5**: Cho phép tạo và gán thực đơn (meal plan) theo tuần cho từng học viên, hiển thị rõ bữa sáng/trưa/tối.
|- **AC2.6**: Trang chi tiết học viên hiển thị biểu đồ và bảng lịch sử đo chỉ số cho từng buổi tập.

## Epic 3: Quản lý huấn luyện viên
|- **AC3.1**: Danh sách coach hiển thị lịch làm việc trong tuần hiện tại.
|- **AC3.2**: Cho phép tạo mới coach với các trường: họ tên, email, chuyên môn, khung giờ làm việc.
|- **AC3.3**: Phân quyền coach truy cập trang coach ngay khi tài khoản được kích hoạt.
|- **AC3.4**: Dashboard coach/admin hiển thị tổng số buổi coach đã thực hiện trong tuần kèm chi tiết từng buổi.

## Epic 4: Quản lý nội dung đào tạo
|- **AC4.1**: Admin có thể tạo bài tập với nhóm bài tập, tên, link youtube hợp lệ.
|- **AC4.2**: Program bao gồm danh sách bài tập và meal plan liên kết.
|- **AC4.3**: Feedback được gắn với học viên và buổi tập cụ thể.

## Epic 5: Lịch và lớp online
|- **AC5.1**: Admin tạo buổi học với thời gian, địa điểm (offline/online), coach, học viên/gói.
|- **AC5.2**: Với lớp online, link Meet/Zoom phải hiển thị trong lịch của admin và coach.
|- **AC5.3**: Thông báo gửi cho coach và học viên trong vòng 5 phút sau khi tạo hoặc thay đổi lịch.
|- **AC5.4**: Lịch 1-1 yêu cầu coach xác nhận trước khi chuyển sang trạng thái "đã xác nhận".

## Epic 6: Trang coach
|- **AC6.1**: Dashboard coach hiển thị tổng số học viên lead/trial/active với điều hướng riêng cho từng tác vụ (dashboard, học viên, lịch, chương trình, thông báo).
|- **AC6.2**: Khi coach chọn một mục trong menu điều hướng, hệ thống tải trang mới tương ứng thay vì cuộn trong một trang tổng hợp.
|- **AC6.3**: Giao diện coach sử dụng phong cách tối giản trắng/đen, loại bỏ icon trang trí và giữ bố cục dạng lưới/khối rõ ràng.
|- **AC6.4**: Menu trái bổ sung icon trực quan (Dashboard, Users, Calendar, Programs, Notifications, Notes) để tăng tính trực quan.
|- **AC6.5**: Coach cập nhật mục tiêu, meal plan và program cá nhân hóa cho từng học viên.
|- **AC6.6**: Coach ghi nhận kết quả buổi tập và phản hồi, hệ thống lưu kèm timestamp.
|- **AC6.7**: Coach nhận thông báo khi học viên hủy buổi tập.

## Epic 7: Lịch drag-drop và thông báo thay đổi
|- **AC7.1**: Lịch làm việc hỗ trợ drag-drop để coach sắp xếp lại buổi tập, thay đổi thời gian (bao gồm kéo dài/rút ngắn thời lượng).
|- **AC7.2**: Khi coach kéo thả hoặc cập nhật buổi tập, hệ thống gửi thông báo tự động cho học viên/khách hàng liên quan trong vòng 5 phút và cập nhật lại lịch theo thời gian thực.
|- **AC7.3**: Giao diện lịch hiển thị rõ buổi tập được chọn (highlight, shadow), trạng thái kéo thả và xung đột thời gian.
|- **AC7.4**: Coach phải nhập lý do thay đổi khi cập nhật buổi tập; lý do được hiển thị trong thông báo gửi đến học viên.

## Epic 8: Thống kê chi tiết
|- **AC8.1**: Trang thống kê riêng hiển thị tổng số buổi tập theo tuần/tháng/năm cho từng học viên và toàn bộ huấn luyện viên.
|- **AC8.2**: Tỷ lệ hoàn thành mục tiêu (%) được tính toán theo từng giai đoạn và hiển thị cùng với biểu đồ tiến độ, có cảnh báo màu khi dưới ngưỡng.
|- **AC8.3**: Đánh giá chất lượng buổi tập dựa trên feedback/ghi chú (1-5 sao) với nhận xét chi tiết và chỉ số trung bình cho từng học viên.
|- **AC8.4**: Coach có thể lọc thống kê theo date range, trạng thái học viên và xuất báo cáo PDF/Excel.
|- **AC8.5**: Cho phép tải về dữ liệu thô (CSV) phục vụ phân tích bổ sung.

## Epic 9: Ghi chú/Nhắc việc
|- **AC9.1**: Coach thêm ghi chú hoặc nhắc việc cho học viên sau buổi tập với loại (pending/in-progress/completed) và mức ưu tiên.
|- **AC9.2**: Ghi chú được lưu kèm timestamp, liên kết với buổi tập hoặc mục tiêu cụ thể, có thể đính kèm tài liệu hoặc liên kết.
|- **AC9.3**: Danh sách ghi chú hiển thị trạng thái, ưu tiên và có thể search, filter theo loại, học viên, mức ưu tiên.
|- **AC9.4**: Cho phép đánh dấu nhắc việc đã hoàn thành ngay từ danh sách và đồng bộ trạng thái về dashboard tổng quan.

## Epic 10: Cải thiện card thông tin HLV
|- **AC10.1**: Thẻ thông tin HLV (Trainer Info) được tách thành các ô nhỏ riêng biệt (email, chuyên môn, chiều cao, cân nặng, kinh nghiệm) với bố cục tối giản.
|- **AC10.2**: Mỗi ô card có icon, nhãn rõ ràng, dữ liệu dễ đọc và tuân theo hệ màu trung tính, tương phản cao.
|- **AC10.3**: Card layout responsive với grid 2-3 cột tuỳ theo kích thước màn hình, đảm bảo khoảng trắng thoáng.
|- **AC10.4**: Thanh điều hướng coach sử dụng icon dạng nét (outline), typography đồng nhất và hỗ trợ trạng thái focus/keyboard.
