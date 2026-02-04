import React from 'react';
import { ShoppingCart, TrendingUp } from 'lucide-react';

export default function BuySellTabs({ mode = "Buy", onModeChange = () => {} }) {
  
  return (
    /* flex-1 on container children ensures equal width on mobile if needed */
    <div className="flex w-full md:w-auto gap-2 md:gap-8 border-b-2 border-gray-100 mb-4 md:mb-6">
      {[
        { label: "Buy", icon: ShoppingCart, activeColor: "border-emerald-500 text-emerald-600" },
        { label: "Sell", icon: TrendingUp, activeColor: "border-rose-500 text-rose-600" }
      ].map(({ label, icon: Icon, activeColor }) => (
        <button key={label}
          onClick={() => onModeChange(label)}
          className={`flex flex-1 md:flex-none items-center justify-center gap-2 text-xs md:text-base font-black pb-3 px-4 md:px-2 transition-all uppercase tracking-wider ${ 
            mode === label 
              ? `text-black border-b-2 border-yellow-400 -mb-[2px]` 
              : "text-gray-400 hover:text-gray-900 border-b-2 border-transparent -mb-[2px]"
          }`}
        >
          <Icon size={16} className="md:w-[18px] md:h-[18px]" />
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
}