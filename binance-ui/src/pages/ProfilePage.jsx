import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../utils/api';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { 
  User, Wallet, CreditCard, Save, 
  ShieldCheck, CheckCircle2, Copy, Loader2 
} from 'lucide-react';

export default function ProfilePage() {
  const { user, loading: authLoading, fetchCurrentUser } = useAuth();
  // FIX: Ensure state is never undefined. Use an empty string as fallback.
  const [upiId, setUpiId] = useState(""); 
  const [updating, setUpdating] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  // Sync internal upiId state when user data is fetched
  useEffect(() => {
    fetchCurrentUser();
  }, []);

  useEffect(() => {
    if (user?.upiId) {
      setUpiId(user.upiId);
    }
  }, [user]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setSuccessMsg("");
    try {
      const res = await authAPI.updateProfile({ 
        upiId: upiId // Ensure your backend accepts this field
      });
      
      if (res.success) {
        setSuccessMsg("Payment details updated successfully!");
        fetchCurrentUser();
      }
    } catch (err) {
      alert("Error updating profile");
    } finally {
      setUpdating(false);
    }
  };

  // Mobile-friendly full-screen loader
  if (authLoading && !user) {
    return (
      <div className="min-h-screen bg-[#0b0e11] flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin text-yellow-500" size={48} />
        <p className="text-gray-500 font-black text-[10px] uppercase tracking-widest">Securing Connection...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0e11] text-white font-sans">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 py-6 md:py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-10 gap-4">
          <div>
            <h1 className="text-2xl md:text-4xl font-black tracking-tight uppercase italic text-white">User Center</h1>
            <p className="text-gray-400 mt-2 flex items-center gap-2 text-xs md:text-sm">
              <ShieldCheck size={16} className="text-yellow-500" /> 
              Verified Member since {user?.createdAt ? new Date(user.createdAt).getFullYear() : '2026'}
            </p>
          </div>
          <div className="bg-[#1e2329] px-4 py-2 rounded-lg border border-[#2b3139] text-[10px] md:text-xs font-mono text-gray-500 w-full md:w-auto text-center md:text-left">
            UID: {user?.id?.slice(-8).toUpperCase() || "PENDING"}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Wallet and Stats Column */}
          <div className="space-y-4 md:space-y-6">
            <div className="bg-gradient-to-br from-yellow-500 to-orange-600 p-6 md:p-8 rounded-[2rem] shadow-2xl relative overflow-hidden group">
              <div className="absolute top-[-10%] right-[-10%] w-32 h-32 bg-white/10 blur-3xl rounded-full group-hover:scale-150 transition-transform duration-700"></div>
              <div className="flex justify-between items-start mb-6 md:mb-10 relative z-10">
                <div className="bg-black/20 p-2 rounded-xl">
                  <Wallet className="text-black" size={24} />
                </div>
                <span className="bg-black/20 px-3 py-1 rounded-full text-[8px] md:text-[10px] font-black tracking-widest text-black/80 uppercase">Funding Account</span>
              </div>
              <div className="relative z-10 text-black">
                <p className="opacity-60 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-1">Total Balance</p>
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter">
                  {user?.walletBalance?.toFixed(2) || "0.00"} <span className="text-lg font-bold opacity-60">USDT</span>
                </h2>
                <p className="opacity-40 text-[9px] md:text-[10px] mt-2 font-bold uppercase tracking-wider">
                  ≈ ₹{(user?.walletBalance * 91.5 || 0).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="bg-[#1e2329] p-5 md:p-6 rounded-2xl border border-[#2b3139]">
              <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Performance</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#0b0e11] p-3 rounded-xl border border-[#2b3139]">
                  <p className="text-xl md:text-2xl font-black text-white">{user?.completedTrades || 0}</p>
                  <p className="text-[8px] md:text-[10px] text-gray-500 font-bold uppercase">Orders</p>
                </div>
                <div className="bg-[#0b0e11] p-3 rounded-xl border border-[#2b3139]">
                  <p className="text-xl md:text-2xl font-black text-emerald-400">{user?.rating || 100}%</p>
                  <p className="text-[8px] md:text-[10px] text-gray-500 font-bold uppercase">Rating</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-2 space-y-4 md:space-y-6">
            <div className="bg-[#1e2329] p-6 md:p-8 rounded-2xl border border-[#2b3139]">
              <div className="flex items-center gap-3 mb-6">
                <CreditCard className="text-yellow-500" size={24} />
                <h3 className="text-lg md:text-xl font-bold uppercase tracking-tight">Payment Settings</h3>
              </div>

              {successMsg && (
                <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-xs flex items-center gap-2">
                  <CheckCircle2 size={16} /> {successMsg}
                </div>
              )}

              <form onSubmit={handleUpdateProfile} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-gray-400 text-[9px] font-black uppercase tracking-widest mb-2 ml-1">Verified Name</label>
                    <input type="text" disabled value={`${user?.firstName || ''} ${user?.lastName || ''}`} className="w-full bg-[#0b0e11] border border-[#2b3139] rounded-xl py-3 px-4 text-gray-500 cursor-not-allowed font-bold text-sm" />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-[9px] font-black uppercase tracking-widest mb-2 ml-1">Email</label>
                    <input type="text" disabled value={user?.email || ''} className="w-full bg-[#0b0e11] border border-[#2b3139] rounded-xl py-3 px-4 text-gray-500 cursor-not-allowed text-sm" />
                  </div>
                </div>

                <div>
                  <label className="block text-yellow-500 text-[9px] font-black uppercase tracking-widest mb-2 ml-1">Active UPI ID</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={upiId} // Always a string, never undefined
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="e.g. name@okaxis"
                      className="w-full bg-[#0b0e11] border border-[#2b3139] rounded-xl py-4 px-4 outline-none focus:border-yellow-500 transition-all font-mono text-sm md:text-lg"
                      required
                    />
                    <Copy size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 cursor-pointer hover:text-white" />
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={updating}
                  className="w-full bg-yellow-500 text-black py-4 rounded-xl font-black text-sm md:text-lg hover:bg-yellow-400 transition-all shadow-xl flex items-center justify-center gap-2"
                >
                  {updating ? <Loader2 className="animate-spin" size={20} /> : <><Save size={20} /> SAVE CHANGES</>}
                </button>
              </form>
            </div>
            
            <div className="bg-[#1e2329] p-5 md:p-8 rounded-2xl border border-[#2b3139] flex flex-col sm:flex-row items-center justify-between gap-4 group">
              <div className="flex items-center gap-4 text-center sm:text-left">
                <div className="w-12 h-12 bg-[#0b0e11] rounded-2xl flex items-center justify-center border border-[#2b3139]">
                  <ShieldCheck size={28} className="text-yellow-500" />
                </div>
                <div>
                  <h4 className="text-base font-bold">Identity Verification</h4>
                  <p className="text-xs text-gray-500">Enhanced security for global trading.</p>
                </div>
              </div>
              <span className="bg-emerald-500/10 text-emerald-500 px-4 py-2 rounded-xl text-[10px] font-black border border-emerald-500/20 uppercase tracking-widest">Verified</span>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}