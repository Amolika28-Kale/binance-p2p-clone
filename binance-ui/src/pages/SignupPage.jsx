import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Checkbox from '@mui/material/Checkbox';
import { useAuth } from '../context/AuthContext';

export default function SignupPage() {
  const navigate = useNavigate();
  const { signup, loading, error } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    referralCode: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [formError, setFormError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password || !formData.firstName || !formData.lastName) {
      setFormError('Please fill in all required fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setFormError('Passwords do not match');
      return;
    }

    if (!agreeTerms) {
      setFormError('Please agree to the terms and conditions');
      return;
    }

    setFormError('');
    const result = await signup(
      formData.email,
      formData.password,
      formData.firstName,
      formData.lastName
    );

    if (result.success) {
      navigate('/p2p');
    } else {
      setFormError(result.message || 'Signup failed');
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="border-b border-gray-200 py-4 px-6">
        <div className="max-w-7xl mx-auto">
          <Link to="/" className="text-2xl font-bold text-black hover:opacity-80 transition">
  <h1 className="text-xl md:text-2xl font-black tracking-tighter text-black">
              DUBAI<span className="text-yellow-500">P2P</span>
            </h1>          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Signup Card */}
          <div className="bg-white rounded-lg p-8 space-y-8 border border-gray-200 shadow-sm">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-black">Create Account</h2>
              <p className="text-gray-600">Join millions trading on Binance P2P</p>
            </div>

            {(formError || error) && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm">{formError || error}</p>
              </div>
            )}

            <form onSubmit={handleSignup} className="space-y-5">
              {/* First Name Field */}
              <div>
                <label className="block text-gray-800 text-sm font-semibold mb-2">First Name</label>
                <TextField
                  fullWidth
                  name="firstName"
                  placeholder="Enter your first name"
                  value={formData.firstName}
                  onChange={handleChange}
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

              {/* Last Name Field */}
              <div>
                <label className="block text-gray-800 text-sm font-semibold mb-2">Last Name</label>
                <TextField
                  fullWidth
                  name="lastName"
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  onChange={handleChange}
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

              {/* Email Field */}
              <div>
                <label className="block text-gray-800 text-sm font-semibold mb-2">Email Address</label>
                <TextField
                  fullWidth
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
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
                    name="password"
                    placeholder="Enter a strong password"
                    value={formData.password}
                    onChange={handleChange}
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
                <p className="text-gray-600 text-xs mt-2">Minimum 8 characters with numbers and symbols</p>
              </div>

              {/* Confirm Password Field */}
              <div>
                <label className="block text-gray-800 text-sm font-semibold mb-2">Confirm Password</label>
                <div className="relative">
                  <TextField
                    fullWidth
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
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
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </div>
              </div>

              {/* Referral Code */}
              <div>
                <label className="block text-gray-800 text-sm font-semibold mb-2">
                  Referral Code <span className="text-gray-600">(Optional)</span>
                </label>
                <TextField
                  fullWidth
                  name="referralCode"
                  placeholder="Enter referral code if you have one"
                  value={formData.referralCode}
                  onChange={handleChange}
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

              {/* Terms & Conditions */}
              <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg border border-gray-200">
                <Checkbox
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  disabled={loading}
                  sx={{
                    color: '#d1d5db',
                    '&.Mui-checked': {
                      color: '#f7931a',
                    },
                    marginTop: '-8px',
                  }}
                />
                <p className="text-gray-700 text-sm">
                  I agree to the <a href="#" className="text-yellow-600 hover:text-yellow-700">Terms of Service</a> and <a href="#" className="text-yellow-600 hover:text-yellow-700">Privacy Policy</a>
                </p>
              </div>

              {/* Signup Button */}
              <button
                type="submit"
                disabled={loading || !agreeTerms || formData.password !== formData.confirmPassword}
                className="w-full py-3 text-lg font-semibold text-black bg-yellow-400 hover:bg-yellow-500 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-6"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-gray-300"></div>
              <span className="text-gray-600 text-sm">OR</span>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>


            {/* Login Link */}
            <div className="text-center text-gray-600 space-y-2 border-t border-gray-200 pt-6">
              <p>Already have an account?</p>
              <Link
                to="/login"
                className="text-yellow-600 hover:text-yellow-700 font-semibold transition-colors block"
              >
                Log in here
              </Link>
            </div>
          </div>

          {/* Info Box */}
          <div className="mt-6 space-y-3">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-blue-900 text-xs">
                ✓ <strong>Secure:</strong> Your data is encrypted and stored securely
              </p>
            </div>
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-900 text-xs">
                ✓ <strong>Verification:</strong> Email and phone verification required
              </p>
            </div>
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
