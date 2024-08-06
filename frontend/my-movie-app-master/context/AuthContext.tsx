import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { signIn, signOut, getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import axios from "axios";

interface UserContextType {
  user: any;
  setUser: (user: any) => void;
  role: string | null;
  loginWithGoogle: () => Promise<void>;
  loginWithUsername: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<UserContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const role = user?.role || null;

  useEffect(() => {
    const checkUserSession = async () => {
      const session = await getSession();
      if (session?.user) {
        setUser(session.user);
        localStorage.setItem("user-info", JSON.stringify(session.user));
        router.push("/");
      }
    };
    checkUserSession();
  }, []);

  const loginWithGoogle = async (): Promise<void> => {
    const result = await signIn("google", { redirect: false });
    if (result?.ok) {
      const session = await getSession();
      if (session?.user) {
        setUser(session.user);
      }
    } else {
      console.error("Google sign-in failed");
    }
  };

  const loginWithUsername = async (username: string, password: string) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/authen/login",
        { username, password }
      );
      const { user, token } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user-info", JSON.stringify(user));
      setUser(user);
      router.push(user.role === "ADMIN" ? "/admin" : "/");
    } catch (error) {
      console.error("Invalid username or password");
    }
  };

  const logout = async () => {
    await signOut();
    setUser(null);
    localStorage.removeItem('user-info');
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, role, loginWithGoogle, loginWithUsername, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
