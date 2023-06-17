import React, { createContext, useState, useContext, useEffect } from "react";
import jwt_decode from "jwt-decode";

interface AuthContextProps {
  token: string | null;
  userId: string | null;
  setToken: (token: string | null) => void;
  setUserId: (userId: string | null) => void;
}

const AuthContext = createContext<AuthContextProps>({
  token: null,
  userId: null,
  setToken: () => {},
  setUserId: () => {},
});

interface AuthProviderProps {
  children: React.ReactNode;
}
export interface DecodedJwt {
  id: number;
  iat: number;
  exp: number;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);

      const decodedToken = jwt_decode<DecodedJwt>(storedToken);
      setUserId(decodedToken.id.toString());

      localStorage.setItem("userId", decodedToken.id.toString());
    }
  }, []);

  return (
    <AuthContext.Provider value={{ token, userId, setToken, setUserId }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }
  return context;
};
