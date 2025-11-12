# Kiến trúc hệ thống

## 1. Tổng quan kiến trúc
Hệ thống sử dụng kiến trúc microservice nhẹ kết hợp front-end web (Next.js) và backend API (Node.js/Express hoặc NestJS) kết nối cơ sở dữ liệu quan hệ (PostgreSQL). Các thành phần chính:
- **Client Web**: giao diện admin và coach. Phần admin sử dụng bố cục dashboard nhiều trang, mỗi chức năng chính (doanh thu, học viên, huấn luyện viên, gói tập, danh mục, lịch) có route riêng thay vì gộp chung một màn hình. Các route quản trị chính sử dụng client component để hiển thị form thêm mới học viên/coach/tài khoản, các sheet chỉnh sửa gói và biểu mẫu thêm bài tập ngay trong trang danh sách.
- **API Gateway / Backend**: cung cấp RESTful API cho quản lý người dùng, dữ liệu, lịch.
- **Service quản lý lịch**: xử lý logic lớp học, thông báo.
- **Service báo cáo**: tổng hợp doanh thu.
- **Cơ sở dữ liệu**: PostgreSQL với schema quản lý học viên, coach, chương trình.
- **Message Queue**: (ví dụ RabbitMQ) phục vụ gửi thông báo async.

## 2. Sơ đồ thành phần (mô tả)
```
[Client Admin] --
                \            [Auth Service]
                 >---[API Gateway]---[User Service]---[PostgreSQL]
                /                   \-[Schedule Service]-[Message Queue]-[Notification Worker]
[Client Coach] --                    \-[Reporting Service]
```

## 3. Kiến trúc phân lớp
- **Presentation layer**: Next.js, quản lý routing admin/coach, gọi API. Với admin, mỗi module có page độc lập (ví dụ `/admin/dashboard`, `/admin/trainees`, `/admin/coaches`, `/admin/packages`, `/admin/catalog`, `/admin/schedule`) được điều hướng qua menu. Các page này quản lý state cục bộ cho việc nhập liệu, xác thực cơ bản (bắt buộc họ tên, email, giá gói...), và trigger hành động tải xuống CSV để xuất danh sách.
- **Application layer**: Service xử lý use case (học viên, huấn luyện viên, lịch, báo cáo).
- **Domain layer**: Entity, business rule (gói tập, tiến trình, meal plan).
- **Infrastructure layer**: Repository, ORM (Prisma/TypeORM), queue, adapter lịch.

### 3.1 Luồng thao tác CRUD phía admin
- **Thêm học viên/coach**: người dùng mở form trong client component, nhập thông tin bắt buộc, dữ liệu được validate phía client trước khi gửi POST tới API tương ứng.
- **Tạo tài khoản**: form tạo tài khoản tách biệt, cho phép chọn vai trò và gửi yêu cầu tạo user + phân quyền, đồng thời bổ sung hành động xuất CSV cho danh sách tài khoản.
- **Quản lý gói tập**: danh sách gói hiển thị trong lưới; admin có thể thêm gói mới hoặc mở form chỉnh sửa trên từng thẻ, thao tác lưu gửi POST/PATCH tới Package Service.
- **Thêm bài tập**: form inline thu thập tên, nhóm cơ, link video và dispatch yêu cầu tạo bài tập tới Content Service.

## 4. Kiến trúc dữ liệu
- Sử dụng PostgreSQL.
- Các bảng chính: Users, Roles, Trainees, Coaches, Packages, Programs, Meals, Exercises, Schedules, ProgressLogs, Notifications, Revenues.
- Lịch sử tiến độ lưu bảng ProgressLogs với khóa ngoại tới Trainee.

## 5. Kiến trúc tích hợp
- **Lịch online**: lưu trữ link Google Meet/Zoom và đồng bộ qua API (tùy chọn).
- **Thông báo**: sử dụng email/SMS service thông qua queue.

## 6. Bảo mật
- JWT cho xác thực, refresh token.
- RBAC: vai trò admin, coach, trainee.
- Mã hóa dữ liệu nhạy cảm (mật khẩu, token).
- Audit log cho thao tác CRUD quan trọng.

## 7. Khả năng mở rộng
- API Gateway có thể triển khai dạng container (Docker, Kubernetes).
- Service báo cáo có thể tách riêng để xử lý dữ liệu lớn.
- Sử dụng caching (Redis) cho dashboard doanh thu.

## 8. Chiến lược giám sát
- Logging tập trung (ELK stack).
- Metrics: số lượng buổi học, tỷ lệ hủy, doanh thu theo thời gian.
- Cảnh báo khi queue backlog > ngưỡng hoặc job thất bại.
