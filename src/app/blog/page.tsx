import { Metadata } from 'next';
import { getPosts } from '@/lib/wordpress';
import BlogGrid from '@/components/blog/BlogGrid';

export const revalidate = 300;

export const metadata: Metadata = {
  title: '블로그 | 칼라테크OA',
  description: '칼라테크OA의 최신 소식과 사무기기 관련 유용한 정보를 확인하세요.',
};

export default async function BlogPage() {
  const posts = await getPosts(12);

  return (
    <div className="pt-32 pb-20 bg-white min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#111111] mb-4 tracking-tight">블로그</h1>
          <p className="text-[#555555] text-lg">칼라테크OA의 최신 소식과 유용한 정보를 전해드립니다.</p>
        </div>
        
        <BlogGrid posts={posts} />
      </div>
    </div>
  );
}
