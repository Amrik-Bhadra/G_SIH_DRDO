import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

const AuthenticationContext = ({ children }) => {
  const [authData, setAuthData] = useState(null);

  useEffect(() => {
    const storedAuthData = localStorage.getItem('authData');
    if (storedAuthData) {
      try {
        setAuthData(JSON.parse(storedAuthData));
      } catch {
        localStorage.removeItem('authData');
      }
    } else {
      setAuthData({ token: null, userId: null, user: null });
    }
  }, []);

  // Save to localStorage with debounce
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (authData?.token) {
        localStorage.setItem('authData', JSON.stringify(authData));
      } else {
        localStorage.removeItem('authData');
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [authData]);

  // Token validation
  const validateToken = useCallback(async () => {
    if (authData?.token) {
      try {
        const response = await axios.get('/api/auth/verify', {
          headers: { Authorization: `Bearer ${authData.token}` },
        });
        setAuthData((prev) => ({ ...prev, user: response.data.user }));
      } catch {
        logout();
      }
    }
  }, [authData]);

  useEffect(() => {
    validateToken();
  }, [validateToken]);

  const login = (token, userId, user) => {
    setAuthData({ token, userId, user });
  };

  const logout = () => {
    setAuthData({ token: null, userId: null, user: null });
    axios.post('/api/auth/logout'); // Invalidate the token on the server
  };

  return (
    <AuthContext.Provider value={{ authData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthenticationContext;
