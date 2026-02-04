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
  
  // States
  const [mode, setMode] = useState('Buy');
  const [type, setType] = useState('BUY');
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [amount, setAmount] = useState('');

  // Authentication Check
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  /**
   * Fetch Ads Function
   * useCallback वापरल्यामुळे हे फंक्शन प्रत्येक रेंडरला नवीन तयार होणार नाही, 
   * ज्यामुळे Infinite Loop टळतो.
   */
  const fetchAds = useCallback(async () => {
    if (!isAuthenticated) return;

    try {
      setLoading(true);
      setError('');
      
      const params = {
        type: type, // 'BUY' or 'SELL'
        page: 1,
        limit: 20,
      };
      
      if (paymentMethod) params.paymentMethod = paymentMethod;
      if (amount) params.minAmount = amount;
      
      console.log('Fetching ads with params:', params);
      const response = await adsAPI.getAds(params);
      console.log('API Response:', response);
      
      if (response && response.ads) {
        setAds(response.ads);
      } else if (response && response.error) {
        setError(response.error);
        setAds([]);
      } else {
        setAds([]);
      }
    } catch (err) {
      console.error('Error fetching ads:', err);
      setError('Error fetching ads: ' + (err.message || 'Network error'));
      setAds([]);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, type, paymentMethod, amount]); // या गोष्टी बदलल्या कीच फंक्शन अपडेट होईल

  /**
   * Data Fetcher useEffect
   * हे "Source of Truth" आहे. जेव्हा जेव्हा Filters किंवा Mode बदलेल, 
   * तेव्हा हे आपोआप fetchAds() ला कॉल करेल.
   */
  useEffect(() => {
    fetchAds();
  }, [fetchAds]);

  // Handlers - फक्त स्टेट बदला, API कॉल इथून करू नका
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
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Page Title Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">P2P Trading</h1>
          <p className="text-gray-600">Buy and sell USDT safely with verified traders.</p>
        </div>

        {/* Filters & Tabs Section */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <BuySellTabs mode={mode} onModeChange={handleModeChange} />
            <Filters onFilterChange={handleFilterChange} />
          </div>

          {/* Error Message Display */}
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-600 text-sm font-medium">{error}</p>
            </div>
          )}

          {/* Conditional Rendering for Loading or Ads Table */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-500 font-medium italic">Finding best offers for you...</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <AdsTable ads={ads} />
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}