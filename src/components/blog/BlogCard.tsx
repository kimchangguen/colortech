import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { WP_Post } from '@/lib/wordpress';
import { ArrowRight } from 'lucide-react';

interface BlogCardProps {
  post: WP_Post;
}

export default function BlogCard({ post }: BlogCardProps) {
  // Extract featured image URL if it exists
  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/images/slide_01.png'; // Fallback to a local image
  const publishDate = new Date(post.date).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Decode HTML entities in title and excerpt
  const title = post.title.rendered.replace(/&amp;/g, '&').replace(/&#8211;/g, '-').replace(/&#8217;/g, "'");
  const excerpt = post.excerpt.rendered.replace(/<[^>]+>/g, '').replace(/&hellip;/g, '...').substring(0, 100) + '...';

  return (
    <div className="group bg-white rounded-[24px] border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full">
      <Link href={`/blog/${post.slug}`} className="block relative w-full aspect-[4/3] overflow-hidden">
        <Image
          src={featuredImage}
          alt={post.title.rendered || "Blog Thumbnail"}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </Link>
      
      <div className="p-6 flex flex-col flex-grow">
        <span className="text-sm text-[#555555] mb-3 block">{publishDate}</span>
        
        <Link href={`/blog/${post.slug}`} className="block mb-4">
          <h3 className="text-xl font-bold text-[#111111] line-clamp-2 hover:text-gray-600 transition-colors" dangerouslySetInnerHTML={{ __html: post.title.rendered }}></h3>
        </Link>
        
        <p className="text-[#555555] text-[15px] line-clamp-3 mb-6 flex-grow" dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}></p>
        
        <div className="mt-auto pt-4 border-t border-gray-100">
          <Link href={`/blog/${post.slug}`} className="inline-flex items-center text-[15px] font-medium text-[#111111] group-hover:text-gray-600">
            자세히보기
            <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
