import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

export type User = {
  email: string;
  userId: string;
};
export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
  login: (username: string) => Promise<void>;
  logout: () => void;
}

interface Props {
  children: ReactNode;
}

const AUTH_API = import.meta.env.VITE_AUTH_API;
const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem('jwttoken')
  );

  const fetchUser = useCallback(async () => {
    if (!token) return;

    try {
      const res = await fetch(AUTH_API + '/me', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error('Me Api Error');

      const userData = await res.json();
      setUser(userData);
    } catch (err) {
      console.error(err);
      logout();
      throw err;
    }
  }, [token]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const login = async (email: string) => {
    try {
      const res = await fetch(AUTH_API + '/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error('로그인 실패');
      const { token } = await res.json();
      localStorage.setItem('jwttoken', token);
      setToken(token);

      fetchUser();
    } catch (err) {
      console.error(err);
      logout();
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, login, logout, token }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error();
  }
  return context;
};
