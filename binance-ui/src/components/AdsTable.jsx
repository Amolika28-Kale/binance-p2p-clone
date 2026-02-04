import React from 'react';
import { ShieldCheck, CheckCircle2, ArrowRight, Wallet, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { tradesAPI } from '../utils/api';

export default function AdsTable({ ads, loading }) {
  const navigate = useNavigate();

  const handleInitiateTrade = async (ad) => {
    const input = prompt(
      `Enter amount in INR to ${ad.type === 'SELL' ? 'Buy' : 'Sell'} USDT\n` +
      `Price: ₹${ad.price.toFixed(2)}\n` +
      `Limit: ₹${ad.minOrderAmount.toLocaleString()} - ₹${ad.maxOrderAmount.toLocaleString()}`
    );
    
    if (!input || input.trim() === "") return;

    const amountINR = parseFloat(input);
    const minLimit = Number(ad.minOrderAmount);
    const maxLimit = Number(ad.maxOrderAmount);

    if (isNaN(amountINR) || amountINR < minLimit || amountINR > maxLimit) {
      alert(`Amount must be between ${minLimit} and ${maxLimit}`);
      return;
    }

    try {
      const usdtQuantity = parseFloat((amountINR / ad.price).toFixed(4));
      
      const res = await tradesAPI.createTrade({
        adId: ad._id,
        amount: usdtQuantity, 
        paymentMethod: ad.paymentMethods[0] || 'UPI'
      });

      if (res.success) {
        navigate(`/trade/${res.trade._id}`);
      } else {
        alert(res.message || "Failed to initiate trade.");
      }
    } catch (err) {
      console.error("Trade initiation error:", err);
      alert("A server error occurred. Please check console.");
    }
  };

  if (loading) return (
    <div className="bg-white p-20 text-center rounded-2xl shadow-sm border border-gray-100">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
      <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest italic">Syncing Marketplace...</p>
    </div>
  );

  return (
    <div className="w-full">
      {/* --- DESKTOP VIEW: Professional Table (Hidden on Mobile) --- */}
      <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100 text-gray-400 text-[10px] font-black uppercase tracking-widest">
            <tr>
              <th className="px-6 py-5">Advertiser</th>
              <th className="px-6 py-5">Price</th>
              <th className="px-6 py-5">Limit / Available</th>
              <th className="px-6 py-5">Payment</th>
              <th className="px-6 py-5 text-center">Status</th>
              <th className="px-6 py-5 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {ads && ads.length > 0 ? ads.map((ad) => (
              <tr key={ad._id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-6">
                  <div className="flex items-center gap-2">
                    <span className="font-black text-blue-600">
                      {ad.advertiser?.firstName} {ad.advertiser?.lastName}
                    </span>
                    {ad.advertiser?.isVerified && <CheckCircle2 size={14} className="text-emerald-500" />}
                  </div>
                </td>
                <td className="px-6 py-6">
                  <div className="text-2xl font-black text-gray-900 leading-none">
                    {ad.price.toFixed(2)} <span className="text-[10px] font-bold text-gray-400">INR</span>
                  </div>
                </td>
                <td className="px-6 py-6 text-xs font-bold text-gray-500 space-y-1">
                  <p>Available: <span className="text-gray-900">{ad.availableAmount.toFixed(2)} USDT</span></p>
                  <p>Limit: <span className="text-gray-900">₹{ad.minOrderAmount.toLocaleString()} - ₹{ad.maxOrderAmount.toLocaleString()}</span></p>
                </td>
                <td className="px-6 py-6">
                  <div className="flex flex-wrap gap-1">
                    {ad.paymentMethods?.map((pm) => (
                      <span key={pm} className="px-2 py-0.5 bg-yellow-50 text-yellow-700 border border-yellow-100 rounded text-[9px] font-black uppercase">
                        {pm}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-6 text-center">
                  <span className="text-emerald-500 font-black text-[10px] uppercase">Online</span>
                </td>
                <td className="px-6 py-6 text-right">
                  <button 
                    onClick={() => handleInitiateTrade(ad)}
                    className={`px-8 py-3 rounded-xl font-black text-xs transition-all shadow-sm ${
                      ad.type === 'SELL' ? 'bg-emerald-500 text-white hover:bg-emerald-600' : 'bg-rose-500 text-white hover:bg-rose-600'
                    }`}
                  >
                    {ad.type === 'SELL' ? 'BUY USDT' : 'SELL USDT'} <ArrowRight size={14} className="inline ml-2" />
                  </button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="6" className="p-20 text-center text-gray-400 font-bold tracking-widest uppercase">No live ads found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* --- MOBILE VIEW: Card-Based List (Hidden on Desktop) --- */}
      <div className="md:hidden space-y-4">
        {ads && ads.length > 0 ? ads.map((ad) => (
          <div key={ad._id} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm active:scale-[0.98] transition-transform">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2">
                <span className="font-black text-blue-600 text-sm">
                  {ad.advertiser?.firstName} {ad.advertiser?.lastName}
                </span>
                {ad.advertiser?.isVerified && <CheckCircle2 size={12} className="text-emerald-500" />}
                <span className="text-[9px] text-emerald-500 font-black uppercase bg-emerald-50 px-1.5 py-0.5 rounded">Online</span>
              </div>
              <div className="flex gap-1">
                {ad.paymentMethods?.map((pm) => (
                  <span key={pm} className="px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded text-[8px] font-black">
                    {pm}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-end">
              <div className="space-y-1">
                <p className="text-[10px] text-gray-400 font-black uppercase tracking-wider">Price</p>
                <p className="text-2xl font-black text-gray-900 leading-none">
                  {ad.price.toFixed(2)} <span className="text-xs text-gray-400">INR</span>
                </p>
                <div className="pt-2">
                  <p className="text-[10px] text-gray-500 font-medium">
                    Limit: <span className="font-bold text-gray-700">₹{ad.minOrderAmount.toLocaleString()} - ₹{ad.maxOrderAmount.toLocaleString()}</span>
                  </p>
                  <p className="text-[10px] text-gray-500 font-medium">
                    Available: <span className="font-bold text-gray-700">{ad.availableAmount.toFixed(2)} USDT</span>
                  </p>
                </div>
              </div>

              <button 
                onClick={() => handleInitiateTrade(ad)}
                className={`px-6 py-3 rounded-xl font-black text-xs shadow-md transition-all ${
                  ad.type === 'SELL' ? 'bg-emerald-500 text-white active:bg-emerald-600' : 'bg-rose-500 text-white active:bg-rose-600'
                }`}
              >
                {ad.type === 'SELL' ? 'BUY' : 'SELL'}
              </button>
            </div>
          </div>
        )) : (
          <div className="bg-white p-10 text-center rounded-2xl text-gray-400 font-black uppercase text-[10px]">
            No live offers available.
          </div>
        )}
      </div>
    </div>
  );
}