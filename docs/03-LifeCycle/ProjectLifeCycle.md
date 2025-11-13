# Project Life Cycle – FitCampus Student Portal

## 1. Initiation Phase
- Tổ chức workshop với Student Affairs, Wellness team, mentor sinh viên, IT để thống nhất tầm nhìn và KPI (ENG, RET, CLS).
- Thiết lập charter dự án, ngân sách theo năm học, committee điều phối chiến lược.
- Khởi tạo risk register tập trung vào adoption, bảo mật dữ liệu, timeline tích hợp.

## 2. Discovery & Analysis
- Thu thập yêu cầu học viên, mentor, admin thông qua phỏng vấn, khảo sát.
- Map journey học viên (orientation → membership → training → cộng đồng).
- Phân tích ràng buộc pháp lý (PDPA, GDPR, FERPA) và chính sách campus.
- Định nghĩa dữ liệu, KPI, và tích hợp cần thiết (SSO, payment, wearable).

## 3. Design Phase
- Thiết kế UX mobile-first cho learner, console cho mentor/admin; kiểm tra accessibility sớm.
- Hoàn thiện kiến trúc kỹ thuật, mô hình dữ liệu, contracts API, và event bus.
- Xây dựng chiến lược kiểm thử (unit, integration, e2e, performance, accessibility, security) và kế hoạch monitoring.

## 4. Implementation Phase
- Chạy sprint Scrum 2 tuần, ưu tiên Epic LRN/MEM/PLAN cho Release 1.
- Thiết lập CI/CD với feature flag, automated tests, security scan, chất lượng code.
- Sprint review với sinh viên thử nghiệm và đội ngũ wellness; tinh chỉnh backlog.

## 5. Verification Phase
- QA đầy đủ: functional, regression, performance k6, accessibility axe/manual, security (SAST/DAST/pen test).
- UAT với nhóm sinh viên đại diện (dorm khác nhau, năm học khác nhau) và mentor.
- Xác nhận tài liệu hỗ trợ (HDSD, video hướng dẫn, FAQ) được cập nhật.

## 6. Deployment Phase
- Thực hiện go/no-go review dựa trên tiêu chí ReleasePlan.md (SLA, bug severity, đào tạo).
- Triển khai blue/green, giám sát thời gian thực, mở kênh hypercare (chat + hotline) 2 tuần đầu.
- Gửi thông báo launch qua email, portal campus, social media sinh viên.

## 7. Operations & Continuous Improvement
- Theo dõi KPI trong dashboards (weekly active, orientation completion, class fill rate, challenge participation).
- Thu thập phản hồi qua khảo sát trong app và mentor check-ins; đưa vào backlog cải tiến.
- Thực hiện kiểm tra bảo mật định kỳ, audit dữ liệu, tối ưu hiệu năng.
- Lập kế hoạch nâng cấp (wearable mở rộng, tích hợp LMS, native app) dựa trên dữ liệu sử dụng.

