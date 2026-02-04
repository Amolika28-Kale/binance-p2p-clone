import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, ShieldCheck, MessageSquare, AlertCircle, CheckCircle2, Copy } from 'lucide-react';
import { tradesAPI } from '../utils/api';

export default function TradeDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trade, setTrade] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(900); // १५ मिनिटे (sec मध्ये)

  // १. ट्रेड डिटेल्स फेच करणे
  useEffect(() => {
    const fetchTrade = async () => {
      try {
        const response = await tradesAPI.getTradeById(id);
        if (response.success) {
          setTrade(response.trade);
          // टाइमर सेट करणे (expiresAt नुसार)
          const remaining = Math.floor((new Date(response.trade.expiresAt) - new Date()) / 1000);
          setTimeLeft(remaining > 0 ? remaining : 0);
        }
      } catch (err) {
        console.error("Trade fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTrade();
  }, [id]);

  // २. टाइमर लॉजिक
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handlePaymentSent = async () => {
    // API द्वारे स्टेटस 'PAYMENT_SENT' वर अपडेट करा
    const res = await tradesAPI.updateTradeStatus(id, 'PAYMENT_SENT');
    if (res.success) setTrade(res.trade);
  };

  if (loading) return <div className="p-20 text-center text-white bg-[#0b0e11] min-h-screen">Loading Trade...</div>;
  if (!trade) return <div className="p-20 text-center text-white bg-[#0b0e11] min-h-screen">Trade not found.</div>;

  return (
    <div className="min-h-screen bg-[#0b0e11] text-[#eaecef] p-4 md:p-8">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-6">
        
        {/* --- Left & Middle: Trade Info --- */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Status Header */}
          <div className="bg-[#1e2329] border border-[#2b3139] rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-2">
                {trade.status === 'PENDING' && "Please Pay the Seller"}
                {trade.status === 'PAYMENT_SENT' && "Waiting for Seller to Release"}
                {trade.status === 'COMPLETED' && <span className="text-emerald-400">Trade Completed</span>}
              </h2>
              <p className="text-[#848e9c] text-sm mt-1">Order ID: {trade._id}</p>
            </div>
            <div className="bg-[#0b0e11] px-6 py-3 rounded-xl border border-yellow-500/30 text-center">
              <p className="text-xs text-[#848e9c] uppercase tracking-wider">Time Remaining</p>
              <p className="text-2xl font-mono font-bold text-yellow-500 flex items-center gap-2">
                <Clock size={20} /> {formatTime(timeLeft)}
              </p>
            </div>
          </div>

          {/* Payment Details */}
          <div className="bg-[#1e2329] border border-[#2b3139] rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-[#2b3139] bg-[#2b3139]/30">
              <h3 className="font-bold text-lg">Confirm Order Info</h3>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-[#848e9c] text-sm">Amount</p>
                  <p className="text-xl font-bold">{trade.totalPrice} INR</p>
                </div>
                <div>
                  <p className="text-[#848e9c] text-sm">Price</p>
                  <p className="text-xl font-bold">₹{trade.price}</p>
                </div>
                <div>
                  <p className="text-[#848e9c] text-sm">Quantity</p>
                  <p className="text-xl font-bold">{trade.amount} USDT</p>
                </div>
              </div>

              {/* Seller's Actual Payment Details */}
              <div className="bg-[#0b0e11] p-6 rounded-xl border border-[#2b3139] space-y-4">
                <h4 className="font-bold flex items-center gap-2">
                  <CreditCard className="text-yellow-500" size={18} /> Seller's Payment Method ({trade.paymentMethod})
                </h4>
                <div className="flex justify-between items-center">
                  <p className="text-gray-400">UPI ID / Bank A/C</p>
                  <div className="flex items-center gap-2 bg-[#1e2329] px-3 py-1 rounded border border-[#2b3139]">
                    <span className="font-mono text-yellow-500">demo@upi</span>
                    <Copy size={14} className="cursor-pointer hover:text-white" />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                {trade.status === 'PENDING' && (
                  <button 
                    onClick={handlePaymentSent}
                    className="flex-1 bg-yellow-500 text-black font-bold py-4 rounded-xl hover:bg-yellow-400 transition-all shadow-lg shadow-yellow-500/10"
                  >
                    Transferred, Notify Seller
                  </button>
                )}
                <button className="flex-1 border border-[#2b3139] font-bold py-4 rounded-xl hover:bg-white/5 transition-all">
                  Cancel Order
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* --- Right: Chat Sidebar --- */}
        <div className="bg-[#1e2329] border border-[#2b3139] rounded-2xl flex flex-col h-[600px] lg:h-auto">
          <div className="p-4 border-b border-[#2b3139] flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-500/10 rounded-full flex items-center justify-center text-yellow-500 font-bold">
              {trade.seller.firstName[0]}
            </div>
            <div>
              <p className="font-bold">{trade.seller.firstName} {trade.seller.lastName}</p>
              <p className="text-[10px] text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span> Online
              </p>
            </div>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-4 text-sm">
             <div className="bg-[#2b3139] p-3 rounded-lg max-w-[80%]">
               Hello, please pay exactly {trade.totalPrice} INR and send me the screenshot.
             </div>
             <div className="bg-yellow-500/10 border border-yellow-500/20 p-3 rounded-lg self-end ml-auto max-w-[80%] text-yellow-100">
               Okay, making the payment now via UPI.
             </div>
          </div>

          <div className="p-4 border-t border-[#2b3139]">
            <div className="flex gap-2 bg-[#0b0e11] rounded-xl p-2 border border-[#2b3139]">
              <input 
                type="text" 
                placeholder="Write a message..." 
                className="bg-transparent flex-1 outline-none px-2 text-sm"
              />
              <button className="bg-yellow-500 text-black p-2 rounded-lg hover:bg-yellow-400">
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}