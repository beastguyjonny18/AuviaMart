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
          height: shrink ? 50 : 70,
          width: shrink ? 50 : 70 
        }}
        className="relative overflow-hidden rounded-2xl bg-brand-navy flex-shrink-0 flex items-center justify-center p-2 shadow-lg shadow-brand-navy/20 group-hover:shadow-brand-navy/30 transition-shadow"
      >
        <Image
          src="/logo.png"
          alt="AuviaMart Logo"
          fill
          className="object-contain p-2"
          priority
        />
      </motion.div>
      <span className={cn(
        "font-serif font-bold tracking-tight transition-all duration-300 ml-3",
        shrink ? "text-lg opacity-0 -ml-4" : "text-2xl text-white"
      )}>
        AuviaMart
      </span>
    </Link>
  );
}
