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
  { label: '보도·수상', href: '/press-awards' },
  { label: '블로그', href: '/blog' },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-md">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-5">
          <Link href="/" className="shrink-0 text-2xl font-bold tracking-tighter text-[#111111]">COLORTEK</Link>
          <nav aria-label="주 메뉴" className="hidden items-center gap-5 lg:flex xl:gap-8">
            {navItems.map((item) => (
              <Link key={item.label} href={item.href} className="whitespace-nowrap text-[14px] font-medium text-[#111111] transition-colors hover:text-[#315EFB] xl:text-[15px]">
                {item.label}
              </Link>
            ))}
          </nav>
          <a href="tel:027191644" className="hidden shrink-0 rounded-full bg-[#111111] px-5 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-[#315EFB] lg:flex">
            문의하기 02-719-1644
          </a>
          <button type="button" aria-label={isMobileMenuOpen ? '메뉴 닫기' : '메뉴 열기'} aria-expanded={isMobileMenuOpen} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-[#111111] lg:hidden">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="border-b border-gray-100 bg-white px-4 pb-6 pt-2 lg:hidden">
          <div className="mx-auto max-w-[720px] space-y-1">
            {navItems.map((item) => (
              <Link key={item.label} href={item.href} onClick={() => setIsMobileMenuOpen(false)} className="block rounded-md px-3 py-3 text-base font-medium hover:bg-gray-50">
                {item.label}
              </Link>
            ))}
            <div className="px-3 pt-4">
              <a href="tel:027191644" className="block w-full rounded-full bg-[#111111] px-6 py-3 text-center text-base font-medium text-white">문의하기 02-719-1644</a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
