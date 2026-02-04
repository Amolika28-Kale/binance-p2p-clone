import React from 'react';
import { ShoppingCart, TrendingUp } from 'lucide-react';

export default function BuySellTabs({ mode = "Buy", onModeChange = () => {} }) {
  
  return (
    <div className="flex gap-4 md:gap-8 border-b-2 border-gray-200 mb-4 md:mb-6">
      {[
        { label: "Buy", icon: ShoppingCart },
        { label: "Sell", icon: TrendingUp }
      ].map(({ label, icon: Icon }) => (
        <button key={label}
          onClick={() => onModeChange(label)}
          className={`flex items-center gap-1 md:gap-2 text-sm md:text-base font-semibold pb-3 px-2 transition-all ${ 
            mode === label 
              ? "text-black border-b-2 border-yellow-400 -mb-2" 
              : "text-gray-600 hover:text-black border-b-2 border-transparent -mb-2"
          }`}>
          <Icon size={18} />
          <span className="hidden sm:inline">{label}</span>
        </button>
      ))}
    </div>
  )
}
