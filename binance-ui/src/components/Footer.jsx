import React from 'react';
import { Bitcoin, Twitter, Mail, MessageCircle, Youtube } from 'lucide-react';

export default function Footer() {
  const footerLinks = [
    {
      title: "Products",
      links: ["P2P Trading", "Buy DUBAI", "Wallet", "Exchange"]
    },
    {
      title: "Learn",
      links: ["Academy", "Blog", "Guides", "Support"]
    },
    {
      title: "Platform",
      links: ["Security", "API Docs", "Partners", "Careers"]
    },
    {
      title: "Legal",
      links: ["Terms", "Privacy", "Risk Warning", "Contact"]
    }
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white border-t border-yellow-500/20 mt-12 md:mt-20">
      <div className="max-w-7xl mx-auto px-6 py-10 md:py-16">
        
        {/* Responsive Grid System */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 md:gap-8 mb-12">
          
          {/* Brand Info - Full width on mobile */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 text-yellow-400 font-black text-xl mb-4 italic tracking-tighter">
              <Bitcoin size={24} className="fill-yellow-400" /> DUBAIP2P
            </div>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              Dubai's premier peer-to-peer trading engine for secure asset exchange.
            </p>
          </div>

          {/* Map through Link Categories: 1 col on mobile, 2 on tablet, 4 on desktop */}
          {footerLinks.map((category) => (
            <div key={category.title}>
              <h4 className="font-black text-yellow-400 mb-5 text-xs uppercase tracking-[0.2em]">
                {category.title}
              </h4>
              <ul className="space-y-3">
                {category.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social Links: Larger icons for mobile touch targets */}
        <div className="border-t border-gray-800 pt-10 flex flex-wrap justify-center gap-8 mb-10">
          {[
            { Icon: Twitter, path: "#" },
            { Icon: Mail, path: "#" },
            { Icon: MessageCircle, path: "#" },
            { Icon: Youtube, path: "#" }
          ].map((social, index) => (
            <a 
              key={index}
              href={social.path} 
              className="text-gray-500 hover:text-yellow-400 transition-all transform hover:scale-125"
            >
              <social.Icon size={24} />
            </a>
          ))}
        </div>

        {/* Bottom Disclaimer: Responsive font scaling */}
        <div className="text-center space-y-4">
          <p className="text-[10px] md:text-xs text-gray-600 max-w-3xl mx-auto uppercase font-bold tracking-widest leading-loose">
            Disclaimer: Trading digital assets involves significant risk. The value of assets can fluctuate and users should trade with caution. DUBAIP2P is not liable for P2P transfer disputes.
          </p>
          <div className="h-[1px] w-20 bg-yellow-500/20 mx-auto"></div>
          <p className="text-[10px] text-gray-500 font-medium">
            &copy; 2026 DUBAIP2P Global. All rights reserved.
          </p>
        </div>
      </div>

      {/* Decorative Bottom Bar */}
      <div className="h-1 bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent opacity-30"></div>
    </footer>
  );
}