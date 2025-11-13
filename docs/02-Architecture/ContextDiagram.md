# System Context Diagram – FitCampus Student Portal

## 1. External Actors
- **Learner (Student):** Tương tác với portal để đăng ký, tập luyện, đặt lịch, tham gia cộng đồng.
- **Mentor/Student Success Coach:** Theo dõi tiến độ, gửi nhắc nhở, điều chỉnh kế hoạch.
- **Wellness Admin (Student Affairs):** Quản lý nội dung, thử thách, báo cáo.
- **Payment Gateway (Stripe/MoMo):** Xử lý thanh toán học viên và hoàn tiền.
- **Campus SSO:** Cung cấp xác thực một lần cho sinh viên.
- **Calendar Providers (Google, Microsoft):** Đồng bộ lịch lớp, gửi lời mời.
- **Notification Services (SendGrid, Twilio, Push):** Gửi email, SMS, thông báo đẩy.
- **Wearable Aggregators (Terra, Apple Health, Google Fit):** Cung cấp dữ liệu vận động khi học viên cho phép.
- **Analytics Warehouse (BigQuery/Snowflake):** Lưu trữ dữ liệu để phân tích nâng cao và KPI.

## 2. Data Flows
1. Learner sử dụng PWA → API Gateway → Services (Onboarding, Training, Scheduling) → PostgreSQL.
2. Membership & perks → Membership service → Payment gateway → Ledger cập nhật → thông báo học viên.
3. Mentors truy cập dashboard → Mentor service → Analytics pipeline → insight cập nhật.
4. Booking phiên học → Scheduling service → Calendar adapter → nhà cung cấp lịch → invites & reminders.
5. Announcements & messaging → Communication service → Notification providers → ghi nhận trạng thái gửi.
6. Wearable webhooks → Integration hub → Analytics service → cập nhật dashboard học viên.
7. Support tickets → Support service → Automation engine → Student success team.

## 3. ASCII Representation
```
         [Payment Gateway]
                ^
                |
 [Notification Services]    [Calendar Providers]
          ^      \            /
          |       \          /
       [Communication]   [Scheduling]
             \            /
              \          /
         [API Gateway & Domain Services]
            /    |      \
           /     |       \
    [Learner] [Mentor] [Wellness Admin]
           \      |       /
            \     |      /
          [Analytics Warehouse]
                ^
                |
        [Wearable Aggregators]
```

## 4. Context Notes
- Portal tập trung vào trải nghiệm học viên; mentor và admin chỉ sử dụng dashboard hỗ trợ.
- Tất cả tích hợp thông qua kết nối bảo mật (OAuth 2.0, HMAC, TLS 1.2+).
- Dữ liệu nhạy cảm (PII, sức khỏe) tuân thủ PDPA, GDPR, FERPA; cross-border flow được kiểm soát.

