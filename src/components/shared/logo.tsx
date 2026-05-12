'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export function Logo({ shrink = false, transparent = true }: { shrink?: boolean, transparent?: boolean }) {
  return (
    <Link href="/" className="flex items-center group">
      <motion.div
        animate={{ 
          height: shrink ? 50 : 70,
          width: shrink ? 100 : 140 
        }}
        className={cn(
          "relative overflow-hidden flex-shrink-0 flex items-center justify-center transition-all duration-500",
          transparent ? "bg-transparent" : "bg-brand-navy rounded-2xl p-1 shadow-lg"
        )}
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
