import React from 'react';
import Link from 'next/link';
import { WP_Post } from '@/lib/wordpress';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface BlogPaginationProps {
  prevPost: WP_Post | null;
  nextPost: WP_Post | null;
}

export default function BlogPagination({ prevPost, nextPost }: BlogPaginationProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-16 pt-8 border-t border-gray-200">
      {/* Previous Post (Older) */}
      <div>
        {prevPost ? (
          <Link href={`/blog/${prevPost.slug}`} className="group flex flex-col p-4 rounded-xl hover:bg-gray-50 transition-colors">
            <span className="flex items-center text-sm text-[#555555] mb-2">
              <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
              이전글
            </span>
            <span className="font-medium text-[#111111] line-clamp-1" dangerouslySetInnerHTML={{ __html: prevPost.title.rendered }}></span>
          </Link>
        ) : (
          <div className="p-4">
            <span className="flex items-center text-sm text-gray-400 mb-2">
              <ArrowLeft size={16} className="mr-2" />
              이전글
            </span>
            <span className="font-medium text-gray-400">이전 글이 없습니다.</span>
          </div>
        )}
      </div>

      {/* Next Post (Newer) */}
      <div className="text-right">
        {nextPost ? (
          <Link href={`/blog/${nextPost.slug}`} className="group flex flex-col items-end p-4 rounded-xl hover:bg-gray-50 transition-colors">
            <span className="flex items-center justify-end text-sm text-[#555555] mb-2">
              다음글
              <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </span>
            <span className="font-medium text-[#111111] line-clamp-1" dangerouslySetInnerHTML={{ __html: nextPost.title.rendered }}></span>
          </Link>
        ) : (
          <div className="p-4 flex flex-col items-end">
            <span className="flex items-center justify-end text-sm text-gray-400 mb-2">
              다음글
              <ArrowRight size={16} className="ml-2" />
            </span>
            <span className="font-medium text-gray-400">다음 글이 없습니다.</span>
          </div>
        )}
      </div>
    </div>
  );
}
