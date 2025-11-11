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
3. **Quản lý huấn luyện viên**
   - Admin xem danh sách huấn luyện viên với lịch làm việc.
   - Admin tạo mới, cập nhật, vô hiệu hóa huấn luyện viên.
   - Hệ thống hiển thị lịch phân công lớp nhóm và 1-1.
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
1. **Dashboard học viên**
   - Hiển thị danh sách học viên gán cho coach với trạng thái lead/trial/active.
   - Cho phép lọc theo trạng thái.
2. **Thiết lập mục tiêu & chương trình cá nhân**
   - Coach nhập mục tiêu (giảm cân, tăng cơ...), thời hạn.
   - Coach xây dựng meal plan, program từ danh mục có sẵn hoặc tùy chỉnh.
3. **Theo dõi chỉ số và tiến trình**
   - Coach xem biểu đồ tiến độ của học viên theo thời gian (cân nặng, số đo, attendance).
   - Coach ghi chú buổi tập, phản hồi từ học viên.
4. **Quản lý lịch làm việc**
   - Coach xem lịch cá nhân (lớp nhóm, 1-1) và các link họp online tương ứng.
   - Coach xác nhận yêu cầu đặt lịch 1-1 từ học viên.
5. **Thông báo**
   - Coach nhận thông báo về lịch bị hủy, lịch sắp tới, yêu cầu đặt lịch mới.

## 4. Yêu cầu phi chức năng
- **Hiệu năng**: Dashboard tải dữ liệu trong < 3 giây với 10k bản ghi.
- **Bảo mật**: Tất cả API yêu cầu xác thực JWT, phân quyền theo vai trò.
- **Khả dụng**: 99,5% uptime hàng tháng.
- **Khả năng mở rộng**: Hỗ trợ đến 500 huấn luyện viên, 10.000 học viên.
- **Khả năng bảo trì**: Mã nguồn tuân theo chuẩn clean architecture.

## 5. Yêu cầu giao diện
- Sử dụng theme màu chuyên nghiệp, dashboard trực quan.
- Bảng dữ liệu hỗ trợ tìm kiếm, phân trang, lọc.
- Lịch hỗ trợ xem dạng tuần/tháng và hiển thị link họp.

## 6. Yêu cầu dữ liệu
- Cơ sở dữ liệu quan hệ lưu trữ thông tin học viên, coach, gói tập, lịch học, meal plan, chương trình, feedback.
- Lịch sử tiến độ lưu trữ dạng time-series.

## 7. Tiêu chí chấp nhận chi tiết
- Mọi yêu cầu ở mục 3 có test case xác nhận.
- Quy trình tạo lịch online phải gửi thông báo đến coach trong vòng 5 phút.
- Link họp hiển thị rõ ràng trong lịch và gửi qua email thông báo.

## 8. Phụ lục
- Sơ đồ use case, ma trận truy vết được trình bày ở thư mục Supporting.
