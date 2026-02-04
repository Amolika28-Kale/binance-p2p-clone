import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Menu, X, Bitcoin, LogOut, User, Repeat2, PlusSquare, LayoutList, 
  Wallet, ChevronDown
} from 'lucide-react';

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

  const navLinks = [
    { name: 'Market', path: '/p2p' },
    { name: 'My Trades', path: '/trades' },
    { name: 'My Ads', path: '/my-ads' },
  ];

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm font-sans">
      {/* Top Nav (Desktop Only) */}
      <div className="hidden md:flex bg-gray-50/50 border-b border-gray-100 text-[10px] uppercase tracking-widest font-black text-gray-500">
        <div className="max-w-7xl mx-auto px-6 py-2 flex justify-between items-center w-full">
          <div className="flex gap-6">
            <button onClick={() => navigate('/')} className="hover:text-yellow-600 transition">Dubai Prices</button>
            <button onClick={() => navigate('/p2p')} className="hover:text-yellow-600 transition">P2P Marketplace</button>
          </div>
          <div className="flex gap-4 items-center">
            <span className="bg-gray-200 h-3 w-[1px]"></span>
            <span>English / INR</span>
          </div>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex justify-between items-center">
        
        {/* Left: Logo and Desktop Nav */}
        <div className="flex items-center gap-8">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 group">
            <Bitcoin size={28} className="text-yellow-500 fill-yellow-500 group-hover:rotate-12 transition-transform" />
            <h1 className="text-lg md:text-xl font-black tracking-tighter text-black uppercase">
              Dubai<span className="text-yellow-500">P2P</span>
            </h1>
          </button>
          
          {/* Desktop Links (Hidden below LG) */}
          <nav className="hidden lg:flex gap-6 text-sm font-bold text-gray-500">
            {navLinks.map((link) => (
              <button 
                key={link.path}
                onClick={() => navigate(link.path)} 
                className={`hover:text-yellow-500 transition-colors ${isActive(link.path) ? 'text-black' : ''}`}
              >
                {link.name}
              </button>
            ))}
            <button onClick={() => navigate('/post-ad')} className="text-yellow-600 hover:text-yellow-700 transition-colors">+ Post Ad</button>
          </nav>
        </div>

        {/* Right: User Actions & Mobile Toggle */}
        <div className="flex items-center gap-2 md:gap-4">
          {isAuthenticated && user ? (
            <div className="relative">
              <button 
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 px-3 py-1.5 md:px-4 md:py-2 rounded-full transition border border-gray-100"
              >
                <div className="w-5 h-5 md:w-6 md:h-6 bg-yellow-400 rounded-full flex items-center justify-center text-[9px] md:text-[10px] font-black shadow-sm">
                  {user.firstName ? user.firstName[0].toUpperCase() : 'U'}
                </div>
                <span className="hidden sm:inline text-xs md:text-sm font-bold text-black">{user.firstName}</span>
                <ChevronDown size={14} className={`text-gray-400 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
              </button>
              
              {/* Desktop User Dropdown */}
              {showUserMenu && (
                <div className="absolute right-0 mt-3 w-64 bg-white border border-gray-100 rounded-2xl shadow-2xl z-[100] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="p-5 bg-gray-50/80 border-b border-gray-100">
                    <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest mb-1">Authenticated Account</p>
                    <p className="text-sm font-black truncate text-black">{user.email}</p>
                  </div>
                  
                  <div className="py-2 p-2">
                    {[
                      { name: 'My Profile', path: '/profile', icon: User },
                      { name: 'Assets & Wallet', path: '/wallet', icon: Wallet },
                      { name: 'Manage My Ads', path: '/my-ads', icon: LayoutList },
                      { name: 'Order History', path: '/trades', icon: Repeat2 },
                    ].map((item) => (
                      <button 
                        key={item.path}
                        onClick={() => { navigate(item.path); setShowUserMenu(false); }} 
                        className="w-full text-left px-4 py-3 text-sm hover:bg-yellow-50 rounded-xl flex items-center gap-3 transition-colors font-bold text-gray-700"
                      >
                        <item.icon size={18} className="text-gray-400" /> {item.name}
                      </button>
                    ))}
                    <button 
                      onClick={() => { navigate('/post-ad'); setShowUserMenu(false); }} 
                      className="w-full text-left px-4 py-3 text-sm hover:bg-yellow-50 rounded-xl flex items-center gap-3 transition-colors text-yellow-600 font-black mt-1"
                    >
                      <PlusSquare size={18} /> Post New Ad
                    </button>
                  </div>

                  <button onClick={handleLogout} className="w-full text-left px-6 py-4 text-sm text-red-600 hover:bg-red-50 font-black border-t border-gray-100 flex items-center gap-3 transition-colors">
                    <LogOut size={18} /> Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-1 md:gap-3">
              <button onClick={() => navigate('/login')} className="px-3 py-2 text-xs md:text-sm font-bold text-gray-600 hover:text-black">Log In</button>
              <button onClick={() => navigate('/signup')} className="px-4 py-2 text-xs md:text-sm font-black bg-yellow-400 rounded-xl hover:bg-yellow-500 shadow-lg shadow-yellow-500/20 transition-all active:scale-95">Sign Up</button>
            </div>
          )}
          
          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setShowMobileMenu(!showMobileMenu)} 
            className="lg:hidden p-2 text-black hover:bg-gray-100 rounded-lg transition-colors"
          >
            {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {showMobileMenu && (
        <div className="lg:hidden fixed inset-0 top-[57px] md:top-[90px] bg-white z-[90] p-6 animate-in slide-in-from-right duration-300">
          <nav className="flex flex-col gap-2">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Main Menu</p>
            {navLinks.map((link) => (
              <button 
                key={link.path}
                onClick={() => { navigate(link.path); setShowMobileMenu(false); }} 
                className={`text-left text-lg font-black py-4 border-b border-gray-50 flex justify-between items-center ${isActive(link.path) ? 'text-yellow-600' : 'text-black'}`}
              >
                {link.name}
                <ChevronDown size={20} className="-rotate-90 text-gray-300" />
              </button>
            ))}
            <button 
              onClick={() => { navigate('/post-ad'); setShowMobileMenu(false); }} 
              className="text-left text-lg font-black py-4 border-b border-gray-50 text-yellow-600"
            >
              Post an Ad
            </button>
            <button 
              onClick={() => { navigate('/profile'); setShowMobileMenu(false); }} 
              className="text-left text-lg font-black py-4 flex justify-between items-center"
            >
              Profile & Assets
              <Wallet size={20} className="text-gray-400" />
            </button>
          </nav>
          
          {isAuthenticated && (
            <div className="mt-8 pt-8 border-t border-gray-100">
              <button onClick={handleLogout} className="w-full py-4 bg-red-50 text-red-600 font-black rounded-2xl flex items-center justify-center gap-3">
                <LogOut size={20} /> Log Out
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}