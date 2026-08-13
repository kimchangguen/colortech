import React from 'react';

interface BlogContentProps {
  content: string;
}

export default function BlogContent({ content }: BlogContentProps) {
  return (
    <div
      className="blog-article"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
