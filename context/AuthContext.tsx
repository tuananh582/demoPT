"use client";

import {
  ReactNode,
  createContext,
  startTransition,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type UserRole = "admin" | "coach";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

type LoginPayload = {
  email: string;
  password: string;
};

type LoginResult = {
  success: boolean;
  message?: string;
};

interface AuthContextValue {
  user: AuthUser | null;
  isLoading: boolean;
  login: (payload: LoginPayload) => LoginResult;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const STORAGE_KEY = "demo-gym-auth-user";

const mockUsers: Array<AuthUser & { password: string }> = [
  {
    id: "admin-1",
    name: "Lan Nguyen",
    email: "admin@gymflow.vn",
    role: "admin",
    password: "admin123",
  },
  {
    id: "coach-1",
    name: "Minh Tran",
    email: "coach@gymflow.vn",
    role: "coach",
    password: "coach123",
  },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as AuthUser;
        startTransition(() => {
          setUser(parsed);
          setIsLoading(false);
        });
        return;
      } catch (error) {
        console.error("Failed to parse stored user", error);
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    startTransition(() => {
      setIsLoading(false);
    });
  }, []);

  const login = useCallback(({ email, password }: LoginPayload): LoginResult => {
    const foundUser = mockUsers.find(
      (candidate) =>
        candidate.email.toLowerCase() === email.toLowerCase() &&
        candidate.password === password,
    );

    if (!foundUser) {
      return { success: false, message: "Thông tin đăng nhập không hợp lệ" };
    }

    const nextUser: AuthUser = {
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
      role: foundUser.role,
    };

    setUser(nextUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser));

    return { success: true };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const value = useMemo(
    () => ({
      user,
      isLoading,
      login,
      logout,
    }),
    [user, isLoading, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used inside AuthProvider");
  }
  return context;
}
