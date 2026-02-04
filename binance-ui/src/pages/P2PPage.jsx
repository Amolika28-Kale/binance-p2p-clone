import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BuySellTabs from '../components/BuySellTabs';
import Filters from '../components/Filters';
import AdsTable from '../components/AdsTable';
import { useAuth } from '../context/AuthContext';
import { adsAPI } from '../utils/api';

export default function P2PPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  const [mode, setMode] = useState('Buy');
  const [type, setType] = useState('BUY');
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const fetchAds = useCallback(async () => {
    if (!isAuthenticated) return;

    try {
      setLoading(true);
      setError('');
      
      const params = {
        type: type,
        page: 1,
        limit: 20,
      };
      
      if (paymentMethod) params.paymentMethod = paymentMethod;
      if (amount) params.minAmount = amount;
      
      const response = await adsAPI.getAds(params);
      
      if (response && response.ads) {
        setAds(response.ads);
      } else if (response && response.error) {
        setError(response.error);
        setAds([]);
      } else {
        setAds([]);
      }
    } catch (err) {
      setError('Error fetching ads: ' + (err.message || 'Network error'));
      setAds([]);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, type, paymentMethod, amount]);

  useEffect(() => {
    fetchAds();
  }, [fetchAds]);

  const handleModeChange = (newMode) => {
    setMode(newMode);
    setType(newMode === 'Buy' ? 'BUY' : 'SELL');
  };

  const handleFilterChange = (filters) => {
    if (filters.paymentMethod !== undefined) {
      setPaymentMethod(filters.paymentMethod);
    }
    if (filters.minAmount !== undefined) {
      setAmount(filters.minAmount);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <Header />

      {/* Main container with responsive padding */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">
        
        {/* Responsive Header Section */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-black text-gray-900 mb-1 uppercase tracking-tight">
            P2P Marketplace
          </h1>
          <p className="text-gray-500 text-xs md:text-sm font-medium">
            Secure peer-to-peer USDT trading with local payment methods.
          </p>
        </div>

        {/* Filters & Tabs: Stacks on mobile, row on desktop */}
        <div className="space-y-4 md:space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
            <div className="w-full lg:w-auto">
              <BuySellTabs mode={mode} onModeChange={handleModeChange} />
            </div>
            <div className="w-full lg:w-auto">
              <Filters onFilterChange={handleFilterChange} />
            </div>
          </div>

          {error && (
            <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <p className="text-red-600 text-xs font-bold uppercase tracking-wider">{error}</p>
            </div>
          )}

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <div className="w-10 h-10 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em]">Updating Market...</p>
            </div>
          ) : (
            /* AdsTable container removes borders on mobile to save space */
            <div className="md:bg-white md:rounded-3xl md:shadow-sm md:border md:border-gray-100 overflow-hidden">
              <AdsTable ads={ads} />
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}