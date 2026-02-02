import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { api } from "@/lib/api";

interface User {
  id: string;
  email: string;
  fullName: string;
  country: string;
  phone?: string;
  role?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logoutUser: () => void;
  logoutAdmin: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token"),
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (token) {
      // Verify token / fetch user
      api
        .get("/auth/me")
        .then((res) => {
          setUser(res.data);
        })
        .catch(() => {
          // Clear session on token verification failure
          localStorage.removeItem("token");
          setToken(null);
          setUser(null);
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = (newToken: string, newUser: User) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    setUser(newUser);
  };

  const logoutUser = () => {
    console.log("User logout: Clearing user session");
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    // Additional user-specific cleanup can be added here
  };

  const logoutAdmin = () => {
    console.log("Admin logout: Clearing admin session");
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    // Additional admin-specific cleanup can be added here
    // For example: clear admin-specific localStorage items, reset admin state, etc.
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, logoutUser, logoutAdmin, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
