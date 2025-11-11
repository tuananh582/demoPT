# Kiến trúc hệ thống

## 1. Tổng quan kiến trúc
Hệ thống sử dụng kiến trúc microservice nhẹ kết hợp front-end web (Next.js) và backend API (Node.js/Express hoặc NestJS) kết nối cơ sở dữ liệu quan hệ (PostgreSQL). Các thành phần chính:
- **Client Web**: giao diện admin và coach.
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
- **Presentation layer**: Next.js, quản lý routing admin/coach, gọi API.
- **Application layer**: Service xử lý use case (học viên, huấn luyện viên, lịch, báo cáo).
- **Domain layer**: Entity, business rule (gói tập, tiến trình, meal plan).
- **Infrastructure layer**: Repository, ORM (Prisma/TypeORM), queue, adapter lịch.

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
