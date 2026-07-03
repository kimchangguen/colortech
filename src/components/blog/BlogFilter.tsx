'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';

const CATEGORIES = [
  '전체',
  '복합기 렌탈',
  '프린터 렌탈',
  '복합기 추천',
  '설치사례',
  '유지보수',
  '비용안내',
  '업무노하우'
];

export default function BlogFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const currentCategory = searchParams.get('category') || '전체';
  const currentQuery = searchParams.get('q') || '';

  const [searchInput, setSearchInput] = useState(currentQuery);

  // Sync state if URL changes
  useEffect(() => {
    setSearchInput(currentQuery);
  }, [currentQuery]);

  const updateFilters = (category: string, query: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (category !== '전체') {
      params.set('category', category);
    } else {
      params.delete('category');
    }

    if (query.trim()) {
      params.set('q', query.trim());
    } else {
      params.delete('q');
    }

    // Reset to page 1 when filters change
    params.delete('page');

    router.push(`/blog?${params.toString()}`);
  };

  const handleCategoryClick = (cat: string) => {
    updateFilters(cat, searchInput);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters(currentCategory, searchInput);
  };

  return (
    <div className="py-12 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col xl:flex-row justify-between items-center gap-6">
          
          {/* Categories */}
          <div className="w-full xl:w-auto overflow-x-auto hide-scrollbar pb-2 xl:pb-0 flex-1 flex justify-center xl:justify-start">
            <div className="flex gap-2 whitespace-nowrap px-1">
              {CATEGORIES.map((cat) => {
                const isActive = currentCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => handleCategoryClick(cat)}
                    className={`px-[20px] py-[10px] rounded-full text-[15px] font-medium transition-colors border ${
                      isActive 
                        ? 'bg-[#111111] text-white border-[#111111]' 
                        : 'bg-white text-[#777777] border-[#EEEEEE] hover:border-[#cccccc] hover:text-[#111111]'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Search Bar */}
          <form 
            onSubmit={handleSearchSubmit}
            className="w-full sm:w-[320px] flex items-center h-[48px] rounded-[10px] border border-[#EEEEEE] bg-white overflow-hidden px-4 shrink-0 focus-within:border-[#111111] transition-colors"
          >
            <input
              type="text"
              placeholder="검색어를 입력해주세요"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="flex-1 min-w-0 h-full text-[15px] text-[#111111] outline-none placeholder-[#AAAAAA]"
            />
            <button type="submit" className="text-[#999999] hover:text-[#111111] transition-colors ml-2">
              <Search size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
