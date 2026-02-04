import React from 'react';
import { Bitcoin, Twitter, Mail, MessageCircle, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white border-t border-yellow-500/20 mt-20">
      {/* Main Footer */}
      <div className="max-w-full px-4 md:px-6 py-8 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 md:gap-8 mb-8 md:mb-12">
          {/* Brand */}
          <div className="col-span-1 sm:col-span-2 md:col-span-1">
            <p className="font-semibold text-yellow-400 mb-4 flex items-center gap-2">
              <Bitcoin size={20} /> CryptoP2P
            </p>
            <p className="text-xs md:text-sm text-gray-400 mb-4">Global peer-to-peer crypto trading platform</p>
          </div>

          {/* Products */}
          <div>
            <p className="font-semibold text-yellow-400 mb-4 text-sm md:text-base">Products</p>
            <ul className="space-y-2 text-xs md:text-sm text-gray-400">
              <li><a href="#" className="hover:text-yellow-400 transition">P2P Trading</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition">Buy Crypto</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition">Wallet</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition">Exchange</a></li>
            </ul>
          </div>

          {/* Learn */}
          <div>
            <p className="font-semibold text-yellow-400 mb-4 text-sm md:text-base">Learn</p>
            <ul className="space-y-2 text-xs md:text-sm text-gray-400">
              <li><a href="#" className="hover:text-yellow-400 transition">Academy</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition">Blog</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition">Guides</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition">Support</a></li>
            </ul>
          </div>

          {/* Platform */}
          <div>
            <p className="font-semibold text-yellow-400 mb-4 text-sm md:text-base">Platform</p>
            <ul className="space-y-2 text-xs md:text-sm text-gray-400">
              <li><a href="#" className="hover:text-yellow-400 transition">Security</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition">API Docs</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition">Partners</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition">Careers</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="font-semibold text-yellow-400 mb-4 text-sm md:text-base">Legal</p>
            <ul className="space-y-2 text-xs md:text-sm text-gray-400">
              <li><a href="#" className="hover:text-yellow-400 transition">Terms</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition">Privacy</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition">Risk Warning</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition">Contact</a></li>
            </ul>
          </div>
        </div>
        
        {/* Social Links */}
        <div className="border-t border-gray-700 pt-6 md:pt-8 flex justify-center gap-6 mb-8">
          <a href="#" className="text-gray-400 hover:text-yellow-400 transition transform hover:scale-110">
            <Twitter size={24} />
          </a>
          <a href="#" className="text-gray-400 hover:text-yellow-400 transition transform hover:scale-110">
            <Mail size={24} />
          </a>
          <a href="#" className="text-gray-400 hover:text-yellow-400 transition transform hover:scale-110">
            <MessageCircle size={24} />
          </a>
          <a href="#" className="text-gray-400 hover:text-yellow-400 transition transform hover:scale-110">
            <Youtube size={24} />
          </a>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-yellow-500/20 bg-black/50 px-4 md:px-6 py-4 md:py-6 text-center">
        <p className="text-xs md:text-sm text-gray-400">&copy; 2026 CryptoP2P. All rights reserved. | Disclaimer: Cryptocurrency trading is highly volatile.</p>
      </div>
    </footer>
  );
}
