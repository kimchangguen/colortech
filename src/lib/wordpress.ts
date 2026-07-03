export interface WP_Post {
  id: number;
  date: string;
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
  };
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

export async function getPostBySlug(slug: string): Promise<WP_Post | null> {
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
}

export async function getAdjacentPosts(date: string) {
  try {
    // Get previous post (older than current)
    const prevRes = await fetch(`${WP_API}/posts?before=${date}&per_page=1&order=desc`, {
      next: { revalidate: 300 }
    });
    
    // Get next post (newer than current)
    const nextRes = await fetch(`${WP_API}/posts?after=${date}&per_page=1&order=asc`, {
      next: { revalidate: 300 }
    });

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

export async function getPostsByCategoryName(categoryName: string, perPage: number = 20): Promise<WP_Post[]> {
  try {
    // 1. Get category ID
    const catRes = await fetch(`${WP_API}/categories?search=${encodeURIComponent(categoryName)}`, {
      next: { revalidate: 300 }
    });
    const categories = await catRes.json();
    
    if (!categories || categories.length === 0) {
      console.warn(`Category "${categoryName}" not found.`);
      return [];
    }
    
    // Find exact match or use the first result
    const category = categories.find((c: any) => c.name === categoryName) || categories[0];
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
