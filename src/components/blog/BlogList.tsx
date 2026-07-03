import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { WP_Post } from '@/lib/wordpress';

interface BlogListProps {
  posts: WP_Post[];
}

export default function BlogList({ posts }: BlogListProps) {
  const decodeHtml = (html: string) => {
    return html.replace(/&#8211;/g, '-').replace(/&#8217;/g, "'").replace(/&amp;/g, '&');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
  };

  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-32 text-[#888888] text-[16px]">
        해당하는 게시글이 없습니다.
      </div>
    );
  }

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mb-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
        {posts.map((post) => {
          let imageUrl = '/images/placeholder.jpg';
          if (post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'].length > 0) {
            imageUrl = post._embedded['wp:featuredmedia'][0].source_url;
          }

          let categoryName = '블로그';
          if (post._embedded && post._embedded['wp:term']) {
            const categories = post._embedded['wp:term'][0];
            if (categories && categories.length > 0) {
              categoryName = categories[0].name;
            }
          }

          return (
            <Link href={`/blog/${post.slug}`} key={post.id} className="block group">
              <div className="bg-white rounded-[20px] overflow-hidden border border-[#EEEEEE] flex flex-col h-full transition-all duration-[350ms] ease-out hover:-translate-y-[6px] hover:shadow-[0_18px_40px_rgba(0,0,0,0.08)]">
                
                {/* Thumbnail Area (16:9) */}
                <div className="relative w-full aspect-video overflow-hidden bg-gray-100">
                  <Image 
                    src={imageUrl} 
                    alt={decodeHtml(post.title.rendered)}
                    fill
                    className="object-cover transition-transform duration-[500ms] ease-out group-hover:scale-[1.05]"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                
                {/* Text Area */}
                <div className="p-6 md:p-8 flex flex-col flex-grow bg-white">
                  <span className="text-[13px] font-medium text-[#4F7EFF] mb-2 block">
                    {categoryName}
                  </span>
                  <h3 
                    className="text-[19px] font-[700] text-[#111111] leading-[1.4] mb-3 line-clamp-2 group-hover:text-[#4F7EFF] transition-colors"
                    dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                  />
                  <div 
                    className="text-[15px] text-[#666666] leading-[1.7] line-clamp-3 mb-6"
                    dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                  />
                  <div className="mt-auto border-t border-[#F0F0F0] pt-4">
                    <span className="text-[14px] text-[#999999]">
                      {formatDate(post.date)}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
