import React from 'react';
import { Star, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { tradesAPI } from '../utils/api';

export default function AdsTable({ ads, loading, error }) {
  const navigate = useNavigate();

  // ट्रेड सुरू करण्याचे लॉजिक
  const handleInitiateTrade = async (ad) => {
    const amount = prompt(`Enter amount of USDT to buy (Price: ₹${ad.price}):\nMin: ${ad.minOrderAmount} INR`);
    
    if (!amount || isNaN(amount) || Number(amount) < ad.minOrderAmount) {
      alert(`Invalid amount! Minimum required is ₹${ad.minOrderAmount}`);
      return;
    }

    try {
      const res = await tradesAPI.createTrade({
        adId: ad._id,
        amount: Number(amount) / ad.price, // INR ला USDT मध्ये रूपांतरित करणे
        paymentMethod: ad.paymentMethods[0] || 'UPI'
      });

      if (res.success) {
        // ट्रेड आयडीसह नवीन ऑर्डर पेजवर जा
        navigate(`/trade/${res.trade._id}`);
      } else {
        alert(res.message || "Could not start trade.");
      }
    } catch (err) {
      console.error("Trade error:", err);
      alert("Something went wrong!");
    }
  };

  if (loading) return (
    <div className="bg-white p-20 text-center rounded-xl border border-gray-100 shadow-sm">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
      <p className="text-gray-500 font-medium">Fetching best rates...</p>
    </div>
  );

  if (error) return (
    <div className="bg-red-50 p-10 text-center rounded-xl border border-red-100 text-red-600">
      <p className="font-bold">Error Loading Ads</p>
      <p className="text-sm">{error}</p>
    </div>
  );

  const displayAds = ads || [];

  if (displayAds.length === 0) return (
    <div className="bg-white p-20 text-center rounded-xl border border-gray-100 text-gray-400">
      No active ads found for your search.
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Desktop View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 text-xs uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4 font-bold">Advertiser</th>
              <th className="px-6 py-4 font-bold">Price</th>
              <th className="px-6 py-4 font-bold">Limit / Available</th>
              <th className="px-6 py-4 font-bold">Payment</th>
              <th className="px-6 py-4 font-bold text-center">Stats</th>
              <th className="px-6 py-4 text-right">Trade</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {displayAds.map((ad) => (
              <tr key={ad._id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-blue-600 hover:underline cursor-pointer">
                      {ad.advertiser?.firstName} {ad.advertiser?.lastName}
                    </span>
                    {ad.advertiser?.isVerified && <CheckCircle2 size={14} className="text-emerald-500" />}
                  </div>
                  <p className="text-[10px] text-gray-400 mt-1 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> Online
                  </p>
                </td>
                <td className="px-6 py-5">
                  <div className="text-xl font-black text-gray-900">{ad.price.toFixed(2)} <span className="text-xs font-normal text-gray-400">INR</span></div>
                </td>
                <td className="px-6 py-5 text-sm">
                  <div className="flex flex-col gap-1">
                    <p><span className="text-gray-400">Available:</span> <span className="font-medium text-gray-700">{ad.availableAmount.toFixed(2)} USDT</span></p>
                    <p><span className="text-gray-400">Limit:</span> <span className="font-medium text-gray-700">₹{ad.minOrderAmount.toLocaleString()} - ₹{ad.maxOrderAmount.toLocaleString()}</span></p>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="flex flex-wrap gap-1">
                    {ad.paymentMethods?.map((pm, i) => (
                      <span key={i} className="px-2 py-0.5 bg-yellow-50 text-yellow-700 border border-yellow-200 rounded text-[10px] font-bold uppercase">
                        {pm}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-5 text-center">
                  <p className="text-sm font-bold text-gray-700">{ad.advertiser?.completedTrades || 0} Trades</p>
                  <p className="text-xs text-emerald-500 font-bold">{ad.advertiser?.rating || 100}% Rating</p>
                </td>
                <td className="px-6 py-5 text-right">
                  <button 
                    onClick={() => handleInitiateTrade(ad)}
                    className={`px-6 py-2 rounded-lg font-bold text-sm transition-all shadow-sm ${ad.type === 'SELL' ? 'bg-emerald-500 text-white hover:bg-emerald-600' : 'bg-rose-500 text-white hover:bg-rose-600'}`}
                  >
                    {ad.type === 'SELL' ? 'Buy USDT' : 'Sell USDT'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="md:hidden divide-y divide-gray-100">
        {displayAds.map((ad) => (
          <div key={ad._id} className="p-4 space-y-4">
            <div className="flex justify-between items-start">
              <div className="font-bold text-blue-600">{ad.advertiser?.firstName}</div>
              <div className="text-right">
                <p className="text-lg font-black">₹{ad.price.toFixed(2)}</p>
                <p className="text-[10px] text-emerald-500 font-bold">{ad.advertiser?.rating}% Success</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
              <p>Limit: ₹{ad.minOrderAmount}</p>
              <p className="text-right">Available: {ad.availableAmount} USDT</p>
            </div>
            <button 
              onClick={() => handleInitiateTrade(ad)}
              className="w-full bg-yellow-400 text-black py-3 rounded-xl font-bold text-sm"
            >
              Trade Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}