import { getPosts } from '@/lib/wordpress';
import InstallationGrid from './InstallationGrid';

export default async function InstallationSection() {
  const posts = await getPosts(16);
  if (!posts.length) return null;

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-[#0056D2] font-semibold tracking-wider uppercase text-sm mb-4 block">Installation Case</span>
          <h2 className="text-[32px] md:text-[44px] font-bold text-[#111111] leading-[1.3] mb-6">칼라테크OA 설치사례</h2>
          <p className="text-[16px] md:text-[18px] text-[#555555] leading-relaxed">블로그에서 발행한 다양한 현장의 설치사례를 확인해 보세요.</p>
        </div>
        <InstallationGrid posts={posts} />
      </div>
    </section>
  );
}
