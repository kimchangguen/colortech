import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getPostBySlug, getAdjacentPosts } from '@/lib/wordpress';
import BlogContent from '@/components/blog/BlogContent';
import BlogPagination from '@/components/blog/BlogPagination';

export const revalidate = 300;

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  
  if (!post) {
    return {
      title: '게시글을 찾을 수 없습니다 | 칼라테크OA',
    };
  }

  // Strip HTML tags for description
  const description = post.excerpt.rendered.replace(/<[^>]+>/g, '').substring(0, 160);
  const title = post.title.rendered.replace(/&amp;/g, '&').replace(/&#8211;/g, '-').replace(/&#8217;/g, "'");
  const imageUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/images/slide_01.png';

  return {
    title: `${title} | 칼라테크OA 블로그`,
    description,
    openGraph: {
      title,
      description,
      images: [imageUrl],
      type: 'article',
      publishedTime: post.date,
    },
    alternates: {
      canonical: `/blog/${post.slug}`,
    }
  };
}

export default async function BlogPostPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  
  if (!post) {
    notFound();
  }

  const { prev, next } = await getAdjacentPosts(post.date);

  const title = post.title.rendered.replace(/&amp;/g, '&').replace(/&#8211;/g, '-').replace(/&#8217;/g, "'");
  const publishDate = new Date(post.date).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;

  return (
    <article className="pt-32 pb-20 bg-white min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-10 text-center">
          <span className="text-[#555555] mb-4 block">{publishDate}</span>
          <h1 
            className="text-3xl md:text-5xl font-bold text-[#111111] mb-8 leading-tight tracking-tight"
            dangerouslySetInnerHTML={{ __html: title }}
          />
          {featuredImage && (
            <div className="relative w-full aspect-[16/9] rounded-[24px] overflow-hidden mb-12">
              <Image
                src={featuredImage}
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 1200px) 100vw, 800px"
                priority
              />
            </div>
          )}
        </header>

        <BlogContent content={post.content.rendered} />
        
        <BlogPagination prevPost={prev} nextPost={next} />
      </div>
    </article>
  );
}
