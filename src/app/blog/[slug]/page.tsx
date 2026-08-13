import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPostBySlug, getAdjacentPosts } from '@/lib/wordpress';
import BlogContent from '@/components/blog/BlogContent';
import BlogImage from '@/components/blog/BlogImage';
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
  const categoryName = post._embedded?.['wp:term']?.[0]?.[0]?.name || null;
  const authorName = post._embedded?.author?.[0]?.name || null;
  const authorAvatar = post._embedded?.author?.[0]?.avatar_urls?.['48'] || null;

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
      <div className="max-w-[880px] mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-10 text-center">
          {categoryName && (
            <span className="inline-block mb-4 px-3 py-1 rounded-full bg-[#FAF6EC] text-[#B5720A] text-[13px] font-semibold tracking-wide">
              {categoryName}
            </span>
          )}
          <h1
            className="text-[26px] md:text-[38px] font-bold text-[#111111] mb-5 leading-[1.35] tracking-tight"
            dangerouslySetInnerHTML={{ __html: title }}
          />
          <div className="flex items-center justify-center gap-3 text-[14px] text-[#555555] mb-10">
            <span>{publishDate}</span>
            {authorName && (
              <>
                <span className="text-[#DDDDDD]">·</span>
                <span>{authorName}</span>
              </>
            )}
          </div>
          {featuredImage && (
            <div className="w-full">
              <BlogImage
                src={featuredImage}
                alt={title}
                width={1200}
                height={675}
                className="w-full h-auto rounded-[8px]"
                sizes="(max-width: 900px) 100vw, 880px"
                priority
              />
            </div>
          )}
        </header>

        <BlogContent content={post.content.rendered} />

        {authorName && (
          <div className="flex items-center gap-3 mt-14 pt-6 border-t border-[#EEEEEE]">
            {authorAvatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={authorAvatar}
                alt={authorName}
                width={40}
                height={40}
                className="w-10 h-10 rounded-full"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-[#FAF6EC] text-[#B5720A] flex items-center justify-center font-semibold">
                {authorName.charAt(0)}
              </div>
            )}
            <div>
              <p className="text-[14px] font-semibold text-[#111111]">{authorName}</p>
              <p className="text-[13px] text-[#888888]">칼라테크OA</p>
            </div>
          </div>
        )}

        <BlogPagination prevPost={prev} nextPost={next} />
      </div>
    </article>
  );
}
