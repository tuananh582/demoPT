# 🔐 Login Guide - FitCampus Student Portal

## Website URL
```
http://localhost:3000
```

---

## 📝 Demo Accounts (Pre-configured for Testing)

The website includes 3 demo student accounts for testing purposes. All accounts use the same password:

| Email | Name | Password | Avatar |
|-------|------|----------|--------|
| `student1@fitcampus.edu` | Nguyễn Văn A | `password123` | 👨 |
| `student2@fitcampus.edu` | Trần Thị B | `password123` | 👩 |
| `student3@fitcampus.edu` | Lê Hoàng C | `password123` | 👨 |

---

## 🚀 How to Login

### **Option 1: Quick Login with Demo Account (Recommended)**
1. Go to **http://localhost:3000/auth/login**
2. You'll see a blue box with "📝 Tài khoản demo"
3. Click any demo account email (e.g., `student1@fitcampus.edu`)
4. The email and password will auto-fill
5. Click **"Đăng nhập"** button
6. You'll be redirected to the student dashboard

### **Option 2: Manual Login**
1. Go to **http://localhost:3000/auth/login**
2. Enter email: `student1@fitcampus.edu`
3. Enter password: `password123`
4. Click **"Đăng nhập"**

### **Option 3: Register New Account**
1. Go to **http://localhost:3000/auth/register**
2. Fill in:
   - Full Name (any name)
   - Email (any email format)
   - Password (min 6 characters)
   - Confirm Password
3. Select fitness goals and experience level
4. Check the consent checkbox
5. Click **"Đăng ký"**
6. Auto-login to dashboard

---

## 📊 Protected Routes (Require Login)

After logging in, you can access:

| Route | Page | Features |
|-------|------|----------|
| `/student/dashboard` | 📊 Dashboard | Personal stats, quick access |
| `/student/plan` | ⚡ Daily Plan | Today's workout plan |
| `/student/schedule` | 📅 Class Schedule | Book fitness classes |
| `/student/progress` | 📈 Progress | Track improvements |
| `/student/challenges` | 🏆 Challenges | Join community challenges |
| `/student/community` | 👥 Community | Connect with other students |
| `/student/messages` | 💬 Messages | Chat with mentors |
| `/student/settings` | ⚙️ Settings | Account settings |

---

## 🔑 Features Implemented

✅ **Authentication System**
- Login/Register pages with real validation
- Session management using localStorage
- Demo account buttons for quick testing
- Error messages for invalid credentials

✅ **Protected Routes**
- Middleware checks authentication
- Non-authenticated users redirected to login
- Session-based access control

✅ **User Profile**
- Auto-generated avatars using DiceBear API
- User info displayed in sidebar
- Logout functionality

✅ **Error Handling**
- Invalid email/password validation
- Password confirmation check
- Duplicate email prevention
- User-friendly error messages

---

## 📋 Technical Implementation

### **Architecture**
```
Authentication Flow:
User → Login Page → Validation → Session Storage → Protected Routes
                                           ↓
                                   Sidebar (with user info)
                                   Logout button
```

### **Session Storage**
- Sessions stored in `localStorage`
- Session key: `fitcampus_session`
- Auto-expires after 24 hours
- Contains user ID, name, email, avatar

### **Demo Accounts (Mock Database)**
Located in: `/app/lib/auth.ts`
- 3 pre-configured accounts
- Password validation
- Auto-login after registration

### **Protected Route Component**
Located in: `/app/components/protected-route.tsx`
- Wraps student layout
- Checks for active session
- Redirects to login if no session
- Shows loading state during check

### **Auth Context**
Located in: `/app/context/auth-context.tsx`
- Global user state management
- Provides `useAuth()` hook
- Logout method

---

## 🧪 Testing Scenarios

### **Scenario 1: Successful Login**
1. Navigate to `/auth/login`
2. Click demo account
3. Click Đăng nhập
4. ✅ Redirected to dashboard

### **Scenario 2: Invalid Credentials**
1. Navigate to `/auth/login`
2. Enter wrong email or password
3. Click Đăng nhập
4. ✅ Error message shows: "Email hoặc mật khẩu không đúng"

### **Scenario 3: Access Protected Route Without Login**
1. Clear localStorage (DevTools > Application)
2. Navigate to `/student/dashboard`
3. ✅ Redirected to login page

### **Scenario 4: Logout**
1. Login to dashboard
2. Click sidebar menu (left side)
3. Click user info at bottom
4. Click "Đăng xuất" button
5. ✅ Redirected to login, session cleared

### **Scenario 5: New Registration**
1. Navigate to `/auth/register`
2. Fill all fields
3. Click through steps
4. ✅ Auto-login and redirected to dashboard

---

## 🛠️ Troubleshooting

| Issue | Solution |
|-------|----------|
| Demo buttons not showing | Hard refresh (Cmd+Shift+R) |
| Session not persisting | Check localStorage not cleared |
| Still see login after clicking button | Middleware may be caching - refresh page |
| 404 on student routes | Make sure you're logged in first |
| Wrong user showing | Clear localStorage: `localStorage.clear()` |

---

## 📚 Files Reference

| File | Purpose |
|------|---------|
| `/app/lib/auth.ts` | Authentication logic, demo accounts |
| `/app/context/auth-context.tsx` | Global auth state |
| `/app/components/protected-route.tsx` | Route protection wrapper |
| `/app/auth/login/page.tsx` | Login UI & logic |
| `/app/auth/register/page.tsx` | Registration UI & logic |
| `/app/student/layout.tsx` | Student layout with sidebar |
| `/middleware.ts` | Route protection middleware |
| `/app/providers.tsx` | App providers (AuthProvider) |

---

## 🎯 Next Steps (Production Ready)

To make this production-ready, implement:

1. **Real Backend API**
   - Node.js + Express / NestJS
   - PostgreSQL database
   - JWT authentication

2. **Security**
   - Move auth to HTTP-only cookies
   - Add CSRF protection
   - Implement refresh token rotation

3. **Database Schema**
   - Users table with hashed passwords
   - Session management
   - User profile data

4. **API Endpoints**
   - `POST /api/auth/register` - New registration
   - `POST /api/auth/login` - User login
   - `POST /api/auth/logout` - User logout
   - `POST /api/auth/refresh` - Token refresh
   - `GET /api/auth/me` - Current user

5. **Enhanced Features**
   - Email verification
   - Password reset
   - 2FA (Two-Factor Authentication)
   - OAuth integrations (Google, Microsoft)
   - Role-based access control (RBAC)

---

## 💡 Demo Experience

**Best way to experience the app:**
1. Login with `student1@fitcampus.edu`
2. Explore the dashboard
3. Click through different pages
4. Check sidebar and navigation
5. Try the logout button
6. See the login redirect

**Recommended flow:**
```
Landing → Login → Dashboard → Schedule → Progress → Challenges → Logout
```

---

**Created:** November 13, 2025  
**Version:** 1.0.0 (Demo)  
**Status:** ✅ Fully Functional

