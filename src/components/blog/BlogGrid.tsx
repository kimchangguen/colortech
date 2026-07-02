import React from 'react';
import { WP_Post } from '@/lib/wordpress';
import BlogCard from './BlogCard';

interface BlogGridProps {
  posts: WP_Post[];
}

export default function BlogGrid({ posts }: BlogGridProps) {
  if (!posts || posts.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-lg text-[#555555]">등록된 게시글이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
}
