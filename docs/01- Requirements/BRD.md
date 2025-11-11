# Tài liệu BRD - Hệ thống quản lý phòng gym trực tuyến

## 1. Mục tiêu dự án
- Xây dựng nền tảng quản trị và huấn luyện viên (coach) để quản lý học viên, gói tập, lịch học và doanh thu.
- Tối ưu hoá vận hành của admin, huấn luyện viên và hỗ trợ học viên đạt mục tiêu tập luyện cá nhân hoá.
- Cung cấp trải nghiệm học viên liền mạch giữa lớp trực tiếp và lớp online qua tích hợp lịch/đường dẫn họp trực tuyến.

## 2. Phạm vi
### 2.1 Phạm vi trong
a. Trang admin
- Dashboard quản lý doanh thu theo ngày/tuần/tháng/năm.
- CRUD học viên, theo dõi tiến độ hiện tại và lịch sử.
- CRUD huấn luyện viên, theo dõi lịch làm việc.
- Quản lý tài khoản: tạo tài khoản học viên, phân quyền huấn luyện viên.
- Khởi tạo gói tập (nhóm, 1-1) và ánh xạ học viên.
- CRUD dữ liệu danh mục: thực phẩm, meals, bài tập, chương trình (program), meal mẫu, feedback.
- CRUD bài tập (lessons) với thông tin nhóm, tên, đường dẫn demo.
- Quản lý lớp online, chèn link Google Meet/Zoom vào lịch.

b. Trang coach
- Dashboard danh sách học viên và trạng thái (lead/trial/active).
- Thiết lập mục tiêu, meal plan và chương trình cá nhân hoá.
- Theo dõi chỉ số, tiến trình, hiệu suất.
- Quản lý lịch làm việc, lớp nhóm, lớp 1-1 với link họp online.
- Nhận thông báo lịch (hủy, sắp tới, yêu cầu đặt lịch). Lớp 1-1 cần xác nhận thủ công.

### 2.2 Phạm vi ngoài
- Không bao gồm cổng thanh toán.
- Không bao gồm ứng dụng di động native.
- Không bao gồm tích hợp thiết bị đeo.

## 3. Lợi ích kinh doanh
- Tăng hiệu quả quản trị doanh thu và học viên.
- Tối ưu phân bổ huấn luyện viên theo lịch làm việc.
- Cải thiện tỷ lệ giữ chân học viên nhờ cá nhân hóa chương trình.
- Giảm tải thủ công thông qua thông báo tự động và quản trị dữ liệu tập trung.

## 4. Các bên liên quan
| Nhóm | Vai trò | Kỳ vọng |
|------|---------|---------|
| Ban điều hành | Phê duyệt | Báo cáo doanh thu, hiệu suất |
| Quản trị viên | Vận hành | Quản lý học viên, huấn luyện viên, nội dung |
| Huấn luyện viên | Cung cấp dịch vụ | Có lịch rõ ràng, dữ liệu học viên đầy đủ |
| Học viên | Khách hàng | Nhận chương trình phù hợp, lịch rõ ràng |
| Đội kỹ thuật | Triển khai | Tài liệu yêu cầu rõ ràng |

## 5. Yêu cầu ở mức cao
1. Cung cấp dashboard doanh thu đa chiều cho admin.
2. Cho phép admin quản lý toàn bộ dữ liệu học viên, huấn luyện viên, gói tập.
3. Cho phép coach quản lý học viên, thiết lập chương trình cá nhân.
4. Hỗ trợ lớp online với link họp tích hợp.
5. Cung cấp thông báo lịch và xác nhận phù hợp từng loại lớp.

## 6. Ràng buộc và giả định
- Hệ thống chạy trên nền tảng web responsive.
- Dữ liệu được lưu trữ trong cơ sở dữ liệu tập trung.
- Hệ thống email/SMS hiện hữu có thể tích hợp gửi thông báo.
- Người dùng có kết nối internet ổn định để tham gia lớp online.

## 7. Tiêu chí chấp nhận ở mức tổng thể
- Admin thao tác CRUD thành công trên mọi đối tượng.
- Dashboard doanh thu hiển thị dữ liệu chính xác theo khoảng thời gian.
- Coach tùy chỉnh chương trình và theo dõi tiến trình theo thời gian thực.
- Lịch lớp online hiển thị link họp chính xác và gửi thông báo đúng thời điểm.

## 8. Kế hoạch đo lường thành công
- 90% thao tác quản trị chuyển từ thủ công sang hệ thống trong 3 tháng.
- Tăng 20% tỷ lệ hoàn thành gói tập của học viên.
- Giảm 30% lỗi đặt lịch/nhầm lịch.
- 80% học viên đánh giá tích cực về chương trình cá nhân hoá.
