import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Search, Filter, ChevronDown } from 'lucide-react';

export default function Filters({ onFilterChange = () => {} }) {
  const [payment, setPayment] = useState('');
  const [amount, setAmount] = useState('');
  const [search, setSearch] = useState('');

  // Sync state with parent component
  useEffect(() => {
    onFilterChange({
      paymentMethod: payment,
      minAmount: amount,
      search: search
    });
  }, [payment, amount, search, onFilterChange]);

  const muiStyle = {
    flex: {
      flex: { xs: '1 1 100%', sm: '1 1 150px', md: '0 1 200px' },
    },
    input: {
      '& .MuiOutlinedInput-root': {
        backgroundColor: '#fff',
        borderRadius: '12px',
        fontSize: { xs: '12px', md: '14px' },
        '& fieldset': { borderColor: '#e5e7eb' },
        '&:hover fieldset': { borderColor: '#d1d5db' },
        '&.Mui-focused fieldset': { borderColor: '#facc15' },
      },
      '& .MuiInputLabel-root': {
        fontSize: { xs: '12px', md: '14px' },
        '&.Mui-focused': { color: '#8b8b8b' },
      },
    }
  };

  return (
    <div className="mb-6 space-y-4">
      {/* --- Desktop Top Bar (Hidden on Mobile) --- */}
      <div className="hidden md:flex items-center justify-between bg-white p-2 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex gap-6 px-4">
          <button className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-black transition">
            Payment <ChevronDown size={14} />
          </button>
          <button className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-black transition">
            Fiat <ChevronDown size={14} />
          </button>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Sort By: Price</span>
          <button className="px-4 py-1.5 bg-gray-50 text-gray-400 rounded-lg text-xs font-black border border-gray-100 uppercase">Refresh Ads</button>
        </div>
      </div>

      {/* --- Main Filter Grid (Responsive) --- */}
      <div className="flex flex-wrap gap-3 items-center">
        
        {/* Amount Input: Responsive Width */}
        <TextField 
          size="small" 
          label="Amount" 
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Min Amount"
          sx={{ 
            ...muiStyle.input,
            width: { xs: '47%', sm: '160px' } // Almost half-width on mobile
          }}
        />

        {/* Payment Selector: Responsive Width */}
        <TextField 
          size="small" 
          select 
          label="Payment" 
          value={payment} 
          onChange={(e) => setPayment(e.target.value)}
          sx={{ 
            ...muiStyle.input,
            width: { xs: '47%', sm: '180px' } // Almost half-width on mobile
          }}
        >
          <MenuItem value="">All Payments</MenuItem>
          <MenuItem value="UPI">UPI</MenuItem>
          <MenuItem value="BANK">Bank Transfer</MenuItem>
          <MenuItem value="PAYTM">Paytm</MenuItem>
        </TextField>

        {/* Search Bar: Full width on mobile, fills remaining space on desktop */}
        <TextField 
          size="small" 
          label="Search User" 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Enter nickname..."
          sx={{ 
            ...muiStyle.input,
            flex: { xs: '1 1 100%', sm: '1 1 200px', md: '1' } 
          }}
        />

        {/* Mobile-only Filter Toggle (Optional visual element) */}
        <button className="md:hidden w-full py-3 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-center gap-2 text-[10px] font-black uppercase text-gray-500 tracking-widest">
          <Filter size={14} /> More Filters
        </button>
      </div>
    </div>
  );
}