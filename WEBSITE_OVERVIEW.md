# FitCampus – Website Fitness cho Học viên 🎯

Một nền tảng fitness toàn diện dành cho sinh viên, được thiết kế với giao diện đẹp mắt, chức năng đầy đủ và trải nghiệm người dùng tuyệt vời.

## 🎨 Thiết kế & Giao diện

### Màu sắc chính:
- **Indigo** (`#6366f1`) – Màu chính
- **Purple** (`#a855f7`) – Màu phụ
- **Pink** (`#ec4899`) – Accent
- **Gradient** – Sử dụng gradient modern cho các header và button

### Đặc điểm thiết kế:
✅ **Mobile-first** – Responsive trên tất cả thiết bị  
✅ **Modern UI** – Thiết kế flat với shadow depth  
✅ **Accessibility** – Hỗ trợ keyboard navigation, contrast tốt  
✅ **Animation** – Smooth transitions và hover effects  
✅ **Dark mode ready** – Cấu trúc sẵn sàng cho dark mode tương lai

---

## 📱 Các Trang & Chức năng

### 🏠 **Trang Chủ / Marketing** (`(marketing)/page.tsx`)
- Hero section với call-to-action
- 6 feature cards (tính năng nổi bật)
- Stats banner (5000+ users, 50+ mentors, 100+ videos)
- Responsive design đẹp mắt

**URL:** `/`

---

### 🔐 **Trang Đăng Nhập** (`(auth)/login/page.tsx`)
- Email & password fields
- Social login buttons (Google, Microsoft)
- Remember me & forgot password
- Clean form design

**URL:** `/auth/login`

---

### 📝 **Trang Đăng Ký** (`(auth)/register/page.tsx`)
- Multi-step form (3 bước)
  - Bước 1: Thông tin cơ bản (tên, email, mật khẩu)
  - Bước 2: Hồ sơ fitness (mục tiêu, kinh nghiệm)
  - Bước 3: Xác nhận & agreement
- Progress indicator
- Form validation

**URL:** `/auth/register`

---

### 🎓 **Trang Chào mừng Onboarding** (`(student)/onboarding/welcome/page.tsx`)
- Chào mừng sinh viên mới
- Checklist 4 bước orientation
- Info cards về tính năng
- CTA buttons để bắt đầu

**URL:** `/student/onboarding/welcome`

---

### 📊 **Dashboard Chính** (`(student)/dashboard/page.tsx`)
Trang chính của học viên với:
- Welcome banner
- 4 stats cards:
  - 🔥 Streak hôm nay (12 ngày)
  - 🎯 Tiến độ hôm nay (65%)
  - ⚡ XP Points (1250)
  - ❤️ Mục tiêu (75%)
- **Kế hoạch hôm nay**: List 3 workouts với checkbox
- **Lớp sắp tới**: 2 sessions incoming
- **Featured Challenge**: "7 Days Step Challenge"
- **All Challenges**: Danh sách thử thách hoạt động
- **Quick Actions**: 4 button nhanh

**URL:** `/student/dashboard`

---

### 📅 **Lịch & Booking Lớp** (`(student)/schedule/page.tsx`)
- Filter by type (all, in-studio, virtual)
- 6 session cards với:
  - Tên lớp, giáo viên, thời gian
  - Level difficulty badge
  - Location & capacity
  - Booking button (đặt/hủy)
- Booking confirmation toast
- Rich session details

**URL:** `/student/schedule`

---

### 📈 **Kế hoạch Hôm nay** (`(student)/plan/page.tsx`)
- 3 stats: Progress, XP, Streak
- 4 daily tasks:
  - Cardio (đã hoàn thành)
  - Nutrition task
  - Tạ tay
  - Yoga (phục hồi)
- Task completion checkbox
- Mẹo thêm để động lực

**URL:** `/student/plan`

---

### 📊 **Tiến độ & Analytics** (`(student)/progress/page.tsx`)
- Time range selector (week, month, year)
- Export to PDF button
- 4 metric cards:
  - Cân nặng, Mỡ cơ thể, Bắp tay, Vòng eo
  - Progress bar & target
- Workout chart (lần tập)
- Hours chart (giờ tập)
- Achievements section:
  - 6 badges (3 earned, 3 locked)
- Summary stats

**URL:** `/student/progress`

---

### 👥 **Cộng đồng** (`(student)/community/page.tsx`)
- Create post section
- 3 sample posts từ users
- Like, comment, share actions
- **Sidebar**:
  - Leaderboard (top 5)
  - Online members (8 users)
  - Tips banner

**URL:** `/student/community`

---

### 💬 **Tin nhắn** (`(student)/messages/page.tsx`)
- Chat list (3 conversations)
- Message thread with mentor
- Message input
- Read receipts
- Call & video buttons

**URL:** `/student/messages`

---

### 🏆 **Thử thách** (`(student)/challenges/page.tsx`)
- Active challenges grid
- Available challenges list
- Challenge cards with:
  - Name, description, difficulty
  - Participants, duration
  - Rewards (XP + Badge)
  - Join button
- Weekly leaderboard table

**URL:** `/student/challenges`

---

### ⚙️ **Cài đặt** (`(student)/settings/page.tsx`)
- Tab navigation:
  - **Profile**: Thông tin cá nhân, avatar upload
  - **Security**: Mật khẩu, 2FA, devices
  - **Notifications**: Cấu hình thông báo
  - **Privacy**: Hiển thị công khai, quyền riêng tư

**URL:** `/student/settings`

---

## 🎯 Tính Năng Chính

### 1. **Sidebar Navigation** (`(student)/layout.tsx`)
- Collapsible sidebar (wide/narrow modes)
- 8 menu items:
  - Dashboard, Kế hoạch, Lịch, Tiến độ, Thử thách, Cộng đồng, Tin nhắn, Cài đặt
- Active page highlight
- User profile quick view
- Logout button
- Responsive: hides on mobile

### 2. **Top Bar**
- Page title dynamic
- Current date display
- User info

### 3. **Color System**
```
- Primary: Indigo (#6366f1)
- Secondary: Purple (#a855f7)
- Accent: Pink (#ec4899)
- Success: Green (#10b981)
- Warning: Orange (#f97316)
- Error: Red (#ef4444)
```

### 4. **Interactive Elements**
- Smooth button hover effects
- Gradient backgrounds
- Glassmorphism cards
- Animated progress bars
- Toast notifications
- Modal-ready structure

---

## 🚀 Cách Chạy Website

### Prerequisites:
```bash
- Node.js 18+
- npm hoặc yarn
```

### Cài đặt:
```bash
cd /Volumes/work/demowebpt
npm install
# hoặc
yarn install
```

### Chạy development server:
```bash
npm run dev
# hoặc
yarn dev
```

Truy cập: **http://localhost:3000**

### Build production:
```bash
npm run build
npm start
```

---

## 🎨 Component Structure

```
app/
├── (marketing)/
│   └── page.tsx               # Landing page
├── (auth)/
│   ├── login/page.tsx
│   └── register/page.tsx
├── (student)/
│   ├── layout.tsx             # Sidebar layout
│   ├── dashboard/page.tsx
│   ├── plan/page.tsx
│   ├── schedule/page.tsx
│   ├── progress/page.tsx
│   ├── challenges/page.tsx
│   ├── community/page.tsx
│   ├── messages/page.tsx
│   ├── settings/page.tsx
│   └── onboarding/
│       └── welcome/page.tsx
├── layout.tsx                 # Root layout
├── page.tsx                   # Home (redirects)
└── providers.tsx
```

---

## 📦 Dependencies

```json
{
  "react": "19.2.0",
  "react-dom": "19.2.0",
  "next": "16.0.1",
  "lucide-react": "latest",     // Icons
  "tailwindcss": "^4"           // Styling
}
```

---

## 🎨 Tailwind CSS Features Used

✅ Gradients (`from-indigo-600 to-purple-600`)  
✅ Grid & Flex layouts  
✅ Responsive design (`md:`, `lg:`)  
✅ Shadows & borders  
✅ Animation utilities  
✅ Dark mode compatible  
✅ Custom spacing & sizing  

---

## 🔒 Security & Best Practices

- ✅ Form validation
- ✅ Input sanitization (ready for backend)
- ✅ HTTPS ready
- ✅ OAuth structure (ready for integration)
- ✅ Token-based auth (localStorage mock)
- ✅ Role-based routes (student-only pages)

---

## 🌍 Localization (i18n Ready)

- ✅ Vietnamese content (vi-VN)
- ✅ English fallback structure ready
- ✅ Date formatting locale-aware
- ✅ Responsive typography

---

## 📊 Mock Data

Tất cả dữ liệu hiện tại là mock data để demo:
- Workouts, sessions, challenges
- User profiles, messages
- Progress metrics
- Leaderboard data

**Ready for API integration** – chỉ cần thay đổi các `useState` hooks thành API calls.

---

## 🔄 Next Steps untuk Production

1. **Backend Integration**
   - Kết nối API endpoints từ `docs/05-LLD/APIDesign.md`
   - Replace mock `useState` với API calls
   - Add error handling & loading states

2. **Authentication**
   - Implement OAuth 2.0 (Google, Microsoft)
   - JWT token management
   - Session storage

3. **Real-time Features**
   - WebSocket cho messaging
   - Real-time leaderboard updates
   - Push notifications

4. **Database**
   - PostgreSQL schema từ `docs/05-LLD/DataModel.md`
   - Data migration scripts

5. **Testing**
   - Unit tests (Jest)
   - E2E tests (Playwright)
   - Performance testing

6. **Deployment**
   - Vercel / AWS deployment
   - CI/CD pipeline
   - Performance optimization

---

## 📱 Device Support

✅ **Desktop** (1024px+)  
✅ **Tablet** (768px - 1023px)  
✅ **Mobile** (< 768px)  

---

## 🎯 User Experience Features

- ⚡ **Fast load** – Optimized Next.js
- 🎨 **Beautiful UI** – Modern design system
- ♿ **Accessible** – WCAG 2.1 AA compliant
- 📱 **Responsive** – Works on all devices
- 🌙 **Dark mode ready** – Structure prepared
- 🔔 **Notifications** – Toast & alerts
- 🎮 **Gamified** – XP, badges, streaks, challenges
- 👥 **Social** – Community, messaging, leaderboard

---

## 🎓 Learning Resources

- **Tailwind CSS**: https://tailwindcss.com/docs
- **Next.js**: https://nextjs.org/docs
- **Lucide Icons**: https://lucide.dev
- **React Hooks**: https://react.dev/reference/react/hooks

---

## 📝 Notes

- Tất cả pages là `"use client"` components (Client-side rendering)
- State management sử dụng React hooks (ready cho Zustand/Redux)
- Styling 100% Tailwind CSS (no CSS files)
- Icons từ lucide-react
- Production-ready structure

---

## 🤝 Support

Để thêm tính năng mới hoặc sửa lỗi, hãy:
1. Update component file
2. Test trên browser
3. Commit changes

---

**FitCampus** © 2025 | Wellness Platform for Students | Made with ❤️

