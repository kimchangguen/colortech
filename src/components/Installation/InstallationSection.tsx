import React from 'react';
import { getPostsByCategoryName } from '@/lib/wordpress';
import InstallationGrid from './InstallationGrid';

export default async function InstallationSection() {
  // Fetch posts from WordPress with '설치사례' category
  const posts = await getPostsByCategoryName('설치사례', 20);

  if (!posts || posts.length === 0) {
    return null; // Do not render section if there are no posts
  }

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[#0056D2] font-semibold tracking-wider uppercase text-sm mb-4 block">
            Installation Case
          </span>
          <h2 className="text-[32px] md:text-[44px] font-bold text-[#111111] leading-[1.3] mb-6">
            칼라테크OA 설치사례
          </h2>
          <p className="text-[16px] md:text-[18px] text-[#555555] leading-relaxed whitespace-pre-line">
            {'실제 기업, 병원, 학교, 공장 등 다양한 현장의\n설치 사례를 확인해보세요.'}
          </p>
        </div>

        {/* Posts Grid */}
        <InstallationGrid posts={posts} />

      </div>
    </section>
  );
}
