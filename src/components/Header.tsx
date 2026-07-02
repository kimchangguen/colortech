'use client';

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = ['기업정보', '서비스', '주요제품', 'FAQ', '설치사례'];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="text-2xl font-bold tracking-tighter text-[#111111]">
              COLORTEK
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-10">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item}`}
                className="text-[15px] font-medium text-[#111111] hover:text-gray-500 transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center">
            <button className="bg-[#111111] text-white px-6 py-2.5 rounded-full text-[15px] font-medium hover:bg-gray-800 transition-colors">
              문의하기
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-[#111111] hover:text-gray-600 focus:outline-none"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item}`}
                className="block px-3 py-3 text-base font-medium text-[#111111] hover:bg-gray-50 rounded-md"
              >
                {item}
              </a>
            ))}
            <div className="pt-4 px-3">
              <button className="w-full bg-[#111111] text-white px-6 py-3 rounded-full text-base font-medium hover:bg-gray-800 transition-colors">
                문의하기
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
