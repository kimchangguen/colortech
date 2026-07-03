import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { WP_Post } from '@/lib/wordpress';

interface BlogListProps {
  posts: WP_Post[];
}

const MOCK_POSTS = [
  {
    id: 'mock-1',
    title: '기업 환경에 최적화된 복합기 렌탈 솔루션 도입 사례',
    category: '설치사례',
    date: '2026.07.03',
    slug: 'mock-1',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80', // Office
  },
  {
    id: 'mock-2',
    title: '사무실 프린터 고장 시 대처 방법 및 자가 점검 가이드',
    category: '유지보수',
    date: '2026.07.01',
    slug: 'mock-2',
    image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=800&q=80', // Printer
  },
  {
    id: 'mock-3',
    title: '효율적인 업무 환경 구축을 위한 컬러 레이저 프린터 추천',
    category: '복합기 추천',
    date: '2026.06.28',
    slug: 'mock-3',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80', // Workspace
  },
  {
    id: 'mock-4',
    title: '전문 엔지니어의 정기 점검이 중요한 이유',
    category: '업무노하우',
    date: '2026.06.25',
    slug: 'mock-4',
    image: 'https://images.unsplash.com/photo-1581092921461-7031e4bfb83e?w=800&q=80', // Engineer
  },
  {
    id: 'mock-5',
    title: '렌탈 비용 절감의 핵심, 복합기 맞춤형 요금제 안내',
    category: '비용안내',
    date: '2026.06.20',
    slug: 'mock-5',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80', // Finance/Cost
  },
  {
    id: 'mock-6',
    title: '대형 병원 문서 출력 시스템 구축 현장 스케치',
    category: '설치사례',
    date: '2026.06.15',
    slug: 'mock-6',
    image: 'https://images.unsplash.com/photo-1538688423619-a81d3f23454b?w=800&q=80', // Installation
  }
];

export default function BlogList({ posts }: BlogListProps) {
  const decodeHtml = (html: string) => {
    return html.replace(/&#8211;/g, '-').replace(/&#8217;/g, "'").replace(/&amp;/g, '&');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
  };

  const hasRealPosts = posts && posts.length > 0;
  const displayPosts = hasRealPosts ? posts : MOCK_POSTS;

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mb-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-9 gap-y-16">
        {displayPosts.map((post: any) => {
          let imageUrl = post.image || '/images/placeholder.jpg';
          let categoryName = post.category || '블로그';
          let title = post.title;
          let dateStr = post.date;

          // Parse WordPress post data if real
          if (hasRealPosts) {
            title = decodeHtml(post.title.rendered);
            dateStr = formatDate(post.date);

            if (post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'].length > 0) {
              imageUrl = post._embedded['wp:featuredmedia'][0].source_url;
            }

            if (post._embedded && post._embedded['wp:term']) {
              const categories = post._embedded['wp:term'][0];
              if (categories && categories.length > 0) {
                categoryName = categories[0].name;
              }
            }
          }

          return (
            <Link href={`/blog/${post.slug}`} key={post.id} className="block group cursor-pointer bg-transparent">
              <div className="flex flex-col h-full">
                
                {/* Thumbnail Area (Height ~240px, Radius 22px, No border) */}
                <div className="relative w-full h-[240px] rounded-[22px] overflow-hidden bg-gray-100 mb-5">
                  <Image 
                    src={imageUrl} 
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-[350ms] ease-out group-hover:scale-[1.04]"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                
                {/* Text Area (Height ~120px) */}
                <div className="flex flex-col flex-grow min-h-[120px]">
                  <span className="text-[15px] font-[500] text-[#777777] mb-2 block">
                    {categoryName} &middot; {dateStr}
                  </span>
                  <h3 
                    className="text-[24px] font-[800] text-[#111111] leading-[1.35] line-clamp-2 transition-colors duration-[350ms] ease-out group-hover:text-[#006CFF]"
                    dangerouslySetInnerHTML={{ __html: title }}
                  />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
