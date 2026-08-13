'use client';

import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

const FALLBACK_IMAGE = '/images/og-default.jpg';

type BlogImageProps = Omit<ImageProps, 'src'> & { src: string };

export default function BlogImage({ src, alt, ...props }: BlogImageProps) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt}
      unoptimized
      onError={() => setImgSrc(FALLBACK_IMAGE)}
    />
  );
}
