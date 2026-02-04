import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { tradesAPI } from '../utils/api';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ArrowRightLeft, History, ChevronRight, Loader2 } from 'lucide-react';

export default function MyTradesPage() {
  const navigate = useNavigate();
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL'); // ALL, PENDING, COMPLETED, CANCELLED

  useEffect(() => {
    const fetchTrades = async () => {
      try {
        setLoading(true);
        const res = await tradesAPI.getMyTrades();
        
        // Handle unauthorized session
        if (res.status === 401 || res.message === "Unauthorized") {
          navigate('/login');
          return;
        }

        if (res.success) {
          setTrades(res.trades);
        }
      } catch (err) {
        console.error("Error loading trades:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTrades();
  }, [navigate]);

  const filteredTrades = trades.filter(t => {
    if (filter === 'ALL') return true;
    if (filter === 'PENDING') return t.status === 'PENDING' || t.status === 'PAYMENT_SENT';
    return t.status === filter;
  });

  const getStatusStyle = (status) => {
    switch (status) {
      case 'COMPLETED': return 'text-emerald-500 bg-emerald-500/10';
      case 'PENDING': return 'text-yellow-500 bg-yellow-500/10';
      case 'PAYMENT_SENT': return 'text-blue-500 bg-blue-500/10';
      case 'CANCELLED': return 'text-rose-500 bg-rose-500/10';
      default: return 'text-gray-500 bg-gray-500/10';
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0e11] text-white font-sans">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        {/* Header Section: Stack on mobile, side-by-side on desktop */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-6">
          <div>
            <h1 className="text-2xl md:text-4xl font-black italic tracking-tighter uppercase">Order History</h1>
            <p className="text-gray-400 text-xs md:text-sm mt-1">Track your USDT purchase and sale contracts.</p>
          </div>

          {/* Responsive Tab Filters: Scrollable on mobile if needed */}
          <div className="flex bg-[#1e2329] p-1 rounded-xl border border-[#2b3139] w-full lg:w-auto overflow-x-auto no-scrollbar">
            {['ALL', 'PENDING', 'COMPLETED', 'CANCELLED'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`flex-1 lg:flex-none px-4 md:px-6 py-2 rounded-lg text-[9px] md:text-[10px] font-black tracking-widest transition-all whitespace-nowrap ${
                  filter === f ? 'bg-[#2b3139] text-yellow-500 shadow-lg' : 'text-gray-500 hover:text-white'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="py-32 text-center flex flex-col items-center justify-center">
            <Loader2 className="animate-spin text-yellow-500 mb-4" size={40} />
            <p className="text-gray-500 font-bold uppercase text-[10px] tracking-widest">Loading orders...</p>
          </div>
        ) : filteredTrades.length > 0 ? (
          <div className="space-y-3 md:space-y-4">
            {filteredTrades.map((t) => (
              <div 
                key={t._id} 
                onClick={() => navigate(`/trade/${t._id}`)}
                className="bg-[#1e2329] border border-[#2b3139] p-4 md:p-6 rounded-2xl md:rounded-3xl hover:border-[#474d57] cursor-pointer transition-all group"
              >
                {/* Mobile View: Vertical Stack with Key Info */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  
                  <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className={`p-3 md:p-4 rounded-xl md:rounded-2xl ${t.status === 'COMPLETED' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-yellow-500/10 text-yellow-500'}`}>
                      <ArrowRightLeft size={20} className="md:w-6 md:h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center flex-wrap gap-2">
                         <p className="font-black text-sm md:text-lg uppercase tracking-tight">Order #{t._id.slice(-8)}</p>
                         <span className={`px-2 py-0.5 rounded-lg text-[8px] md:text-[9px] font-black uppercase ${getStatusStyle(t.status)}`}>
                           {t.status.replace('_', ' ')}
                         </span>
                      </div>
                      <p className="text-gray-500 text-[10px] md:text-xs mt-0.5 font-medium">{new Date(t.createdAt).toLocaleString()}</p>
                    </div>
                  </div>

                  {/* Pricing/Quantity Section: Grid on mobile for better alignment */}
                  <div className="grid grid-cols-2 md:flex md:items-center justify-between w-full md:w-auto md:gap-12 pt-4 md:pt-0 border-t border-[#2b3139] md:border-none">
                    <div className="text-left md:text-right">
                      <p className="text-[8px] md:text-[10px] text-gray-500 font-bold uppercase tracking-widest">Fiat Amount</p>
                      <p className="font-black text-sm md:text-xl text-white">₹{t.totalPrice.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[8px] md:text-[10px] text-gray-500 font-bold uppercase tracking-widest">Quantity</p>
                      <p className="font-black text-sm md:text-xl text-emerald-400">{t.amount.toFixed(2)} <span className="text-[10px]">USDT</span></p>
                    </div>
                    <ChevronRight size={18} className="text-gray-600 group-hover:text-yellow-500 group-hover:translate-x-1 transition-all hidden md:block" />
                  </div>

                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 md:py-32 bg-[#1e2329] rounded-[2rem] md:rounded-[3rem] border-2 border-dashed border-[#2b3139] flex flex-col items-center px-6">
            <History size={40} className="md:w-12 md:h-12 text-gray-700 mb-4" />
            <p className="text-gray-500 font-bold text-sm md:text-base text-center">No {filter.toLowerCase()} trade records found.</p>
            <button 
              onClick={() => navigate('/p2p')}
              className="mt-6 bg-yellow-500/10 text-yellow-500 px-6 md:px-8 py-3 rounded-xl md:rounded-2xl font-black text-[10px] md:text-xs hover:bg-yellow-500 hover:text-black transition-all"
            >
              BROWSE MARKETPLACE
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}