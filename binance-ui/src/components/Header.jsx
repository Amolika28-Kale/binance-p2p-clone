import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, Bitcoin, TrendingUp, Book, Lock, LogOut, User, BarChart3, Repeat2 } from 'lucide-react';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/');
    setShowUserMenu(false);
    setShowMobileMenu(false);
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      {/* Top Navigation - Hide on Mobile */}
      <div className="hidden md:flex bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-200 text-sm text-gray-700">
        <div className="max-w-full px-4 md:px-6 py-2 flex justify-between items-center w-full">
          <div className="flex gap-4 md:gap-6">
            <button onClick={() => navigate('/')} className="hover:text-yellow-500 transition cursor-pointer font-medium text-xs md:text-sm">DUBAI Prices</button>
            <button onClick={() => navigate('/p2p')} className="hover:text-yellow-500 transition cursor-pointer font-medium text-xs md:text-sm">P2P Trading</button>
            <button className="hover:text-yellow-500 transition cursor-pointer font-medium text-xs md:text-sm">Learning Hub</button>
            <button className="hover:text-yellow-500 transition cursor-pointer font-medium text-xs md:text-sm">Security</button>
          </div>
          <div className="flex gap-4 md:gap-6">
            <button className="hover:text-yellow-500 transition cursor-pointer text-xs md:text-sm">English</button>
            <button className="hover:text-yellow-500 transition cursor-pointer text-xs md:text-sm">USD</button>
            <button className="hover:text-yellow-500 transition cursor-pointer"><Lock size={16} /></button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-full px-4 md:px-6 py-3 md:py-4 flex justify-between items-center">
        {/* Logo */}
        <button onClick={() => navigate('/')} className="flex items-center gap-2 text-xl md:text-2xl font-bold hover:opacity-80 transition">
          <Bitcoin size={28} className="text-yellow-500" />
          <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent hidden sm:inline">DUBAIP2P</span>
          <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent sm:hidden">C2P</span>
        </button>
        
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex gap-6 text-sm font-medium text-gray-600">
          <button 
            onClick={() => navigate('/')}
            className={`flex items-center gap-1 transition ${isActive('/') ? 'text-black border-b-2 border-yellow-400 pb-1' : 'hover:text-yellow-500'}`}
          >
            <TrendingUp size={18} /> Buy DUBAI
          </button>
          <button 
            onClick={() => navigate('/p2p')}
            className={`flex items-center gap-1 transition ${isActive('/p2p') ? 'text-black border-b-2 border-yellow-400 pb-1' : 'hover:text-yellow-500'}`}
          >
            <Repeat2 size={18} /> P2P Trading
          </button>
          <button className="flex items-center gap-1 hover:text-yellow-500 transition">
            <BarChart3 size={18} /> Market
          </button>
          <button className="flex items-center gap-1 hover:text-yellow-500 transition">
            <Book size={18} /> Learn
          </button>
        </nav>

        {/* Right Side - Auth & Mobile Menu */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Desktop Auth Buttons */}
          <div className="hidden sm:flex items-center gap-4">
            {isAuthenticated && user ? (
              <div className="relative">
                <button 
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="px-3 md:px-4 py-2 text-xs md:text-sm font-semibold text-black bg-gray-100 hover:bg-gray-200 rounded flex items-center gap-2 transition"
                >
                  <User size={18} /> {user.firstName || 'User'}
                </button>
                
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    <button 
                      onClick={() => {
                        navigate('/profile');
                        setShowUserMenu(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 border-b flex items-center gap-2"
                    >
                      <User size={16} /> My Profile
                    </button>
                    <button 
                      onClick={() => {
                        navigate('/my-ads');
                        setShowUserMenu(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 border-b flex items-center gap-2"
                    >
                      <BarChart3 size={16} /> My Ads
                    </button>
                    <button 
                      onClick={() => {
                        navigate('/trades');
                        setShowUserMenu(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 border-b flex items-center gap-2"
                    >
                      <Repeat2 size={16} /> My Trades
                    </button>
                    <button 
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-semibold flex items-center gap-2"
                    >
                      <LogOut size={16} /> Log Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <button 
                  onClick={() => navigate('/login')}
                  className="px-4 py-2 text-sm font-semibold text-black hover:bg-gray-100 rounded transition"
                >
                  Log In
                </button>
                <button 
                  onClick={() => navigate('/signup')}
                  className="px-4 py-2 text-sm font-semibold text-white bg-yellow-400 hover:bg-yellow-500 rounded transition"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded transition"
          >
            {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="lg:hidden bg-gray-50 border-t border-gray-200 p-4 space-y-4">
          <nav className="space-y-2">
            <button 
              onClick={() => {
                navigate('/');
                setShowMobileMenu(false);
              }}
              className={`w-full text-left px-4 py-2 rounded flex items-center gap-2 transition ${isActive('/') ? 'bg-yellow-100 text-black font-semibold' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              <TrendingUp size={18} /> Buy DUBAI
            </button>
            <button 
              onClick={() => {
                navigate('/p2p');
                setShowMobileMenu(false);
              }}
              className={`w-full text-left px-4 py-2 rounded flex items-center gap-2 transition ${isActive('/p2p') ? 'bg-yellow-100 text-black font-semibold' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              <Repeat2 size={18} /> P2P Trading
            </button>
            <button className="w-full text-left px-4 py-2 rounded flex items-center gap-2 text-gray-700 hover:bg-gray-100 transition">
              <BarChart3 size={18} /> Market
            </button>
            <button className="w-full text-left px-4 py-2 rounded flex items-center gap-2 text-gray-700 hover:bg-gray-100 transition">
              <Book size={18} /> Learn
            </button>
          </nav>

          {/* Mobile Auth */}
          <div className="border-t border-gray-200 pt-4 space-y-2">
            {isAuthenticated && user ? (
              <>
                <button 
                  onClick={() => {
                    navigate('/profile');
                    setShowMobileMenu(false);
                  }}
                  className="w-full px-4 py-2 text-sm font-semibold text-white bg-yellow-400 hover:bg-yellow-500 rounded flex items-center justify-center gap-2 transition"
                >
                  <User size={18} /> {user.firstName || 'User'}
                </button>
                <button 
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-sm font-semibold text-red-600 border border-red-300 rounded flex items-center justify-center gap-2 hover:bg-red-50 transition"
                >
                  <LogOut size={18} /> Log Out
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={() => {
                    navigate('/login');
                    setShowMobileMenu(false);
                  }}
                  className="w-full px-4 py-2 text-sm font-semibold text-black border border-gray-300 rounded hover:bg-gray-100 transition"
                >
                  Log In
                </button>
                <button 
                  onClick={() => {
                    navigate('/signup');
                    setShowMobileMenu(false);
                  }}
                  className="w-full px-4 py-2 text-sm font-semibold text-white bg-yellow-400 hover:bg-yellow-500 rounded transition"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
