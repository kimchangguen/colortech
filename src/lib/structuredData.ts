import { absoluteUrl, SITE_NAME, SITE_URL } from '@/lib/seo';

export const organizationId = `${SITE_URL}/#organization`;

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': organizationId,
  name: '(주)칼라테크오에이',
  alternateName: SITE_NAME,
  url: SITE_URL,
  telephone: '+82-2-719-1644',
  logo: absoluteUrl('/icon-512.png'),
  address: {
    '@type': 'PostalAddress',
    streetAddress: '당산로 41길 11, SK V1 W동 219호',
    addressLocality: '영등포구',
    addressRegion: '서울특별시',
    addressCountry: 'KR',
  },
};

export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${SITE_URL}/#localbusiness`,
  name: '(주)칼라테크오에이',
  url: SITE_URL,
  image: absoluteUrl('/images/og-default.jpg'),
  telephone: '+82-2-719-1644',
  priceRange: '상담 문의',
  parentOrganization: { '@id': organizationId },
  address: {
    '@type': 'PostalAddress',
    streetAddress: '당산로 41길 11, SK V1 W동 219호',
    addressLocality: '영등포구',
    addressRegion: '서울특별시',
    addressCountry: 'KR',
  },
};

export function breadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
