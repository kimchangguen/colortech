import { cache } from 'react';

export interface WP_Post {
  id: number;
  date: string;
  modified?: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  author: number;
  featured_media: number;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text: string;
    }>;
    'wp:term'?: Array<Array<{
      id: number;
      name: string;
      slug: string;
    }>>;
    author?: Array<{
      name: string;
      avatar_urls?: {
        [size: string]: string;
      };
    }>;
  };
}

interface WP_Category {
  id: number;
  name: string;
}

const WP_API = process.env.NEXT_PUBLIC_WORDPRESS_API || 'https://wordpress-1580849-6527382.cloudwaysapps.com/wp-json/wp/v2';

export async function getPosts(perPage: number = 12): Promise<WP_Post[]> {
  try {
    const res = await fetch(`${WP_API}/posts?_embed&per_page=${perPage}`, {
      next: { revalidate: 300 }
    });
    if (!res.ok) throw new Error('Failed to fetch posts');
    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

// Wrapped in React's cache() so that generateMetadata() and the page
// component both resolving the same slug within one request/render pass
// share a single WordPress request instead of firing it twice.
export const getPostBySlug = cache(async (slug: string): Promise<WP_Post | null> => {
  try {
    const res = await fetch(`${WP_API}/posts?slug=${slug}&_embed`, {
      next: { revalidate: 300 }
    });
    if (!res.ok) throw new Error('Failed to fetch post');
    const posts: WP_Post[] = await res.json();
    return posts.length > 0 ? posts[0] : null;
  } catch (error) {
    console.error(error);
    return null;
  }
});

// Only slug/title are rendered by BlogPagination, so the response is
// trimmed with _fields to cut payload from the (slow) WordPress origin.
export async function getAdjacentPosts(date: string) {
  try {
    // Previous (older) and next (newer) posts are independent lookups —
    // fire both requests together instead of awaiting one before the other.
    const [prevRes, nextRes] = await Promise.all([
      fetch(`${WP_API}/posts?before=${date}&per_page=1&order=desc&_fields=slug,title`, {
        next: { revalidate: 300 }
      }),
      fetch(`${WP_API}/posts?after=${date}&per_page=1&order=asc&_fields=slug,title`, {
        next: { revalidate: 300 }
      }),
    ]);

    const prevPosts = prevRes.ok ? await prevRes.json() : [];
    const nextPosts = nextRes.ok ? await nextRes.json() : [];

    return {
      prev: prevPosts.length > 0 ? prevPosts[0] : null,
      next: nextPosts.length > 0 ? nextPosts[0] : null,
    };
  } catch (error) {
    console.error(error);
    return { prev: null, next: null };
  }
}

// Minimal-payload slug list for generateStaticParams — pre-renders posts
// at build time so first-ever visits skip the slow WordPress round trip.
export async function getRecentPostSlugs(limit: number = 100): Promise<string[]> {
  try {
    const res = await fetch(`${WP_API}/posts?per_page=${limit}&_fields=slug`, {
      next: { revalidate: 300 }
    });
    if (!res.ok) throw new Error('Failed to fetch post slugs');
    const posts: Array<{ slug: string }> = await res.json();
    return posts.map((post) => post.slug);
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getPostsByCategoryName(categoryName: string, perPage: number = 20): Promise<WP_Post[]> {
  try {
    // 1. Get category ID
    const catRes = await fetch(`${WP_API}/categories?search=${encodeURIComponent(categoryName)}`, {
      next: { revalidate: 300 }
    });
    const categories: WP_Category[] = await catRes.json();
    
    if (!categories || categories.length === 0) {
      console.warn(`Category "${categoryName}" not found.`);
      return [];
    }
    
    // Find exact match or use the first result
    const category = categories.find((category) => category.name === categoryName) || categories[0];
    const categoryId = category.id;

    // 2. Get posts by category ID
    const res = await fetch(`${WP_API}/posts?_embed&per_page=${perPage}&categories=${categoryId}`, {
      next: { revalidate: 300 }
    });
    if (!res.ok) throw new Error('Failed to fetch posts');
    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export interface GetPostsOptions {
  page?: number;
  per_page?: number;
  categories?: number;
  search?: string;
  exclude?: number[];
}

export async function getPostsAdvanced(options: GetPostsOptions = {}) {
  const { page = 1, per_page = 9, categories, search, exclude } = options;
  try {
    const params = new URLSearchParams({
      _embed: 'true',
      per_page: per_page.toString(),
      page: page.toString(),
    });

    if (categories) params.append('categories', categories.toString());
    if (search) params.append('search', search);
    if (exclude && exclude.length > 0) params.append('exclude', exclude.join(','));

    const res = await fetch(`${WP_API}/posts?${params.toString()}`, {
      next: { revalidate: 300 }
    });

    if (!res.ok) throw new Error('Failed to fetch posts');
    
    const totalPages = parseInt(res.headers.get('x-wp-totalpages') || '1', 10);
    const totalPosts = parseInt(res.headers.get('x-wp-total') || '0', 10);
    const posts: WP_Post[] = await res.json();

    return { posts, totalPages, totalPosts };
  } catch (error) {
    console.error(error);
    return { posts: [], totalPages: 0, totalPosts: 0 };
  }
}

export async function getCategoryByName(name: string): Promise<number | null> {
  if (name === '전체' || !name) return null;
  try {
    const res = await fetch(`${WP_API}/categories?search=${encodeURIComponent(name)}`, {
      next: { revalidate: 300 }
    });
    const categories: WP_Category[] = await res.json();
    if (!categories || categories.length === 0) return null;
    const exactMatch = categories.find((category) => category.name === name);
    return exactMatch ? exactMatch.id : categories[0].id;
  } catch (error) {
    console.error(error);
    return null;
  }
}
