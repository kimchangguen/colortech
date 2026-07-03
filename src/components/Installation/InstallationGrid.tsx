'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, type Variants } from 'framer-motion';
import { WP_Post } from '@/lib/wordpress';

interface InstallationGridProps {
  posts: WP_Post[];
}

export default function InstallationGrid({ posts }: InstallationGridProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" }
    },
  };

  const decodeHtml = (html: string) => {
    return html.replace(/&#8211;/g, '-').replace(/&#8217;/g, "'").replace(/&amp;/g, '&');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
  };

  return (
    <motion.div 
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-10"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {posts.map((post) => {
        // Extract featured image
        let imageUrl = '/images/placeholder.jpg';
        if (post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'].length > 0) {
          imageUrl = post._embedded['wp:featuredmedia'][0].source_url;
        }

        return (
          <Link href={`/blog/${post.slug}`} key={post.id} className="block">
            <motion.div 
              variants={itemVariants}
              className="group bg-white rounded-[20px] overflow-hidden border border-[#EEEEEE] flex flex-col h-full hover:-translate-y-[6px] hover:shadow-[0_18px_40px_rgba(0,0,0,0.08)] transition-all duration-[350ms] ease-out cursor-pointer"
            >
              {/* Thumbnail Area */}
              <div className="relative w-full h-[210px] overflow-hidden bg-gray-100">
                <Image 
                  src={imageUrl} 
                  alt={decodeHtml(post.title.rendered)}
                  fill
                  className="object-cover transition-transform duration-[350ms] ease-out group-hover:scale-[1.05]"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />
              </div>
              
              {/* Text Area */}
              <div className="p-5 flex flex-col flex-grow bg-white">
                <span className="text-[13px] text-[#888888] mb-1.5 block">
                  설치사례
                </span>
                <h3 
                  className="text-[18px] font-[700] text-[#111111] leading-snug mb-3 line-clamp-2"
                  dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                />
                <div className="mt-auto">
                  <span className="text-[14px] text-[#999999]">
                    {formatDate(post.date)}
                  </span>
                </div>
              </div>
            </motion.div>
          </Link>
        );
      })}
    </motion.div>
  );
}
