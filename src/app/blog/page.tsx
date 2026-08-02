import { Metadata } from 'next';
import Header from '@/components/Header';
import BlogHero from '@/components/blog/BlogHero';
import BlogFilter from '@/components/blog/BlogFilter';
import FeaturedPost from '@/components/blog/FeaturedPost';
import BlogList from '@/components/blog/BlogList';
import Pagination from '@/components/blog/Pagination';
import JsonLd from '@/components/JsonLd';
import { getPostsAdvanced, getCategoryByName } from '@/lib/wordpress';
import { createPageMetadata, SITE_URL } from '@/lib/seo';
import { breadcrumbSchema } from '@/lib/structuredData';

export const revalidate = 300; // ISR every 5 minutes

const blogMetadata: Metadata = createPageMetadata({
  title: '기업용 복합기·프린터 렌탈 설치 정보 블로그',
  description: '복합기와 프린터 렌탈 비용, 제품 선택법, 기업별 설치사례, 소모품 관리와 유지보수 노하우를 실무 중심으로 소개하고 장비 운영에 필요한 정보를 제공하는 칼라테크OA 블로그입니다.',
  path: '/blog',
});

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}): Promise<Metadata> {
  const params = await searchParams;
  const isFilteredView = Boolean(params.q || params.category || params.page);

  return isFilteredView
    ? { ...blogMetadata, robots: { index: false, follow: false } }
    : blogMetadata;
}

export default async function BlogPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const currentPage = parseInt((searchParams?.page as string) || '1', 10);
  const categoryStr = (searchParams?.category as string) || '';
  const searchStr = (searchParams?.q as string) || '';

  // Resolve Category ID
  const categoryId = categoryStr ? await getCategoryByName(categoryStr) : undefined;

  // 1. Fetch Featured Post (Top 1) for the current filter
  const featuredRes = await getPostsAdvanced({
    page: 1,
    per_page: 1,
    categories: categoryId || undefined,
    search: searchStr || undefined,
  });
  
  const featuredPost = featuredRes.posts.length > 0 ? featuredRes.posts[0] : null;

  // 2. Fetch List Posts (9 per page), excluding the featured post
  const listRes = await getPostsAdvanced({
    page: currentPage,
    per_page: 9,
    categories: categoryId || undefined,
    search: searchStr || undefined,
    exclude: featuredPost ? [featuredPost.id] : undefined,
  });

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <JsonLd data={[
        breadcrumbSchema([
          { name: '홈', path: '/' },
          { name: '블로그', path: '/blog' },
        ]),
        {
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          '@id': `${SITE_URL}/blog#collection`,
          url: `${SITE_URL}/blog`,
          name: '칼라테크OA 블로그',
          description: blogMetadata.description,
          inLanguage: 'ko-KR',
        },
      ]} />
      <Header />
      
      <main className="flex-grow w-full">
        {/* Hero Section */}
        <BlogHero />
        
        {/* Category Menu & Search Bar */}
        <BlogFilter />
        
        {/* Featured Post (Only show on page 1) */}
        {currentPage === 1 && featuredPost && (
          <FeaturedPost post={featuredPost} />
        )}
        
        {/* Blog Grid List */}
        <BlogList posts={listRes.posts} />
        
        {/* Pagination */}
        <Pagination totalPages={listRes.totalPages} />
      </main>
    </div>
  );
}
