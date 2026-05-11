'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export function Logo({ shrink = false }: { shrink?: boolean }) {
  return (
    <Link href="/" className="flex flex-col items-start">
      <motion.div
        animate={{ height: shrink ? 40 : 60 }}
        className="relative aspect-[2/1]"
      >
        <svg
          viewBox="0 0 140 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-auto"
        >
          {/* Custom M Monogram */}
          <path
            d="M20 50C20 30 35 15 50 15C65 15 70 30 70 30C70 30 75 15 90 15C105 15 120 30 120 50"
            stroke="currentColor"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <text
            x="0"
            y="55"
            className="text-[20px] font-serif"
            fill="currentColor"
          >
            Auvia Mart
          </text>
        </svg>
      </motion.div>
    </Link>
  );
}
