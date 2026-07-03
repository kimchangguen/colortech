'use client';

import React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  totalPages: number;
}

export default function Pagination({ totalPages }: PaginationProps) {
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  if (totalPages <= 1) return null;

  const createPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', pageNumber.toString());
    return `/blog?${params.toString()}`;
  };

  // Generate page numbers
  const pages = [];
  const maxVisiblePages = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = startPage + maxVisiblePages - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-center items-center gap-2 pb-32">
      {/* Prev Button */}
      {currentPage > 1 ? (
        <Link 
          href={createPageUrl(currentPage - 1)}
          className="w-10 h-10 flex items-center justify-center rounded-full border border-[#EEEEEE] text-[#666666] hover:border-[#111111] hover:text-[#111111] transition-colors"
        >
          <ChevronLeft size={20} />
        </Link>
      ) : (
        <div className="w-10 h-10 flex items-center justify-center rounded-full border border-[#F5F5F5] text-[#CCCCCC] cursor-not-allowed">
          <ChevronLeft size={20} />
        </div>
      )}

      {/* Page Numbers */}
      {pages.map((page) => {
        const isActive = page === currentPage;
        return (
          <Link
            key={page}
            href={createPageUrl(page)}
            className={`w-10 h-10 flex items-center justify-center rounded-full text-[15px] font-medium transition-colors ${
              isActive 
                ? 'bg-[#111111] text-white' 
                : 'text-[#666666] hover:bg-[#F5F5F5] hover:text-[#111111]'
            }`}
          >
            {page}
          </Link>
        );
      })}

      {/* Next Button */}
      {currentPage < totalPages ? (
        <Link 
          href={createPageUrl(currentPage + 1)}
          className="w-10 h-10 flex items-center justify-center rounded-full border border-[#EEEEEE] text-[#666666] hover:border-[#111111] hover:text-[#111111] transition-colors"
        >
          <ChevronRight size={20} />
        </Link>
      ) : (
        <div className="w-10 h-10 flex items-center justify-center rounded-full border border-[#F5F5F5] text-[#CCCCCC] cursor-not-allowed">
          <ChevronRight size={20} />
        </div>
      )}
    </div>
  );
}
