import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getPostBySlug, getAdjacentPosts } from '@/lib/wordpress';
import BlogContent from '@/components/blog/BlogContent';
import BlogPagination from '@/components/blog/BlogPagination';
import JsonLd from '@/components/JsonLd';
import { absoluteUrl, cleanText, createPageMetadata, limitText, SITE_NAME } from '@/lib/seo';
import { breadcrumbSchema, organizationId } from '@/lib/structuredData';

export const revalidate = 300;

function buildPostDescription(excerptHtml: string) {
  const excerpt = cleanText(excerptHtml);
  const fallback = '복합기·프린터 렌탈과 설치, 유지보수에 필요한 실무 정보와 기업 환경별 장비 선택 기준, 비용 절감 방법 및 신속한 서비스 운영 노하우를 칼라테크OA가 자세히 안내합니다.';
  return limitText(excerpt.length >= 80 ? excerpt : `${excerpt} ${fallback}`, 155);
}

function buildPostSeoTitle(titleHtml: string) {
  const title = limitText(titleHtml, 45);
  return title.length >= 22 ? title : limitText(`${title} - 복합기·프린터 렌탈 정보`, 45);
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  
  if (!post) {
    return {
      title: '게시물을 찾을 수 없습니다',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const description = buildPostDescription(post.excerpt.rendered);
  const title = buildPostSeoTitle(post.title.rendered);
  const imageUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/images/slide_01.png';

  return createPageMetadata({
    title,
    description,
    path: `/blog/${post.slug}`,
    type: 'article',
    image: imageUrl,
    imageAlt: `${title} 대표 이미지`,
    publishedTime: post.date,
    modifiedTime: post.modified || post.date,
  });
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

  const title = cleanText(post.title.rendered);
  const description = buildPostDescription(post.excerpt.rendered);
  const publishDate = new Date(post.date).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;

  return (
    <article className="pt-32 pb-20 bg-white min-h-screen">
      <JsonLd data={[
        {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: limitText(title, 110),
          description,
          image: [featuredImage || absoluteUrl('/images/og-default.jpg')],
          datePublished: post.date,
          dateModified: post.modified || post.date,
          mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
          inLanguage: 'ko-KR',
          author: { '@type': 'Organization', '@id': organizationId, name: SITE_NAME },
          publisher: {
            '@type': 'Organization',
            '@id': organizationId,
            name: SITE_NAME,
            logo: {
              '@type': 'ImageObject',
              url: absoluteUrl('/icon-512.png'),
              width: 512,
              height: 512,
            },
          },
        },
        breadcrumbSchema([
          { name: '홈', path: '/' },
          { name: '블로그', path: '/blog' },
          { name: title, path: `/blog/${post.slug}` },
        ]),
      ]} />
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
