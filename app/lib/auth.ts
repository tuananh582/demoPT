// Simple auth service using localStorage
// This is a mock implementation for demonstration
// In production, use proper backend authentication with JWT

export const DEMO_ACCOUNTS = [
  {
    id: "1",
    email: "student1@fitcampus.edu",
    password: "password123",
    name: "Nguyễn Văn A",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=student1",
  },
  {
    id: "2",
    email: "student2@fitcampus.edu",
    password: "password123",
    name: "Trần Thị B",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=student2",
  },
  {
    id: "3",
    email: "student3@fitcampus.edu",
    password: "password123",
    name: "Lê Hoàng C",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=student3",
  },
];

export interface User {
  id: string;
  email: string;
  name: string;
  avatar: string;
}

export interface AuthSession {
  user: User;
  token: string;
  expiresAt: number;
}

const SESSION_KEY = "fitcampus_session";
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours

// Get current session from localStorage
export const getSession = (): AuthSession | null => {
  if (typeof window === "undefined") return null;

  const sessionStr = localStorage.getItem(SESSION_KEY);
  if (!sessionStr) return null;

  try {
    const session: AuthSession = JSON.parse(sessionStr);
    // Check if session expired
    if (session.expiresAt < Date.now()) {
      localStorage.removeItem(SESSION_KEY);
      return null;
    }
    return session;
  } catch {
    return null;
  }
};

// Login with email and password
export const login = async (
  email: string,
  password: string
): Promise<{ success: boolean; user?: User; error?: string }> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const account = DEMO_ACCOUNTS.find(
    (acc) => acc.email === email && acc.password === password
  );

  if (!account) {
    return {
      success: false,
      error: "Email hoặc mật khẩu không đúng",
    };
  }

  const user: User = {
    id: account.id,
    email: account.email,
    name: account.name,
    avatar: account.avatar,
  };

  const token = `token_${account.id}_${Date.now()}`;
  const session: AuthSession = {
    user,
    token,
    expiresAt: Date.now() + SESSION_DURATION,
  };

  if (typeof window !== "undefined") {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  }

  return { success: true, user };
};

// Register new account
export const register = async (
  email: string,
  password: string,
  name: string
): Promise<{ success: boolean; user?: User; error?: string }> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Check if email already exists
  if (DEMO_ACCOUNTS.some((acc) => acc.email === email)) {
    return {
      success: false,
      error: "Email này đã được đăng ký",
    };
  }

  // Validate password
  if (password.length < 6) {
    return {
      success: false,
      error: "Mật khẩu phải có ít nhất 6 ký tự",
    };
  }

  // Auto-login after registration
  return login(email, password);
};

// Logout
export const logout = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(SESSION_KEY);
  }
};

