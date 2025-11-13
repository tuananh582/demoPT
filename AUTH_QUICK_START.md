# 🔐 Authentication Quick Start

## ⚡ 30-Second Setup

### **Step 1: Open in Browser**
```
http://localhost:3000/auth/login
```

### **Step 2: Click Demo Account**
Scroll down and click any blue button:
- `student1@fitcampus.edu`
- `student2@fitcampus.edu`
- `student3@fitcampus.edu`

### **Step 3: Click "Đăng nhập"**
✅ You're now logged in!

---

## 🎯 Demo Accounts

```
Email:    student1@fitcampus.edu
Password: password123
Name:     Nguyễn Văn A

Email:    student2@fitcampus.edu
Password: password123
Name:     Trần Thị B

Email:    student3@fitcampus.edu
Password: password123
Name:     Lê Hoàng C
```

All accounts have the same password: **`password123`**

---

## 📍 Key Routes

| URL | Access | Status |
|-----|--------|--------|
| `http://localhost:3000/` | Everyone | 307 → redirects to /landing |
| `http://localhost:3000/landing` | Everyone | ✅ Public |
| `http://localhost:3000/auth/login` | Everyone | ✅ Public |
| `http://localhost:3000/auth/register` | Everyone | ✅ Public |
| `http://localhost:3000/student/dashboard` | **Login Required** | 🔒 Protected |
| `http://localhost:3000/student/schedule` | **Login Required** | 🔒 Protected |
| `http://localhost:3000/student/progress` | **Login Required** | 🔒 Protected |

---

## 🧪 Quick Tests

### Test 1: Try Logging In
```
1. Go to /auth/login
2. Click "student1@fitcampus.edu"
3. Click "Đăng nhập"
4. See dashboard ✅
```

### Test 2: Try Without Login
```
1. Go to /student/dashboard
2. See login redirect ✅
```

### Test 3: Try Logout
```
1. After login, click sidebar
2. Click user profile area
3. Click "Đăng xuất"
4. Redirected to login ✅
```

### Test 4: Wrong Password
```
1. Go to /auth/login
2. Enter: student1@fitcampus.edu / wrong
3. Click "Đăng nhập"
4. See error message ✅
```

---

## 📋 Accounts Behavior

✅ **Login Works With:**
- `student1@fitcampus.edu` + `password123`
- `student2@fitcampus.edu` + `password123`
- `student3@fitcampus.edu` + `password123`

❌ **Login Fails With:**
- Wrong email (not in demo accounts)
- Wrong password
- Empty fields

---

## 🎨 UI Features

### Login Page
- 📝 Demo account buttons (blue box)
- 👁 Show/hide password toggle
- ⚠️ Error messages displayed
- 📱 Responsive design

### Dashboard (After Login)
- 👤 User profile in sidebar
- 🖼️ Auto-generated avatar
- 🚪 Logout button
- 📊 Student pages accessible

---

## 💾 Where Data Stored

- **Sessions:** Browser's `localStorage`
- **Key:** `fitcampus_session`
- **Expiry:** 24 hours
- **Auto-clear:** On logout

---

## 🆘 Troubleshooting

| Problem | Solution |
|---------|----------|
| Demo buttons not showing | Refresh page (Cmd+R) |
| "Wrong password" error | Use `password123` |
| Still see login after clicking | Wait 2 seconds and refresh |
| Session not working | Clear localStorage and login again |

---

## 📚 More Info

For detailed documentation, see:
- **LOGIN_GUIDE.md** - Complete login guide
- **AUTHENTICATION_SETUP.md** - Technical details
- **ROUTE_FIXES.md** - Route organization

---

## ✨ You're Ready!

```
👉 Open: http://localhost:3000/auth/login
👉 Click: Any demo account
👉 Enjoy: Full access to student portal!
```

🎉 **That's it!** You're all set to explore the FitCampus student portal.

