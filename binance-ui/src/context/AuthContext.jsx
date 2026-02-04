import React, { createContext, useState, useEffect } from 'react';
import { authAPI } from '../utils/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchCurrentUser();
    }
  }, []);

  const fetchCurrentUser = async () => {
    try {
      setLoading(true);
      const response = await authAPI.getCurrentUser();
      if (response.success) {
        setUser(response.user);
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
      }
    } catch (err) {
      console.error('Error fetching current user:', err);
      localStorage.removeItem('token');
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email, password, firstName, lastName) => {
    try {
      setLoading(true);
      setError(null);
      const response = await authAPI.signup({
        email,
        password,
        firstName,
        lastName,
      });

      if (response.success) {
        localStorage.setItem('token', response.token);
        setUser(response.user);
        setIsAuthenticated(true);
        return { success: true, user: response.user };
      } else {
        setError(response.message || 'Signup failed');
        return { success: false, message: response.message };
      }
    } catch (err) {
      const message = err.message || 'An error occurred during signup';
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      const response = await authAPI.login({
        email,
        password,
      });

      if (response.success) {
        localStorage.setItem('token', response.token);
        setUser(response.user);
        setIsAuthenticated(true);
        return { success: true, user: response.user };
      } else {
        setError(response.message || 'Login failed');
        return { success: false, message: response.message };
      }
    } catch (err) {
      const message = err.message || 'An error occurred during login';
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
    setError(null);
  };

  const updateProfile = async (data) => {
    try {
      setLoading(true);
      setError(null);
      const response = await authAPI.updateProfile(data);

      if (response.success) {
        setUser(response.user);
        return { success: true, user: response.user };
      } else {
        setError(response.message || 'Profile update failed');
        return { success: false, message: response.message };
      }
    } catch (err) {
      const message = err.message || 'An error occurred';
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    error,
    isAuthenticated,
    signup,
    login,
    logout,
    updateProfile,
    fetchCurrentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook to use auth context
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
