'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Search } from 'lucide-react';
import { productsData, categories } from '@/data/products';

const ProductsSection = () => {
  const [activeCategory, setActiveCategory] = useState('전체');
  const [searchQuery, setSearchQuery] = useState('');

  // 1. Filter by category
  const filteredByCategory = activeCategory === '전체' 
    ? productsData 
    : productsData.filter(p => p.category === activeCategory);
    
  // 2. Filter by search query (name match)
  const filteredProducts = filteredByCategory.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="text-[#0056D2] font-semibold tracking-wider uppercase text-sm mb-4 block">
            Products
          </span>
          <h2 className="text-[32px] md:text-[44px] font-bold text-[#111111] leading-[1.3] mb-6">
            칼라테크OA 주요제품
          </h2>
          <p className="text-[16px] md:text-[18px] text-[#555555] leading-relaxed whitespace-pre-line">
            {'기업 환경에 맞는 복합기, 프린터, 스캐너 장비를\n용도와 규모에 따라 합리적으로 제안합니다.'}
          </p>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 mb-12">
          
          {/* Category Pills (scrollable on mobile) */}
          <div className="flex-1 w-full overflow-x-auto hide-scrollbar pb-2 xl:pb-0">
            <div className="flex gap-2 whitespace-nowrap">
              {categories.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-[18px] py-[10px] rounded-full text-[15px] font-medium transition-colors border ${
                      isActive 
                        ? 'bg-[#111111] text-white border-[#111111]' 
                        : 'bg-white text-[#999999] border-[#E5E5E5] hover:border-[#cccccc]'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Search Bar */}
          <div className="w-full xl:w-auto flex items-center h-[44px] rounded-[8px] border border-[#E5E5E5] bg-white overflow-hidden px-3 shrink-0 focus-within:border-[#111111] transition-colors">
            <select className="h-full bg-transparent text-[#555555] text-[14px] outline-none pr-2 border-r border-[#E5E5E5] cursor-pointer">
              <option value="제목">제목</option>
            </select>
            <input
              type="text"
              placeholder="검색어를 입력해주세요."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 min-w-[200px] h-full px-3 text-[14px] text-[#111111] outline-none placeholder-[#999999]"
            />
            <button className="text-[#999999] hover:text-[#111111] transition-colors">
              <Search size={18} />
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-[24px] gap-y-[36px]">
          {filteredProducts.map((product) => (
            <div 
              key={product.id}
              className="group bg-white border border-[#EEEEEE] rounded-[20px] overflow-hidden min-h-[300px] flex flex-col cursor-pointer transition-all duration-300 ease-out hover:-translate-y-[6px] hover:border-[#111111] hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)]"
            >
              {/* Image Area */}
              <div className="relative w-full h-[210px] bg-[#FAFAFA] p-[24px] flex items-center justify-center overflow-hidden">
                <div className="relative w-full h-full">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain transition-transform duration-300 ease-out group-hover:scale-[1.04]"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  />
                </div>
              </div>

              {/* Text Area */}
              <div className="p-[20px_22px_24px] flex flex-col flex-grow bg-white">
                <span className="text-[13px] text-[#888888] mb-1.5 block">
                  {product.category}
                </span>
                <h3 className="text-[17px] font-bold text-[#111111] leading-[1.4] line-clamp-2">
                  {product.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
        
        {/* No Results Message */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20 text-[#888888]">
            검색 결과가 없습니다.
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductsSection;
