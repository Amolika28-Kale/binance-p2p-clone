import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';

// सर्व पेजेस इंपोर्ट करा
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import P2PPage from './pages/P2PPage';
import TradeDetailsPage from './pages/TradeDetailsPage';
import CreateAdPage from './pages/CreateAdPage'; // जाहिरात टाकण्यासाठी
import MyTradesPage from './pages/MyTradesPage'; // सर्व ट्रेड्स पाहण्यासाठी
import ProfilePage from './pages/ProfilePage';   // प्रोफाइल आणि बॅलन्ससाठी
import MyAdsPage from './pages/MyAdsPage';
import WalletPage from './pages/WalletPage';

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            {/* १. होम आणि ऑथेंटिकेशन */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            {/* २. P2P मार्केटप्लेस */}
            <Route path="/p2p" element={<P2PPage />} />
            <Route path="/post-ad" element={<CreateAdPage />} />

            {/* ३. ट्रेड्स आणि ऑर्डर्स */}
<Route path="/trade/:tradeId" element={<TradeDetailsPage />} />
<Route path="/my-ads" element={<MyAdsPage />} />
            <Route path="/trades" element={<MyTradesPage />} />

            {/* ४. युजर प्रोफाइल */}
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/wallet" element={<WalletPage />} />
            
            {/* जर युजरने चुकीचा पाथ टाकला तर होमवर नेव्हिगेट करा */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}