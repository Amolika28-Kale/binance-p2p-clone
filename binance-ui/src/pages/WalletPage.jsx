import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { tradesAPI } from '../utils/api';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Wallet, ArrowUpRight, ArrowDownRight, History, ShieldCheck, Loader2 } from 'lucide-react';

export default function WalletPage() {
  const { user, fetchCurrentUser } = useAuth();
  const [recentTrades, setRecentTrades] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadWalletData = async () => {
      try {
        await fetchCurrentUser(); // Refresh balance from server
        const res = await tradesAPI.getMyTrades({ limit: 5 });
        if (res.success) setRecentTrades(res.trades);
      } catch (err) {
        console.error("Wallet load error:", err);
      } finally {
        setLoading(false);
      }
    };
    loadWalletData();
  }, []);

  return (
    <div className="min-h-screen bg-[#0b0e11] text-white font-sans">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 py-6 md:py-12">
        
        {/* Balance Section: Stacks on mobile, Grid on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
          
          {/* Main Balance Card */}
          <div className="md:col-span-2 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-8 text-black shadow-xl relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-6 md:mb-8 bg-black/10 w-fit px-3 py-1 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest">
                <Wallet size={14} /> Main Portfolio
              </div>
              <p className="text-black/60 font-bold uppercase text-[10px] md:text-xs tracking-widest mb-1">Total USDT Balance</p>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter">
                {user?.walletBalance?.toFixed(2) || "0.00"} <span className="text-xl md:text-2xl font-bold">USDT</span>
              </h2>
              <p className="text-black/40 font-bold mt-2 text-xs md:text-sm tracking-tight">
                ≈ ₹{(user?.walletBalance * 91.5 || 0).toLocaleString()}
              </p>
            </div>
            {/* Background Icon: Hidden on very small screens to save space */}
            <div className="hidden sm:block absolute right-[-20px] bottom-[-20px] opacity-10">
               <Wallet size={200} />
            </div>
          </div>
          
          {/* Security Info Card */}
          <div className="bg-[#1e2329] border border-[#2b3139] rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-8 flex flex-row md:flex-col justify-center items-center text-left md:text-center gap-4">
             <div className="p-3 bg-yellow-500/10 rounded-2xl">
                <ShieldCheck size={32} className="text-yellow-500" />
             </div>
             <div>
                <h3 className="font-bold text-sm md:text-lg">Escrow Secured</h3>
                <p className="text-gray-500 text-[10px] md:text-xs mt-1 leading-relaxed">Stored in multi-signature cold wallets for maximum security.</p>
             </div>
          </div>
        </div>

        {/* Recent Asset Activity Section */}
        <div className="bg-[#1e2329] border border-[#2b3139] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden">
          <div className="p-6 md:p-8 border-b border-[#2b3139] flex justify-between items-center">
            <h3 className="text-lg md:text-xl font-black flex items-center gap-2 md:gap-3">
              <History size={20} className="text-yellow-500" /> 
              <span className="uppercase tracking-tight">Recent Activity</span>
            </h3>
            <button className="text-[10px] md:text-xs font-black text-yellow-500 hover:underline tracking-widest uppercase">VIEW ALL</button>
          </div>
          
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center">
              <Loader2 className="animate-spin text-yellow-500 mb-2" />
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Syncing Wallet...</p>
            </div>
          ) : (
            <div className="flex flex-col">
              {/* Desktop Table View (Hidden on Mobile) */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-[#0b0e11] text-[10px] uppercase font-black text-gray-500 tracking-widest">
                    <tr>
                      <th className="px-8 py-4">Direction</th>
                      <th className="px-8 py-4">Quantity</th>
                      <th className="px-8 py-4">Status</th>
                      <th className="px-8 py-4 text-right">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#2b3139]">
                    {recentTrades.map((t) => {
                      const isIncoming = t.buyer === (user?.id || user?._id);
                      return (
                        <tr key={t._id} className="hover:bg-white/5 transition-colors">
                          <td className="px-8 py-5">
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-lg ${isIncoming ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                                {isIncoming ? <ArrowDownRight size={18} /> : <ArrowUpRight size={18} />}
                              </div>
                              <span className="font-bold text-sm">{isIncoming ? 'Purchased USDT' : 'Sold USDT'}</span>
                            </div>
                          </td>
                          <td className="px-8 py-5">
                            <p className={`font-black text-sm ${isIncoming ? 'text-emerald-400' : 'text-rose-400'}`}>
                              {isIncoming ? '+' : '-'}{t.amount.toFixed(2)} USDT
                            </p>
                          </td>
                          <td className="px-8 py-5">
                            <span className="bg-[#0b0e11] px-3 py-1 rounded-full text-[9px] font-black uppercase text-gray-400 border border-[#2b3139]">
                              {t.status}
                            </span>
                          </td>
                          <td className="px-8 py-5 text-right text-gray-500 text-xs font-medium">
                            {new Date(t.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View (Hidden on Desktop) */}
              <div className="md:hidden divide-y divide-[#2b3139]">
                {recentTrades.map((t) => {
                  const isIncoming = t.buyer === (user?.id || user?._id);
                  return (
                    <div key={t._id} className="p-5 flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${isIncoming ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                          {isIncoming ? <ArrowDownRight size={18} /> : <ArrowUpRight size={18} />}
                        </div>
                        <div>
                          <p className="font-bold text-xs">{isIncoming ? 'Received' : 'Sent'}</p>
                          <p className="text-[10px] text-gray-500 font-medium">{new Date(t.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-black text-sm ${isIncoming ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {isIncoming ? '+' : '-'}{t.amount.toFixed(2)} USDT
                        </p>
                        <p className="text-[9px] font-black uppercase text-gray-500">{t.status}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {recentTrades.length === 0 && (
                <div className="p-16 text-center text-gray-600 font-bold text-xs uppercase tracking-widest">
                  No recent asset activity.
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}