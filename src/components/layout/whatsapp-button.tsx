'use client';

import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

export function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Hide when keyboard is open (simple viewport height check)
    const handleResize = () => {
      if (window.visualViewport) {
        setIsVisible(window.visualViewport.height > 500);
      }
    };
    
    window.visualViewport?.addEventListener('resize', handleResize);
    return () => window.visualViewport?.removeEventListener('resize', handleResize);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-24 lg:bottom-8 right-4 lg:right-8 z-40">
      <div className="relative">
        {/* Pulsing Ring */}
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [1, 0, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut",
          }}
          className="absolute inset-0 bg-[#25d366] rounded-full"
        />
        
        <motion.a
          href="https://wa.me/923216817897"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="relative w-14 h-14 bg-[#25d366] rounded-full flex items-center justify-center text-white shadow-lg group"
        >
          <MessageCircle size={32} />
          
          {/* Tooltip */}
          <span className="absolute right-full mr-4 bg-white dark:bg-surface-card-dark text-foreground px-4 py-2 rounded-lg text-sm font-medium shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden lg:block">
            Chat with us on WhatsApp
          </span>
        </motion.a>
      </div>
    </div>
  );
}
