'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export function Logo({ shrink = false }: { shrink?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-3 group">
      <motion.div
        animate={{ 
          height: shrink ? 40 : 50,
          width: shrink ? 40 : 50 
        }}
        className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#1a5f7a] to-[#0d3b55] shadow-md flex-shrink-0"
      >
        <Image
          src="/logo.png"
          alt="AuviaMart Logo"
          fill
          className="object-cover"
          priority
        />
      </motion.div>
      {!shrink && (
        <span className="text-xl font-serif font-bold tracking-tight text-brand-teal dark:text-white transition-colors">
          Auvia Mart
        </span>
      )}
    </Link>
  );
}
