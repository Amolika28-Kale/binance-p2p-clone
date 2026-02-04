import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, loading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setFormError('Please enter both email and password');
      return;
    }

    setFormError('');
    const result = await login(email, password);
    
    if (result.success) {
      navigate('/p2p');
    } else {
      setFormError(result.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="border-b border-gray-200 py-4 px-6">
        <div className="max-w-7xl mx-auto">
          <Link to="/" className="text-2xl font-bold text-black hover:opacity-80 transition">
  <h1 className="text-xl md:text-2xl font-black tracking-tighter text-black">
              CRYPTO<span className="text-yellow-500">P2P</span>
            </h1>          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Login Card */}
          <div className="bg-white rounded-lg p-8 space-y-8 border border-gray-200 shadow-sm">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-black">Log In</h2>
              <p className="text-gray-600">Welcome back to Binance P2P</p>
            </div>

            {(formError || error) && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm">{formError || error}</p>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email Field */}
              <div>
                <label className="block text-gray-800 text-sm font-semibold mb-2">Email Address</label>
                <TextField
                  fullWidth
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  variant="outlined"
                  size="medium"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: '#fff',
                      color: '#000',
                      borderRadius: '6px',
                      '& fieldset': {
                        borderColor: '#d1d5db',
                      },
                      '&:hover fieldset': {
                        borderColor: '#9ca3af',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#000',
                      },
                    },
                  }}
                />
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-gray-800 text-sm font-semibold mb-2">Password</label>
                <div className="relative">
                  <TextField
                    fullWidth
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    variant="outlined"
                    size="medium"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: '#fff',
                        color: '#000',
                        borderRadius: '6px',
                        '& fieldset': {
                          borderColor: '#d1d5db',
                        },
                        '&:hover fieldset': {
                          borderColor: '#9ca3af',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#000',
                        },
                        paddingRight: '40px',
                      },
                    }}
                  />
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    disabled={loading}
                    sx={{
                      position: 'absolute',
                      right: 8,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#6b7280',
                      '&:hover': {
                        color: '#000',
                      },
                    }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </div>
              </div>

              {/* Remember & Forgot Password */}
              <div className="flex justify-between items-center">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded cursor-pointer" />
                  <span className="text-gray-700 text-sm">Remember me</span>
                </label>
                <a href="#" className="text-yellow-600 hover:text-yellow-700 text-sm font-semibold transition-colors">
                  Forgot password?
                </a>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 text-lg font-semibold text-black bg-yellow-400 hover:bg-yellow-500 rounded-lg transition-colors mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Logging in...' : 'Log In'}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-gray-300"></div>
              <span className="text-gray-600 text-sm">OR</span>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            {/* Sign Up Link */}
            <div className="text-center text-gray-600 space-y-2 border-t border-gray-200 pt-6">
              <p>Don't have an account?</p>
              <Link
                to="/signup"
                className="text-yellow-600 hover:text-yellow-700 font-semibold transition-colors block"
              >
                Sign up now
              </Link>
            </div>
          </div>

          {/* Security Notice */}
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-800 text-xs">
              🔒 <strong>Security Tip:</strong> Never share your password or 2FA code with anyone.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-600 text-xs">
          <p>&copy; 2026 Binance P2P. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
