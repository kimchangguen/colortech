import React from 'react';

const BlogHero = () => {
  return (
    <section className="relative w-full h-[480px] bg-[#111111] overflow-hidden flex items-center mt-[80px]">
      {/* Background large typography */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 select-none pointer-events-none opacity-5 pr-4 md:pr-12">
        <h1 className="text-[120px] md:text-[200px] lg:text-[280px] font-black text-white leading-none tracking-tighter">
          BLOG
        </h1>
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-[800px]">
          <span className="block text-[#4F7EFF] text-[14px] font-semibold tracking-[2px] uppercase mb-4">
            INSIGHTS
          </span>
          <h2 className="text-[40px] md:text-[56px] font-[800] text-white leading-[1.2] mb-6">
            칼라테크OA 블로그
          </h2>
          <p className="text-[16px] md:text-[18px] text-[#A0A0A0] leading-[1.8] font-light">
            복합기·프린터 렌탈부터 <br className="md:hidden" />
            설치사례, 유지관리, 업무 노하우까지<br />
            현장에서 검증된 정보를 제공합니다.
          </p>
        </div>
      </div>
    </section>
  );
};

export default BlogHero;
