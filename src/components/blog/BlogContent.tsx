import React from 'react';

interface BlogContentProps {
  content: string;
}

export default function BlogContent({ content }: BlogContentProps) {
  return (
    <div 
      className="prose prose-lg max-w-none text-[#111111] prose-headings:font-bold prose-headings:text-[#111111] prose-a:text-blue-600 hover:prose-a:text-blue-800 prose-img:rounded-xl"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
