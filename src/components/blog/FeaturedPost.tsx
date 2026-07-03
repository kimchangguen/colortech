import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { WP_Post } from '@/lib/wordpress';
import { ArrowRight } from 'lucide-react';

interface FeaturedPostProps {
  post: WP_Post;
}

export default function FeaturedPost({ post }: FeaturedPostProps) {
  let imageUrl = '/images/placeholder.jpg';
  if (post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'].length > 0) {
    imageUrl = post._embedded['wp:featuredmedia'][0].source_url;
  }

  const decodeHtml = (html: string) => {
    return html.replace(/&#8211;/g, '-').replace(/&#8217;/g, "'").replace(/&amp;/g, '&');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
  };

  // Get first category name if available, else '블로그'
  let categoryName = '블로그';
  if (post._embedded && post._embedded['wp:term']) {
    const categories = post._embedded['wp:term'][0];
    if (categories && categories.length > 0) {
      categoryName = categories[0].name;
    }
  }

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mb-16">
      <Link href={`/blog/${post.slug}`} className="block group">
        <div className="flex flex-col lg:flex-row bg-white rounded-[24px] overflow-hidden border border-[#EEEEEE] transition-all duration-[400ms] ease-out hover:-translate-y-[6px] hover:shadow-[0_24px_48px_rgba(0,0,0,0.08)]">
          
          {/* Image */}
          <div className="relative w-full lg:w-[60%] h-[280px] sm:h-[360px] lg:h-[420px] overflow-hidden bg-gray-100">
            <Image 
              src={imageUrl}
              alt={decodeHtml(post.title.rendered)}
              fill
              className="object-cover transition-transform duration-[500ms] ease-out group-hover:scale-[1.04]"
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </div>

          {/* Content */}
          <div className="w-full lg:w-[40%] p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-4">
              <span className="px-3 py-1 bg-[#F5F7FF] text-[#4F7EFF] text-[13px] font-semibold rounded-md">
                {categoryName}
              </span>
              <span className="text-[14px] text-[#999999]">
                {formatDate(post.date)}
              </span>
            </div>
            
            <h3 
              className="text-[24px] sm:text-[28px] font-bold text-[#111111] leading-[1.4] mb-4 line-clamp-2 group-hover:text-[#4F7EFF] transition-colors"
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />
            
            <div 
              className="text-[16px] text-[#666666] leading-[1.8] line-clamp-3 mb-8"
              dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
            />

            <div className="mt-auto flex items-center text-[15px] font-semibold text-[#111111] group-hover:text-[#4F7EFF] transition-colors">
              자세히 보기
              <ArrowRight size={18} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

        </div>
      </Link>
    </div>
  );
}
