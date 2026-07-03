import { Metadata } from 'next';
import Header from '@/components/Header';
import BlogHero from '@/components/blog/BlogHero';
import BlogFilter from '@/components/blog/BlogFilter';
import FeaturedPost from '@/components/blog/FeaturedPost';
import BlogList from '@/components/blog/BlogList';
import Pagination from '@/components/blog/Pagination';
import { getPostsAdvanced, getCategoryByName } from '@/lib/wordpress';

export const revalidate = 300; // ISR every 5 minutes

export const metadata: Metadata = {
  title: '칼라테크OA 블로그',
  description: '복합기 렌탈, 프린터 렌탈, 설치사례, 유지보수, 업무노하우를 제공하는 칼라테크OA 공식 블로그입니다.',
};

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
