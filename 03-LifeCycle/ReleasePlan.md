# Kế hoạch phát hành

## 1. Mốc thời gian
| Sprint | Thời gian | Phạm vi chính |
|--------|-----------|---------------|
| Sprint 0 | Tuần 1-2 | Thiết lập môi trường, kiến trúc, backlog chi tiết |
| Sprint 1 | Tuần 3-4 | Auth, phân quyền, quản lý tài khoản |
| Sprint 2 | Tuần 5-6 | Dashboard doanh thu, quản lý học viên |
| Sprint 3 | Tuần 7-8 | Quản lý coach, gói tập, nội dung bài tập |
| Sprint 4 | Tuần 9-10 | Lịch học, thông báo, tích hợp link online |
| Hardening | Tuần 11 | UAT, hiệu năng, sửa bug |
| Go-Live | Tuần 12 | Triển khai production |

## 2. Tiêu chí Go/No-Go
- Hoàn tất 100% test case ưu tiên cao.
- Không còn bug nghiêm trọng (P0, P1).
- Đào tạo admin và coach xong.
- Hệ thống giám sát, backup được thiết lập.

## 3. Kế hoạch rollback
- Snapshot database trước khi deploy.
- Giữ phiên bản backend/front-end cũ trên environment dự phòng.
- Khôi phục trong vòng 1 giờ nếu phát sinh sự cố nghiêm trọng.

## 4. Hoạt động sau phát hành
- Theo dõi lỗi thực tế 2 tuần đầu.
- Thu thập phản hồi để lên backlog sprint cải tiến.
- Đánh giá KPI: tỷ lệ sử dụng dashboard, số lịch được tạo, tỷ lệ hủy.
