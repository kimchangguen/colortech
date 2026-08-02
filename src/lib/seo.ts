import type { Metadata } from 'next';

export const SITE_URL = 'https://www.colortekoa-lite.com';
export const SITE_NAME = '칼라테크OA';
export const DEFAULT_OG_IMAGE = '/images/og-default.jpg';

const DEFAULT_IMAGE = {
  url: DEFAULT_OG_IMAGE,
  width: 1200,
  height: 630,
  alt: '칼라테크OA 복합기·프린터 렌탈 전문기업',
};

export function absoluteUrl(path = '/') {
  return new URL(path, SITE_URL).toString();
}

export function cleanText(value: string) {
  return value
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;|&#160;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&#8211;|&ndash;/g, '–')
    .replace(/&#8217;|&rsquo;/g, '’')
    .replace(/&#8220;|&ldquo;/g, '“')
    .replace(/&#8221;|&rdquo;/g, '”')
    .replace(/&hellip;/g, '…')
    .replace(/\s+/g, ' ')
    .trim();
}

export function limitText(value: string, maxLength: number) {
  const text = cleanText(value);
  return text.length > maxLength ? `${text.slice(0, maxLength - 1).trim()}…` : text;
}

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
  type?: 'website' | 'article';
  image?: string;
  imageAlt?: string;
  publishedTime?: string;
  modifiedTime?: string;
};

export function createPageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
  type = 'website',
  image = DEFAULT_OG_IMAGE,
  imageAlt = DEFAULT_IMAGE.alt,
  publishedTime,
  modifiedTime,
}: PageMetadataOptions): Metadata {
  const safeTitle = limitText(title, absoluteTitle ? 60 : 45);
  const fullTitle = absoluteTitle ? safeTitle : `${safeTitle} | ${SITE_NAME}`;
  const safeDescription = limitText(description, 160);
  const url = absoluteUrl(path);
  const images = [{ ...DEFAULT_IMAGE, url: image, alt: imageAlt }];
  const openGraph: Metadata['openGraph'] = type === 'article'
    ? {
        type: 'article',
        title: fullTitle,
        description: safeDescription,
        url,
        siteName: SITE_NAME,
        locale: 'ko_KR',
        images,
        publishedTime,
        modifiedTime,
      }
    : {
        type: 'website',
        title: fullTitle,
        description: safeDescription,
        url,
        siteName: SITE_NAME,
        locale: 'ko_KR',
        images,
      };

  return {
    title: absoluteTitle ? { absolute: safeTitle } : safeTitle,
    description: safeDescription,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph,
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: safeDescription,
      images: [image],
    },
  };
}
