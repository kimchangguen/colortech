'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import type { WP_Post } from '@/lib/wordpress';

const containerVariants: Variants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.06 } } };
const itemVariants: Variants = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } } };

function decodeHtml(html: string) {
  return html.replace(/&#8211;/g, '-').replace(/&#8217;/g, "'").replace(/&amp;/g, '&').replace(/<[^>]*>/g, '');
}

function formatDate(dateString: string) {
  return new Intl.DateTimeFormat('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(dateString));
}

export default function InstallationGrid({ posts }: { posts: WP_Post[] }) {
  return (
    <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8 justify-items-center" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
      {posts.slice(0, 16).map((post) => {
        const media = post._embedded?.['wp:featuredmedia']?.[0];
        const imageUrl = media?.source_url || '/images/slide_01.png';
        const title = decodeHtml(post.title.rendered);

        return (
          <Link href={`/blog/${post.slug}`} key={post.id} className="block w-full max-w-[270px]" aria-label={`${title} 글 보기`}>
            <motion.article variants={itemVariants} className="group h-[380px] bg-white rounded-[16px] overflow-hidden border border-[#E5E7EB] flex flex-col hover:-translate-y-[6px] hover:shadow-[0_18px_40px_rgba(0,0,0,0.10)] transition-all duration-[350ms] ease-out">
              <div className="relative w-full h-[255px] shrink-0 overflow-hidden bg-gray-100">
                <Image src={imageUrl} alt={media?.alt_text || title} fill className="object-cover transition-transform duration-[350ms] group-hover:scale-[1.05]" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 270px" />
              </div>
              <div className="p-4 flex min-h-0 flex-col flex-grow bg-white">
                <span className="text-[12px] font-semibold text-[#315EFB] mb-1.5">설치사례</span>
                <h3 className="text-[16px] font-bold text-[#111111] leading-[1.45] line-clamp-2">{title}</h3>
                <time dateTime={post.date} className="mt-auto text-[12px] text-[#999999]">{formatDate(post.date)}</time>
              </div>
            </motion.article>
          </Link>
        );
      })}
    </motion.div>
  );
}
