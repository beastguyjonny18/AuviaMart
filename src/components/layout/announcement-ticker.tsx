'use client';

import { motion } from 'framer-motion';

const messages = [
  "Free delivery across Pakistan on orders over Rs. 150",
  "Exclusive brands you won't find anywhere else",
  "New arrivals every week"
];

export function AnnouncementTicker() {
  return (
    <div className="bg-brand-teal text-white py-2 overflow-hidden whitespace-nowrap">
      <motion.div
        animate={{ x: [0, -1000] }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: "linear",
        }}
        className="inline-block"
      >
        <span className="mx-8 text-sm font-medium uppercase tracking-widest">
          {messages.join(' · ')}
        </span>
        <span className="mx-8 text-sm font-medium uppercase tracking-widest">
          {messages.join(' · ')}
        </span>
      </motion.div>
    </div>
  );
}
