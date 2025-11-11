# Sơ đồ ngữ cảnh (mô tả văn bản)

## 1. Tác nhân bên ngoài
- **Admin**: tương tác với hệ thống qua giao diện web để quản trị.
- **Coach**: truy cập giao diện coach.
- **Học viên**: nhận thông báo và tham gia lớp (qua portal khác/ứng dụng di động). 
- **Dịch vụ lịch trực tuyến**: Google Meet, Zoom.
- **Dịch vụ email/SMS**: gửi thông báo.

## 2. Dòng dữ liệu chính
1. Admin gửi yêu cầu quản lý dữ liệu → API xử lý → lưu vào CSDL.
2. Coach nhận dữ liệu học viên → cập nhật mục tiêu/tiến trình.
3. Lịch online đồng bộ link từ admin tới coach/học viên.
4. Thông báo được đẩy ra qua Message Queue → dịch vụ email/SMS.

## 3. Mô tả ASCII
```
[Admin] ----
           \
            \--> [Hệ thống quản lý gym] <-- [Coach]
             \                     \
              \                     --> [Học viên]
               --> [Google Meet/Zoom]
               --> [Email/SMS Service]
```
