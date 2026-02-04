import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adsAPI } from '../utils/api';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ArrowRight, Info, ShieldCheck } from 'lucide-react';

export default function CreateAdPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    type: 'SELL',
    price: '',
    availableAmount: '',
    minOrderAmount: '',
    maxOrderAmount: '',
    paymentMethods: ['UPI'],
    timeLimit: 15,
    terms: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await adsAPI.createAd({
        ...formData,
        price: Number(formData.price),
        availableAmount: Number(formData.availableAmount),
        minOrderAmount: Number(formData.minOrderAmount),
        maxOrderAmount: Number(formData.maxOrderAmount)
      });
      if (res.success) {
        alert("Advertisement Published Successfully!");
        navigate('/my-ads');
      }
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0e11] text-white font-sans">
      <Header />
      
      {/* Optimized Main Container: smaller padding on mobile */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        
        {/* Header Section: responsive font sizes */}
        <div className="mb-8 md:mb-10 text-center">
          <h1 className="text-2xl md:text-4xl font-black mb-2 uppercase italic tracking-tighter">
            Post USDT Ad
          </h1>
          <p className="text-gray-400 text-xs md:text-sm px-4">
            List your assets and start trading on the global P2P marketplace.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          
          {/* Ad Type Toggle: Full width on mobile */}
          <div className="bg-[#1e2329] p-4 md:p-6 rounded-2xl md:rounded-3xl border border-[#2b3139]">
            <label className="block text-gray-400 text-[10px] font-black uppercase mb-3 md:mb-4 tracking-widest">
              Transaction Type
            </label>
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <button 
                type="button" 
                onClick={() => setFormData({...formData, type: 'SELL'})}
                className={`py-3 md:py-4 rounded-xl md:rounded-2xl text-xs md:text-sm font-black transition-all border-2 ${formData.type === 'SELL' ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400' : 'bg-[#0b0e11] border-[#2b3139] text-gray-500'}`}
              >
                SELL USDT
              </button>
              <button 
                type="button" 
                onClick={() => setFormData({...formData, type: 'BUY'})}
                className={`py-3 md:py-4 rounded-xl md:rounded-2xl text-xs md:text-sm font-black transition-all border-2 ${formData.type === 'BUY' ? 'bg-rose-500/10 border-rose-500 text-rose-400' : 'bg-[#0b0e11] border-[#2b3139] text-gray-500'}`}
              >
                BUY USDT
              </button>
            </div>
          </div>

          {/* Pricing and Quantity: Stack on mobile, grid on desktop */}
          <div className="bg-[#1e2329] p-5 md:p-8 rounded-2xl md:rounded-3xl border border-[#2b3139] space-y-5 md:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
              <div className="relative">
                <label className="block text-[10px] text-gray-400 mb-2 font-black uppercase tracking-widest">Fixed Price (per 1 USDT)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-yellow-500 font-bold">₹</span>
                  <input 
                    type="number" step="0.01" required 
                    value={formData.price} 
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    placeholder="91.50" 
                    className="w-full bg-[#0b0e11] border border-[#2b3139] rounded-xl py-3 md:py-4 pl-10 pr-4 outline-none focus:border-yellow-500 font-black text-base md:text-lg" 
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] text-gray-400 mb-2 font-black uppercase tracking-widest">Total Quantity</label>
                <input 
                  type="number" required 
                  value={formData.availableAmount} 
                  onChange={(e) => setFormData({...formData, availableAmount: e.target.value})}
                  placeholder="Quantity in USDT" 
                  className="w-full bg-[#0b0e11] border border-[#2b3139] rounded-xl py-3 md:py-4 px-4 outline-none focus:border-yellow-500 font-black text-base md:text-lg" 
                />
              </div>
            </div>

            {/* Order Limits: Stack on mobile */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
              <div>
                <label className="block text-[10px] text-gray-400 mb-2 font-black uppercase tracking-widest">Minimum Order (INR)</label>
                <input 
                  type="number" required 
                  value={formData.minOrderAmount} 
                  onChange={(e) => setFormData({...formData, minOrderAmount: e.target.value})}
                  placeholder="e.g. 1000" 
                  className="w-full bg-[#0b0e11] border border-[#2b3139] rounded-xl py-3 md:py-4 px-4 outline-none focus:border-yellow-500 font-bold text-sm md:text-base" 
                />
              </div>
              <div>
                <label className="block text-[10px] text-gray-400 mb-2 font-black uppercase tracking-widest">Maximum Order (INR)</label>
                <input 
                  type="number" required 
                  value={formData.maxOrderAmount} 
                  onChange={(e) => setFormData({...formData, maxOrderAmount: e.target.value})}
                  placeholder="e.g. 50000" 
                  className="w-full bg-[#0b0e11] border border-[#2b3139] rounded-xl py-3 md:py-4 px-4 outline-none focus:border-yellow-500 font-bold text-sm md:text-base" 
                />
              </div>
            </div>
          </div>

          {/* Payment and Submission */}
          <div className="bg-[#1e2329] p-5 md:p-8 rounded-2xl md:rounded-3xl border border-[#2b3139] space-y-5 md:space-y-6">
            <div>
              <label className="block text-[10px] text-gray-400 mb-2 font-black uppercase tracking-widest">Payment Method</label>
              <select 
                className="w-full bg-[#0b0e11] border border-[#2b3139] rounded-xl py-3 md:py-4 px-4 outline-none font-bold text-sm md:text-base appearance-none"
                onChange={(e) => setFormData({...formData, paymentMethods: [e.target.value]})}
              >
                <option value="UPI">UPI (Google Pay, PhonePe)</option>
                <option value="BANK">Bank Transfer</option>
                <option value="PAYTM">Paytm Wallet</option>
              </select>
            </div>

            {/* Responsive Submit Button */}
            <button 
              type="submit" 
              disabled={loading} 
              className="w-full bg-yellow-500 text-black py-4 md:py-5 rounded-xl md:rounded-2xl font-black text-base md:text-xl hover:bg-yellow-400 transition-all shadow-xl shadow-yellow-500/10 flex items-center justify-center gap-3"
            >
              {loading ? (
                <span className="animate-pulse">PROCESSING...</span>
              ) : (
                <>CONFIRM & PUBLISH <ArrowRight size={20} /></>
              )}
            </button>
            
            <div className="flex items-center justify-center gap-2 text-[10px] text-gray-500 font-bold uppercase tracking-tighter">
              <ShieldCheck size={14} className="text-emerald-500" /> Secure Escrow Active
            </div>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
}