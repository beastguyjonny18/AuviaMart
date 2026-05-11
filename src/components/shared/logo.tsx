'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export function Logo({ shrink = false }: { shrink?: boolean }) {
  return (
    <Link href="/" className="flex items-center group">
      <motion.div
        animate={{ 
          height: shrink ? 60 : 85,
          width: shrink ? 60 : 85 
        }}
        className="relative overflow-hidden rounded-xl bg-transparent flex-shrink-0"
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
