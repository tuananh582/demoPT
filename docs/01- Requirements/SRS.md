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
1. **Dashboard doanh thu** (trang `/admin/dashboard`)
   - Hệ thống hiển thị biểu đồ so sánh doanh thu theo tuần/tháng/năm.
   - Admin chọn khoảng thời gian để lọc doanh thu.
   - Dữ liệu hiển thị theo ngày, tháng, năm.
2. **Quản lý học viên** (trang `/admin/trainees`)
   - Admin xem danh sách học viên với các trường: họ tên, email, số điện thoại, trạng thái, gói tập.
   - Admin tạo mới học viên và gán gói tập (nhóm/1-1) thông qua menu chọn từ danh sách gói hiện có.
   - Admin cập nhật thông tin cá nhân, tiến độ hiện tại và lịch sử.
   - Admin chỉnh sửa hoặc xóa/vô hiệu hóa học viên trực tiếp trong bảng quản lý.
   - Hệ thống lưu trữ lịch sử tiến độ gồm: cân nặng, số đo, buổi tập hoàn thành.
3. **Quản lý huấn luyện viên** (trang `/admin/coaches`)
   - Admin xem danh sách huấn luyện viên với lịch làm việc.
   - Admin tạo mới, cập nhật, vô hiệu hóa hoặc xóa huấn luyện viên.
   - Khi tạo/cập nhật, chuyên môn được chọn từ danh mục định nghĩa trước để đảm bảo chuẩn hóa.
   - Hệ thống hiển thị lịch phân công lớp nhóm và 1-1.
4. **Quản lý tài khoản và phân quyền** (trang `/admin/accounts`)
   - Admin tạo tài khoản đăng nhập cho học viên.
   - Admin gán quyền coach (truy cập trang coach) cho huấn luyện viên.
   - Admin chỉnh sửa, khóa/mở khóa hoặc xóa tài khoản khi cần.
5. **Quản lý gói tập** (trang `/admin/packages`)
   - Admin tạo, sửa, xóa gói tập (nhóm, 1-1) với thông tin: tên, mô tả, thời lượng, giá.
   - Admin cập nhật nội dung marketing (mô tả, lợi ích, giá hiển thị) để đồng bộ với trang giới thiệu.
6. **Quản lý dữ liệu danh mục** (trang `/admin/catalog`)
   - CRUD thực phẩm với thông tin dinh dưỡng.
   - CRUD meals, meal mẫu, chương trình luyện tập (program), bài tập, feedback.
7. **Quản lý bài tập (lessons)** (trang `/admin/lessons`)
   - Admin thêm bài tập với trường: nhóm bài tập, tên, link youtube demo, mô tả.
   - Admin chỉnh sửa hoặc xóa bài tập khỏi thư viện tiêu chuẩn.
   - Cho phép gắn bài tập vào program hoặc lesson plan.
8. **Quản lý lớp online** (trang `/admin/schedule`)
   - Admin tạo lịch lớp với link Google Meet/Zoom.
   - Admin sắp xếp lại thứ tự buổi học, chỉnh sửa thông tin (thời gian, link) khi lớp thay đổi.
   - Lịch đồng bộ với huấn luyện viên liên quan.
10. **Trung tâm thông báo realtime** (widget tại `/admin/dashboard`, bảng riêng `/admin/notifications`)
   - Hệ thống kết nối realtime (WebSocket/SSE) để đẩy sự kiện “TraineeRegistered” và “CoachProgressUpdated” ngay sau khi phát sinh.
   - Admin xem danh sách sự kiện mới nhất với khả năng lọc theo loại (học viên, coach, lịch) và đánh dấu đã đọc.
   - Activity feed hỗ trợ phân trang hoặc thanh cuộn để không bỏ lỡ sự kiện cũ.
9. **Quản lý trang marketing PT** (trang `/admin/marketing`)
   - Admin cập nhật nội dung giới thiệu phòng PT: tiêu đề, mô tả, hình ảnh hero, các gói nổi bật và giá hiển thị.
   - Hỗ trợ xem trước trước khi xuất bản để đảm bảo thống nhất thông điệp.
11. **Quản lý quyền truy cập đa vai trò** (trang `/admin/access-control`)
   - Admin định nghĩa quyền chi tiết cho từng nhóm (admin, phó admin, coach lead).
   - Cho phép bật/tắt các đặc quyền (xuất dữ liệu, duyệt thanh toán, chỉnh sửa lịch minh chứng).
   - Lưu audit log cho mỗi thay đổi quyền hạn (người thao tác, thời gian, mô tả thay đổi).

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
6. **Trang thống kê hiệu suất** (trang `/coach/statistics`)
   - Biểu đồ tương tác hiển thị dữ liệu theo ngày/tuần/tháng/năm và lọc theo bộ môn hoặc nhóm chương trình.
   - Người dùng zoom/pan hoặc sử dụng thanh trượt để phóng to khu vực cụ thể; tooltip hiển thị giá trị tại điểm dữ liệu.
   - Cung cấp nút “Xem chi tiết” mở bảng phân tích sâu cho từng chỉ số (ví dụ sự tuân thủ meal plan, cường độ buổi tập).
   - Activity feed của coach gom nhật ký cập nhật, hỗ trợ cuộn riêng và nút “Tải thêm”.

## 4. Yêu cầu phi chức năng
- **Hiệu năng**: Dashboard tải dữ liệu trong < 3 giây với 10k bản ghi.
- **Bảo mật**: Tất cả API yêu cầu xác thực JWT, phân quyền theo vai trò.
- **Khả dụng**: 99,5% uptime hàng tháng.
- **Khả năng mở rộng**: Hỗ trợ đến 500 huấn luyện viên, 10.000 học viên.
- **Khả năng bảo trì**: Mã nguồn tuân theo chuẩn clean architecture.
- **Realtime**: Thời gian đẩy sự kiện mới tới admin < 5 giây kể từ khi phát sinh trong hệ thống.

## 5. Yêu cầu giao diện
- Sử dụng theme trắng đen tối giản, không dùng icon trang trí dư thừa; bố cục dashboard rõ ràng với menu điều hướng sang từng trang chức năng riêng biệt.
- Bảng dữ liệu hỗ trợ tìm kiếm, phân trang, lọc.
- Lịch hỗ trợ xem dạng tuần/tháng và hiển thị link họp.
- Thẻ chỉ số sử dụng màu nền đậm khác nhau để phân loại trạng thái (revenue, học viên, lịch), đảm bảo tương phản với nền xanh nhạt.
- Vùng biểu đồ hiển thị tooltip khi hover, hỗ trợ zoom (nút +/- hoặc kéo) và trạng thái lựa chọn bộ môn.
- Activity feed hiển thị trong cột cuộn độc lập, cung cấp nút “Xem thêm” sau mỗi 10 sự kiện.

## 6. Yêu cầu dữ liệu
- Cơ sở dữ liệu quan hệ lưu trữ thông tin học viên, coach, gói tập, lịch học, meal plan, chương trình, feedback.
- Lịch sử tiến độ lưu trữ dạng time-series.
- Lưu bảng quyền chi tiết (RolePermissions) và bảng ActivityEvents để phục vụ real-time feed và log quyền hạn.

## 7. Tiêu chí chấp nhận chi tiết
- Mọi yêu cầu ở mục 3 có test case xác nhận.
- Quy trình tạo lịch online phải gửi thông báo đến coach trong vòng 5 phút.
- Link họp hiển thị rõ ràng trong lịch và gửi qua email thông báo.
- Sự kiện học viên/coach mới xuất hiện tại widget realtime < 5 giây và có thể đánh dấu đã đọc.
- Trang Access Control ghi nhận audit log mỗi khi cấu hình quyền thay đổi.
- Biểu đồ thống kê cho phép thay đổi timeframe + bộ môn mà không tải lại trang, và tooltip hiển thị chính xác giá trị tại thời điểm được chọn.

## 8. Phụ lục
- Sơ đồ use case, ma trận truy vết được trình bày ở thư mục Supporting.
