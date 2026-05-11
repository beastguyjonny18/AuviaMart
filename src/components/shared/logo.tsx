'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export function Logo({ shrink = false }: { shrink?: boolean }) {
  return (
    <Link href="/" className="flex items-center group">
      <motion.div
        animate={{ 
          height: shrink ? 60 : 90,
          width: shrink ? 100 : 150 
        }}
        className="relative overflow-hidden rounded-2xl bg-brand-navy flex-shrink-0 flex items-center justify-center p-1 shadow-lg shadow-brand-navy/20 group-hover:shadow-brand-navy/30 transition-shadow"
      >
        <Image
          src="/logo.png"
          alt="AuviaMart Logo"
          fill
          className="object-contain"
          priority
        />
      </motion.div>
    </Link>
  );
}
