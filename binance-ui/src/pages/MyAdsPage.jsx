import React, { useEffect, useState } from 'react';
import { adsAPI } from '../utils/api';
import { Trash2, Plus, Megaphone, Loader2, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function MyAdsPage() {
  const [myAds, setMyAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMyAds();
  }, []);

  const fetchMyAds = async () => {
    try {
      setLoading(true);
      const res = await adsAPI.getMyAds(); 
      if (res && res.success) {
        setMyAds(res.ads);
      }
    } catch (err) {
      console.error("Error fetching ads:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this advertisement?")) return;
    try {
      const res = await adsAPI.deleteAd(id);
      if (res && res.success) {
        setMyAds(prev => prev.filter(ad => ad._id !== id));
      }
    } catch (err) {
      alert("Error deleting ad.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0e11] text-white font-sans">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        {/* Responsive Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-black italic tracking-tighter uppercase">My Advertisements</h1>
            <p className="text-gray-400 text-xs md:text-sm">Manage your active buy/sell listings.</p>
          </div>
          <button 
            onClick={() => navigate('/post-ad')}
            className="w-full sm:w-auto bg-yellow-400 text-black px-6 py-3 rounded-xl font-black text-xs flex items-center justify-center gap-2 hover:bg-yellow-500 transition-all shadow-lg"
          >
            <Plus size={16} /> POST NEW AD
          </button>
        </div>

        {loading ? (
          <div className="py-24 text-center flex flex-col items-center justify-center">
            <Loader2 className="animate-spin text-yellow-500 mb-4" size={40} />
            <p className="text-gray-500 font-bold uppercase text-[10px] tracking-widest">Syncing listings...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Desktop View: Table Layout (Hidden on Mobile) */}
            <div className="hidden md:block bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50 border-b border-gray-100 text-gray-400 text-[10px] font-black uppercase tracking-widest">
                  <tr>
                    <th className="px-6 py-5">Type</th>
                    <th className="px-6 py-5">Price</th>
                    <th className="px-6 py-5">Asset</th>
                    <th className="px-6 py-5">Limits (INR)</th>
                    <th className="px-6 py-5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 text-black">
                  {myAds.map((ad) => (
                    <tr key={ad._id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black ${
                          ad.type === 'SELL' ? 'bg-rose-100 text-rose-600' : 'bg-emerald-100 text-emerald-600'
                        }`}>
                          {ad.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-black text-lg">₹{ad.price.toFixed(2)}</td>
                      <td className="px-6 py-4 font-bold text-gray-600">{ad.asset}</td>
                      <td className="px-6 py-4 text-xs font-medium text-gray-500">
                        ₹{ad.minOrderAmount.toLocaleString()} - ₹{ad.maxOrderAmount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button onClick={() => handleDelete(ad._id)} className="text-gray-400 hover:text-rose-500 p-2 transition-all">
                          <Trash2 size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile View: Card Layout (Hidden on Desktop) */}
            <div className="md:hidden space-y-4">
              {myAds.map((ad) => (
                <div key={ad._id} className="bg-[#1e2329] border border-[#2b3139] p-5 rounded-2xl relative">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-2">
                      <div className={`p-2 rounded-lg ${ad.type === 'SELL' ? 'bg-rose-500/10 text-rose-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
                        {ad.type === 'SELL' ? <ArrowUpRight size={18}/> : <ArrowDownRight size={18}/>}
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{ad.type} {ad.asset}</p>
                        <p className="text-xl font-black text-white">₹{ad.price.toFixed(2)}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleDelete(ad._id)}
                      className="p-2 bg-rose-500/10 text-rose-500 rounded-lg"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#2b3139]">
                    <div>
                      <p className="text-[9px] font-bold text-gray-500 uppercase">Available</p>
                      <p className="text-sm font-bold text-gray-200">{ad.availableAmount} USDT</p>
                    </div>
                    <div>
                      <p className="text-[9px] font-bold text-gray-500 uppercase">Order Limits</p>
                      <p className="text-[11px] font-bold text-gray-200">
                        ₹{ad.minOrderAmount.toLocaleString()} - ₹{ad.maxOrderAmount.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {myAds.length === 0 && (
              <div className="p-20 text-center text-gray-400 flex flex-col items-center justify-center bg-[#1e2329] rounded-[2.5rem] border-2 border-dashed border-[#2b3139]">
                <Megaphone size={48} className="mb-4 opacity-10" />
                <p className="font-bold">You haven't posted any ads yet.</p>
                <button 
                  onClick={() => navigate('/post-ad')}
                  className="mt-4 text-yellow-500 font-black text-xs hover:underline uppercase tracking-widest"
                >
                  Create your first listing
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}