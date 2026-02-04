import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Menu, X, ShieldCheck, Zap, Wallet, 
  BarChart3, Clock, Headphones, ArrowRight 
} from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const features = [
    { 
      title: "Multiple Payments", 
      desc: "Securely pay via Bank Transfer, UPI, or Digital Wallets.", 
      icon: <Wallet className="text-yellow-500" size={32} /> 
    },
    { 
      title: "Best Market Rates", 
      desc: "Get the most competitive USDT prices updated in real-time.", 
      icon: <BarChart3 className="text-emerald-500" size={32} /> 
    },
    { 
      title: "Instant Settlement", 
      desc: "Fastest crypto release mechanism for a smooth experience.", 
      icon: <Zap className="text-blue-500" size={32} /> 
    },
    { 
      title: "Escrow Protection", 
      desc: "Your funds are held in a secure escrow until the trade is verified.", 
      icon: <ShieldCheck className="text-purple-500" size={32} /> 
    },
    { 
      title: "24/7 Priority Support", 
      desc: "Expert assistance available round the clock for all your trades.", 
      icon: <Headphones className="text-rose-500" size={32} /> 
    },
    { 
      title: "Minimal Trading Fees", 
      desc: "Enjoy the lowest transaction costs in the P2P market.", 
      icon: <Clock className="text-orange-500" size={32} /> 
    },
  ];

  return (
    <div className="min-h-screen bg-[#0b0e11] text-[#eaecef] font-sans selection:bg-yellow-500/30">
      
      {/* --- Modern Navigation --- */}
      <nav className="fixed top-0 w-full z-50 bg-[#0b0e11]/80 backdrop-blur-xl border-b border-[#2b3139]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-yellow-500 p-1.5 rounded-lg shadow-[0_0_15px_rgba(252,213,53,0.3)]">
              <Zap size={24} className="text-black fill-black" />
            </div>
            <h1 className="text-xl md:text-2xl font-black tracking-tighter text-white">
              CRYPTO<span className="text-yellow-500">P2P</span>
            </h1>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => navigate('/login')} className="text-sm font-semibold hover:text-yellow-500 transition-colors">Log In</button>
            <button 
              onClick={() => navigate('/signup')} 
              className="bg-yellow-500 text-black px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-yellow-400 transition-all hover:scale-105 active:scale-95 shadow-lg"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Sidebar */}
        <div className={`absolute w-full bg-[#181a20] border-b border-[#2b3139] transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-64' : 'max-h-0'}`}>
          <div className="p-6 space-y-4">
            <button onClick={() => navigate('/login')} className="block w-full text-center py-3 font-semibold border border-[#2b3139] rounded-lg">Log In</button>
            <button onClick={() => navigate('/signup')} className="block w-full bg-yellow-500 text-black p-3 rounded-lg font-bold text-center">Sign Up</button>
          </div>
        </div>
      </nav>

      {/* --- Hero Section --- */}
      <section className="relative pt-40 pb-20 px-4 overflow-hidden">
        {/* Animated Background Blobs */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-yellow-500/10 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-blue-500/10 blur-[100px] rounded-full animate-pulse delay-700"></div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="text-center lg:text-left space-y-8">
            <div className="inline-flex items-center gap-2 bg-[#1e2329] border border-[#2b3139] px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium text-yellow-500">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
              </span>
              India's Premier USDT Marketplace
            </div>
            
            <h2 className="text-5xl sm:text-6xl lg:text-8xl font-black tracking-tight leading-[0.9] text-white">
              The Smarter Way To Trade <span className="text-yellow-500">USDT.</span>
            </h2>
            
            <p className="text-[#848e9c] text-lg sm:text-xl max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
              Join thousands of traders using the fastest peer-to-peer engine. Secure, anonymous, and powered by trust.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button 
                onClick={() => navigate('/p2p')} 
                className="group px-10 py-5 bg-yellow-500 text-black font-bold rounded-xl text-lg hover:bg-yellow-400 transition-all shadow-[0_8px_30px_rgb(252,213,53,0.2)] flex items-center justify-center gap-2"
              >
                Start Trading <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-10 py-5 border border-[#2b3139] rounded-xl font-bold text-white hover:bg-white/5 transition-all text-lg backdrop-blur-sm">
                View Live Ads
              </button>
            </div>
          </div>

          {/* Floating Price Widget */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-[2rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative bg-[#1e2329] border border-[#2b3139] rounded-[2rem] p-8 shadow-2xl">
              <div className="flex justify-between items-center mb-10">
                <div>
                  <h3 className="text-2xl font-bold text-white">Live Market</h3>
                  <p className="text-xs text-[#848e9c] mt-1 uppercase tracking-widest">Region: India / INR</p>
                </div>
                <div className="bg-[#0b0e11] px-4 py-2 rounded-xl border border-[#2b3139] text-emerald-400 font-mono font-bold">
                  USDT/INR
                </div>
              </div>

              <div className="space-y-6">
                {[
                  { label: "Best Buy Price", price: "₹91.45", trend: "+0.2%", color: "text-emerald-400", bg: "bg-emerald-400/5" },
                  { label: "Best Sell Price", price: "₹91.60", trend: "-0.1%", color: "text-rose-400", bg: "bg-rose-400/5" },
                ].map((item, i) => (
                  <div key={i} className={`flex justify-between items-center p-6 ${item.bg} rounded-2xl border border-white/5 hover:border-white/10 transition-all`}>
                    <span className="text-[#848e9c] font-semibold">{item.label}</span>
                    <div className="text-right">
                      <p className={`text-3xl font-black ${item.color}`}>{item.price}</p>
                      <p className="text-[10px] font-bold opacity-60 mt-1 uppercase">24H High: ₹92.10</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Feature Showcase --- */}
      <section className="py-32 max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h3 className="text-4xl sm:text-5xl font-black text-white mb-4">Built For Speed.<br/>Designed For Security.</h3>
            <p className="text-[#848e9c] font-medium text-lg">Every feature is crafted to ensure your trading experience is as smooth as possible.</p>
          </div>
          <div className="h-px bg-[#2b3139] flex-grow mx-8 hidden lg:block"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div key={i} className="group p-10 rounded-[2rem] bg-[#1e2329]/50 border border-[#2b3139] hover:border-yellow-500/50 transition-all duration-500 hover:-translate-y-2">
              <div className="mb-6 bg-[#0b0e11] w-16 h-16 rounded-2xl flex items-center justify-center border border-[#2b3139] group-hover:shadow-[0_0_20px_rgba(252,213,53,0.1)] transition-all">
                {f.icon}
              </div>
              <h4 className="text-2xl font-bold text-white mb-3 tracking-tight">{f.title}</h4>
              <p className="text-[#848e9c] text-sm leading-relaxed font-medium">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- Simple Footer --- */}
      <footer className="border-t border-[#2b3139] py-16 px-4 bg-[#0b0e11]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2 opacity-50">
            <Zap size={20} />
            <span className="font-bold tracking-tight">CRYPTO P2P 2026</span>
          </div>
          <div className="flex gap-8 text-[#848e9c] text-sm font-semibold">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Risk Warning</a>
          </div>
          <p className="text-[#848e9c] text-xs">Only USDT/INR Pairs Supported.</p>
        </div>
      </footer>
    </div>
  );
}