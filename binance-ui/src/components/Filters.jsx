import React, { useState, useEffect } from 'react';

import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'

export default function Filters({ onFilterChange = () => {} }) {
  const [payment, setPayment] = useState('')
  const [amount, setAmount] = useState('')
  const [search, setSearch] = useState('')

  // Call onFilterChange whenever filters change
  useEffect(() => {
    onFilterChange({
      paymentMethod: payment,
      minAmount: amount,
    });
  }, [payment, amount, onFilterChange]);

  return (
    <div className="mb-4 md:mb-6 space-y-3 md:space-y-4">
      {/* Top Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 bg-white rounded-lg p-2 md:p-3 border border-gray-200 shadow-sm">
        <div className="flex items-center gap-2 cursor-pointer hover:text-gray-900 transition text-sm md:text-base">
          <span className="text-gray-700 font-medium">All payment methods</span>
          <span className="text-gray-400">▼</span>
        </div>
        <div className="flex items-center gap-2 md:ml-auto cursor-pointer hover:text-gray-900 transition text-sm md:text-base">
          <span className="text-gray-700 font-medium">Sort by</span>
          <span className="text-black font-semibold">Price</span>
          <span className="text-gray-400">▼</span>
        </div>
        <button className="md:ml-4 px-3 md:px-4 py-2 bg-white border border-gray-300 rounded text-gray-700 hover:bg-gray-50 transition text-xs md:text-sm font-medium w-full md:w-auto">
          No Ads
        </button>
      </div>

      {/* Search and Filters - Responsive Grid */}
      <div className="grid grid-cols-2 md:flex md:flex-wrap gap-2 md:gap-3">
        <TextField 
          size="small" 
          label="Amount" 
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          variant="outlined"
          placeholder="Min"
          sx={{
            width: 130,
            '& .MuiOutlinedInput-root': {
              backgroundColor: '#fff',
              color: '#000',
              fontSize: '0.875rem',
              borderRadius: '6px',
              '& fieldset': {
                borderColor: '#d1d5db',
              },
              '&:hover fieldset': {
                borderColor: '#9ca3af',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#000',
              },
            },
            '& .MuiInputBase-input::placeholder': {
              color: '#9ca3af',
              opacity: 1,
            },
            '& .MuiInputLabel-root': {
              color: '#6b7280',
              '&.Mui-focused': {
                color: '#000',
              },
            },
          }}
        />
        <TextField 
          size="small" 
          select 
          label="Payment" 
          value={payment} 
          onChange={(e) => setPayment(e.target.value)}
          sx={{
            width: 140,
            '& .MuiOutlinedInput-root': {
              backgroundColor: '#fff',
              color: '#000',
              '& fieldset': {
                borderColor: '#d1d5db',
              },
              '&:hover fieldset': {
                borderColor: '#9ca3af',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#000',
              }
            },
            '& .MuiInputLabel-root': {
              color: '#6b7280',
              '&.Mui-focused': {
                color: '#000',
              },
            },
          }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="UPI">UPI</MenuItem>
          <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
          <MenuItem value="Card">Card</MenuItem>
          <MenuItem value="PayPal">PayPal</MenuItem>
        </TextField>
        <TextField 
          size="small" 
          label="Search advertiser" 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          variant="outlined"
          sx={{
            flex: 1,
            minWidth: 200,
            '& .MuiOutlinedInput-root': {
              backgroundColor: '#fff',
              color: '#000',
              '& fieldset': {
                borderColor: '#d1d5db',
              },
              '&:hover fieldset': {
                borderColor: '#9ca3af',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#000',
              }
            },
            '& .MuiInputLabel-root': {
              color: '#6b7280',
              '&.Mui-focused': {
                color: '#000',
              },
            },
          }}
        />
      </div>
    </div>
  )
}
