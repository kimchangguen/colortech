'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

const navItems = [
  { label: '기업정보', href: '/#company-info' },
  { label: '서비스', href: '/#services' },
  { label: '주요제품', href: '/#products' },
  { label: 'FAQ', href: '/#faq' },
  { label: '설치사례', href: '/#installations' },
  { label: '블로그', href: '/blog' },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="text-2xl font-bold tracking-tighter text-[#111111]">COLORTEK</Link>
          <nav aria-label="주 메뉴" className="hidden md:flex space-x-8 lg:space-x-10">
            {navItems.map((item) => (
              <Link key={item.label} href={item.href} className="text-[15px] font-medium text-[#111111] hover:text-[#315EFB] transition-colors">
                {item.label}
              </Link>
            ))}
          </nav>
          <a href="tel:027191644" className="hidden md:flex bg-[#111111] text-white px-5 py-2.5 rounded-full text-[14px] font-medium hover:bg-[#315EFB] transition-colors">
            문의하기 02-719-1644
          </a>
          <button type="button" aria-label={isMobileMenuOpen ? '메뉴 닫기' : '메뉴 열기'} aria-expanded={isMobileMenuOpen} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2 text-[#111111]">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 px-4 pt-2 pb-6 space-y-1">
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-3 text-base font-medium hover:bg-gray-50 rounded-md">
              {item.label}
            </Link>
          ))}
          <div className="pt-4 px-3">
            <a href="tel:027191644" className="block w-full bg-[#111111] text-white px-6 py-3 rounded-full text-base font-medium text-center">문의하기 02-719-1644</a>
          </div>
        </div>
      )}
    </header>
  );
}
