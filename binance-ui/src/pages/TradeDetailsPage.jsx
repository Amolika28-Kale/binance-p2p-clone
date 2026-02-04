import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { tradesAPI } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { Clock, ShieldCheck, MessageSquare, Send, AlertCircle, CheckCircle2, ArrowLeft } from 'lucide-react';

export default function TradeDetailsPage() {
  const { tradeId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [trade, setTrade] = useState(null);
  const [loading, setLoading] = useState(true);
  const [msgInput, setMsgInput] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    fetchTradeDetails();
    const interval = setInterval(fetchTradeDetails, 5000);
    return () => clearInterval(interval);
  }, [tradeId]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [trade?.chatHistory]);

  const fetchTradeDetails = async () => {
    try {
      const res = await tradesAPI.getTradeById(tradeId);
      if (res.success) setTrade(res.trade);
    } catch (err) {
      console.error("Authorization or Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (newStatus) => {
    const confirmMsg = newStatus === 'COMPLETED' 
      ? "HAVE YOU RECEIVED THE MONEY? Releasing assets is irreversible." 
      : "Confirm this status update?";
      
    if (!window.confirm(confirmMsg)) return;

    try {
      const res = await tradesAPI.updateTradeStatus(tradeId, newStatus);
      if (res.success) setTrade(res.trade);
    } catch (err) {
      alert("Action failed. You might not be authorized for this step.");
    }
  };

  const handleSendMessage = async () => {
    if (!msgInput.trim()) return;
    try {
      const res = await tradesAPI.addMessage(tradeId, msgInput);
      if (res.success) {
        setTrade(res.trade);
        setMsgInput("");
      }
    } catch (err) {
      console.error("Chat error:", err);
    }
  };

  if (loading) return <div className="p-10 md:p-20 text-center text-white bg-[#0b0e11] min-h-screen">Verifying Trade Permissions...</div>;
  
  if (!trade) return (
    <div className="p-10 md:p-20 text-center bg-[#0b0e11] min-h-screen">
      <p className="text-red-500 font-bold mb-4">Trade not found or Access Denied.</p>
      <button onClick={() => navigate('/trades')} className="text-yellow-500 underline flex items-center gap-2 mx-auto">
        <ArrowLeft size={16}/> Back to My Trades
      </button>
    </div>
  );

  const currentUserId = (user?.id || user?._id)?.toString();
  const buyerId = (trade.buyer._id || trade.buyer)?.toString();
  const sellerId = (trade.seller._id || trade.seller)?.toString();
  const isBuyer = currentUserId === buyerId;
  const isSeller = currentUserId === sellerId;

  return (
    <div className="min-h-screen bg-[#0b0e11] text-[#eaecef] p-3 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        
        {/* Left Section: Trade Details */}
        <div className="lg:col-span-2 space-y-4 md:space-y-6">
          
          {/* Header Card: Stacked on mobile, row on desktop */}
          <div className="bg-[#1e2329] border border-[#2b3139] rounded-xl md:rounded-2xl p-4 md:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="w-full sm:w-auto">
              <h2 className="text-xl md:text-2xl font-black text-white uppercase italic truncate">
                {trade.status.replace('_', ' ')}
              </h2>
              <p className="text-[#848e9c] text-[10px] md:text-xs font-bold mt-1">Order ID: {trade._id}</p>
            </div>
            <div className="bg-[#0b0e11] px-4 py-2 md:px-6 md:py-3 rounded-xl border border-yellow-500/30 text-center w-full sm:w-auto">
              <p className="text-[10px] text-[#848e9c] uppercase font-black tracking-widest">Escrow Timer</p>
              <p className="text-lg md:text-2xl font-mono font-bold text-yellow-500 flex items-center justify-center gap-2">
                <Clock size={18} /> 15:00
              </p>
            </div>
          </div>

          <div className="bg-[#1e2329] border border-[#2b3139] rounded-xl md:rounded-2xl p-5 md:p-8 space-y-6 md:space-y-8">
            
            {/* Amount Grid: Single column on small, 3 columns on desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              <div className="bg-[#0b0e11]/50 p-3 rounded-lg md:bg-transparent md:p-0">
                <p className="text-[#848e9c] text-[10px] md:text-xs font-bold uppercase tracking-wider">Fiat Amount</p>
                <p className="text-xl md:text-2xl font-black text-white">₹{trade.totalPrice.toLocaleString()}</p>
              </div>
              <div className="bg-[#0b0e11]/50 p-3 rounded-lg md:bg-transparent md:p-0">
                <p className="text-[#848e9c] text-[10px] md:text-xs font-bold uppercase tracking-wider">Price</p>
                <p className="text-xl md:text-2xl font-black text-white">₹{trade.price}</p>
              </div>
              <div className="bg-[#0b0e11]/50 p-3 rounded-lg md:bg-transparent md:p-0">
                <p className="text-[#848e9c] text-[10px] md:text-xs font-bold uppercase tracking-wider">Quantity</p>
                <p className="text-xl md:text-2xl font-black text-emerald-400">{trade.amount.toFixed(2)} USDT</p>
              </div>
            </div>

            {/* Payment Section */}
            <div className="bg-[#0b0e11] p-4 md:p-6 rounded-xl md:rounded-2xl border border-[#2b3139] space-y-4">
              <h4 className="font-bold text-xs md:text-sm flex items-center gap-2 text-yellow-500 uppercase">
                <AlertCircle size={16} /> Payment Information
              </h4>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-t border-[#2b3139] pt-4 gap-2">
                <p className="text-gray-400 text-[10px] md:text-sm">Target UPI ID</p>
                <div className="bg-[#1e2329] px-3 py-2 rounded-lg border border-[#2b3139] font-mono text-yellow-500 font-bold select-all text-xs md:text-base w-full sm:w-auto break-all text-center sm:text-left">
                  {trade.seller?.upiId || 'Check Chat for Details'}
                </div>
              </div>
            </div>

            {/* Action Buttons: Vertical stack on mobile */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              {isBuyer && trade.status === 'PENDING' && (
                <button onClick={() => handleUpdateStatus('PAYMENT_SENT')} className="w-full sm:flex-1 bg-yellow-500 text-black font-black py-3 md:py-4 rounded-xl hover:bg-yellow-400 transition-all text-sm md:text-base">
                  I HAVE PAID
                </button>
              )}
              
              {isSeller && trade.status === 'PAYMENT_SENT' && (
                <button onClick={() => handleUpdateStatus('COMPLETED')} className="w-full sm:flex-1 bg-emerald-500 text-white font-black py-3 md:py-4 rounded-xl hover:bg-emerald-600 transition-all text-sm md:text-base">
                  RELEASE USDT
                </button>
              )}

              {trade.status !== 'COMPLETED' && (
                <button onClick={() => handleUpdateStatus('CANCELLED')} className="w-full sm:flex-1 border border-[#2b3139] font-bold py-3 md:py-4 rounded-xl hover:bg-white/5 transition-all text-xs md:text-sm">
                  CANCEL ORDER
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Section: Chat - Optimized height and fixed input for mobile view */}
        <div className="bg-[#1e2329] border border-[#2b3139] rounded-xl md:rounded-2xl flex flex-col h-[450px] md:h-[600px] lg:h-auto overflow-hidden">
          <div className="p-3 md:p-4 border-b border-[#2b3139] bg-[#2b3139]/50">
            <span className="font-bold flex items-center gap-2 tracking-tight text-sm md:text-base">
              <MessageSquare size={16} md:size={18} className="text-yellow-500"/> Live Order Chat
            </span>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-3 md:p-4 overflow-y-auto space-y-3 md:space-y-4 no-scrollbar">
            {trade.chatHistory?.map((msg, i) => (
              <div key={i} className={`flex ${msg.sender.toString() === currentUserId ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-2 md:p-3 rounded-xl md:rounded-2xl text-[12px] md:text-sm ${
                  msg.sender.toString() === currentUserId 
                    ? 'bg-yellow-500 text-black font-medium rounded-tr-none shadow-sm' 
                    : 'bg-[#2b3139] text-white border border-[#3b4149] rounded-tl-none shadow-sm'
                }`}>
                  {msg.message}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Chat Input Area */}
          <div className="p-3 md:p-4 border-t border-[#2b3139] bg-[#181a20]">
            <div className="flex gap-2 bg-[#0b0e11] rounded-xl p-2 border border-[#2b3139] focus-within:border-yellow-500/50 transition-colors">
              <input 
                type="text" 
                value={msgInput}
                onChange={(e) => setMsgInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Message partner..." 
                className="bg-transparent flex-1 outline-none px-2 text-[12px] md:text-sm text-white"
              />
              <button onClick={handleSendMessage} className="bg-yellow-500 text-black p-2 rounded-lg hover:bg-yellow-400 active:scale-95 transition-all">
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}