# Tài liệu SRS - Hệ thống quản lý phòng gym trực tuyến

## 1. Giới thiệu

### 1.1 Mục đích

Tài liệu mô tả yêu cầu chi tiết cho hệ thống quản lý phòng gym trực tuyến bao gồm hai vai trò chính: admin và coach.

### 1.2 Phạm vi sản phẩm

Hệ thống web cho phép quản lý doanh thu, học viên, huấn luyện viên, nội dung đào tạo và hỗ trợ lịch học online/offline.

### 1.3 Định nghĩa, chữ viết tắt

- CRUD: Create, Read, Update, Delete.
- PT: Personal Trainer (huấn luyện viên).
- KPI: Key Performance Indicator.

## 2. Mô tả tổng quan

### 2.1 Quan điểm sản phẩm

- Ứng dụng web đa vai trò, quản lý dữ liệu tập trung.
- Tích hợp lịch có thể đồng bộ với Google Calendar (tương lai).

### 2.2 Chức năng tổng quát

- Dashboard doanh thu cho admin.
- Quản lý học viên, huấn luyện viên, gói tập, bài tập, meal plan, program.
- Coach quản lý học viên, thiết lập mục tiêu, meal plan, program.
- Theo dõi tiến trình, lịch học, thông báo.

### 2.3 Đặc điểm người dùng

- Admin: người quản lý vận hành.
- Coach: huấn luyện viên cung cấp dịch vụ.
- Học viên: người sử dụng chương trình (truy cập gián tiếp qua portal khác).

### 2.4 Ràng buộc

- Hỗ trợ trình duyệt hiện đại (Chrome, Edge, Firefox, Safari).
- Ngôn ngữ hiển thị: tiếng Việt.
- Bảo mật tuân thủ chuẩn OWASP Top 10.

## 3. Yêu cầu chức năng

### 3.1 Trang admin

1. **Dashboard doanh thu**
   - Hệ thống hiển thị biểu đồ so sánh doanh thu theo tuần/tháng/năm.
   - Admin chọn khoảng thời gian để lọc doanh thu.
   - Dữ liệu hiển thị theo ngày, tháng, năm.
2. **Quản lý học viên**
   - Admin xem danh sách học viên với các trường: họ tên, email, số điện thoại, trạng thái, gói tập.
   - Admin tạo mới học viên và gán gói tập (nhóm/1-1).
   - Admin cập nhật thông tin cá nhân, tiến độ hiện tại và lịch sử.
   - Admin xóa hoặc vô hiệu hóa học viên.
   - Hệ thống lưu trữ lịch sử tiến độ gồm: cân nặng, số đo, buổi tập hoàn thành.
   - Admin tạo và gán thực đơn theo tuần, bao gồm mô tả từng bữa ăn mỗi ngày.
   - Trang chi tiết học viên hiển thị biểu đồ và bảng lịch sử đo chỉ số theo từng buổi tập.
3. **Quản lý huấn luyện viên**
   - Admin xem danh sách huấn luyện viên với lịch làm việc.
   - Admin tạo mới, cập nhật, vô hiệu hóa huấn luyện viên.
   - Hệ thống hiển thị lịch phân công lớp nhóm và 1-1.
   - Dashboard thống kê tổng số buổi mỗi coach đã thực hiện trong tuần hiện tại.
4. **Quản lý tài khoản và phân quyền**
   - Admin tạo tài khoản đăng nhập cho học viên.
   - Admin gán quyền coach (truy cập trang coach) cho huấn luyện viên.
5. **Quản lý gói tập**
   - Admin tạo, sửa, xóa gói tập (nhóm, 1-1) với thông tin: tên, mô tả, thời lượng, giá.
6. **Quản lý dữ liệu danh mục**
   - CRUD thực phẩm với thông tin dinh dưỡng.
   - CRUD meals, meal mẫu, chương trình luyện tập (program), bài tập, feedback.
7. **Quản lý bài tập (lessons)**
   - Admin thêm bài tập với trường: nhóm bài tập, tên, link youtube demo, mô tả.
   - Cho phép gắn bài tập vào program hoặc lesson plan.
8. **Quản lý lớp online**
   - Admin tạo lịch lớp với link Google Meet/Zoom.
   - Lịch đồng bộ với huấn luyện viên liên quan.

### 3.2 Trang coach

1. **Điều hướng đa trang**
   - Menu coach gồm các mục: Tổng quan, Học viên, Lịch làm việc, Chương trình, Thông báo.
   - Khi coach chọn một mục, hệ thống điều hướng sang route riêng thay vì hiển thị tất cả nội dung trong một trang cuộn dài.
   - Menu trái bổ sung icon rõ ràng cho từng mục để tăng tính trực quan.
2. **Dashboard học viên**
   - Trang Tổng quan hiển thị số lượng học viên theo trạng thái lead/trial/active và các chỉ số quan trọng.
   - Cho phép lọc theo trạng thái và truy cập nhanh đến chi tiết học viên.
3. **Thiết lập mục tiêu & chương trình cá nhân**
   - Trang Học viên cho phép coach nhập mục tiêu (giảm cân, tăng cơ...), thời hạn.
   - Coach xây dựng meal plan, program từ danh mục có sẵn hoặc tùy chỉnh.
4. **Theo dõi chỉ số và tiến trình**
   - Trang Học viên hiển thị biểu đồ tiến độ của học viên theo thời gian (cân nặng, số đo, attendance).
   - Coach ghi chú buổi tập, phản hồi từ học viên.
   - Coach truy cập lịch sử đo chỉ số theo từng buổi tập dưới dạng bảng chi tiết.
5. **Quản lý lịch làm việc với drag-drop**
   - Trang Lịch làm việc hiển thị lịch cá nhân (lớp nhóm, 1-1) dưới dạng lịch tương tác hỗ trợ kéo–thả (drag-drop) và điều chỉnh độ dài buổi tập.
   - Coach có thể kéo thả buổi tập để sắp xếp lại lịch, thay đổi thời gian bắt đầu/kết thúc và cập nhật trạng thái.
   - Khi coach thay đổi lịch, hệ thống yêu cầu nhập lý do, gửi thông báo tự động cho học viên/khách hàng liên quan trong vòng 5 phút và đồng bộ lịch theo thời gian thực.
   - Giao diện lịch hiển thị trạng thái drag (highlight, shadow), cảnh báo xung đột thời gian và cho phép hoàn tác thao tác cuối cùng.
   - Coach xác nhận yêu cầu đặt lịch 1-1 từ học viên trước khi trạng thái chuyển sang "đã xác nhận".
   - Coach xem tổng số buổi đã hoàn thành trong tuần kèm danh sách buổi chi tiết, link họp online và lý do thay đổi gần nhất.
6. **Bổ sung mục thống kê chi tiết**
   - Trang thống kê riêng hiển thị tổng số buổi tập đã thực hiện trong tuần/tháng/năm cho từng học viên và tổng hợp theo coach.
   - Hiển thị tỷ lệ hoàn thành mục tiêu của học viên (%) so với kế hoạch theo từng giai đoạn, kèm cảnh báo khi dưới ngưỡng.
   - Đánh giá chất lượng buổi tập dựa trên feedback và ghi chú (số sao, nhận xét chi tiết) và tính trung bình trọng số cho từng học viên.
   - Cho phép coach lọc và so sánh thống kê theo date range, trạng thái học viên, chương trình và xuất báo cáo PDF/Excel.
   - Hỗ trợ tải dữ liệu thô (CSV) để phân tích ngoài hệ thống và lưu lại lịch sử xuất báo cáo.
7. **Tính năng ghi chú/nhắc việc**
   - Coach có thể thêm ghi chú hay nhắc việc cho từng học viên sau mỗi buổi tập, thiết lập mức ưu tiên và thời hạn.
   - Ghi chú được lưu kèm timestamp, liên kết với buổi tập hoặc mục tiêu cụ thể, có thể đính kèm tài liệu hoặc liên kết hữu ích.
   - Hiển thị danh sách ghi chú với trạng thái pending/in-progress/completed, ưu tiên và hỗ trợ search/filter theo học viên, trạng thái, ưu tiên, tag.
   - Coach đánh dấu hoàn thành ngay từ danh sách; trạng thái cập nhật lên dashboard tổng quan và lịch sử thay đổi được lưu lại.
8. **Cải thiện giao diện**
   - Thanh menu trái bổ sung icon dạng nét (outline) cho từng mục (Dashboard, Users, Calendar, Programs, Notifications, Notes) và hỗ trợ trạng thái hover/focus rõ ràng.
   - Thẻ thông tin HLV (Trainer Info Card) được tách thành các ô nhỏ hiển thị riêng biệt (email, chuyên môn, chiều cao, cân nặng, kinh nghiệm...) với bố cục tối giản, màu trung tính và khoảng trắng hợp lý.
   - Sử dụng bố cục card grid với shadow nhẹ, spacing rõ ràng, typography đồng nhất và kích thước tối ưu cho thao tác nhanh.
   - Đảm bảo tính truy cập (accessibility): tương phản màu đáp ứng WCAG AA, hỗ trợ điều hướng bằng bàn phím và mô tả ARIA cho icon quan trọng.
9. **Quản lý chương trình huấn luyện**
   - Trang Chương trình cho phép coach quản lý meal plan, program và tài liệu liên quan.
10. **Thông báo**

- Trang Thông báo hiển thị cập nhật về lịch bị hủy, lịch sắp tới, yêu cầu đặt lịch mới.

## 4. Yêu cầu phi chức năng

- **Hiệu năng**: Dashboard tải dữ liệu trong < 3 giây với 10k bản ghi.
- **Bảo mật**: Tất cả API yêu cầu xác thực JWT, phân quyền theo vai trò.
- **Khả dụng**: 99,5% uptime hàng tháng.
- **Khả năng mở rộng**: Hỗ trợ đến 500 huấn luyện viên, 10.000 học viên.
- **Khả năng bảo trì**: Mã nguồn tuân theo chuẩn clean architecture.

## 5. Yêu cầu giao diện

- Giao diện coach sử dụng phong cách tối giản với bảng màu trung tính (trắng/đen/xám nhạt) và điểm nhấn giới hạn, ưu tiên typography rõ ràng và khả năng đọc.
- Các trang thuộc coach dashboard cần bố cục dạng lưới hoặc cột rõ ràng, khoảng cách đủ để thao tác nhanh, hỗ trợ dark mode tối giản.
- Bảng dữ liệu hỗ trợ tìm kiếm, phân trang, lọc, hiển thị trạng thái bằng màu tương phản cao và icon dạng nét có mô tả.
- Lịch hỗ trợ xem dạng tuần/tháng, hiển thị link họp, lý do thay đổi gần nhất và trạng thái xác nhận.

## 6. Yêu cầu dữ liệu

- Cơ sở dữ liệu quan hệ lưu trữ thông tin học viên, coach, gói tập, lịch học, meal plan, chương trình, feedback.
- Lịch sử tiến độ lưu trữ dạng time-series.

## 7. Tiêu chí chấp nhận chi tiết

- Mọi yêu cầu ở mục 3 có test case xác nhận.
- Quy trình tạo lịch online phải gửi thông báo đến coach trong vòng 5 phút.
- Link họp hiển thị rõ ràng trong lịch và gửi qua email thông báo.

## 8. Phụ lục

- Sơ đồ use case, ma trận truy vết được trình bày ở thư mục Supporting.
