'use client';

import { motion } from 'framer-motion';
import { Plus, Search, Filter, Edit2, Trash2, Eye, FileText, Loader2 } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

export default function BlogDashboard() {
  const [loading, setLoading] = useState(false);

  const posts = [
    { id: 1, title: 'Choosing the Perfect Wall Clock', category: 'DECOR', author: 'Roshaan', status: 'Published', date: '2026-05-10', image: '/products/1778482277813.jpeg' },
    { id: 2, title: 'Staying Cool: Portable Solutions', category: 'LIFESTYLE', author: 'Roshaan', status: 'Published', date: '2026-05-11', image: '/products/1778482277815.jpeg' },
    { id: 3, title: 'Smart Tech for Daily Vitality', category: 'TECHNOLOGY', author: 'Roshaan', status: 'Draft', date: '2026-05-12', image: '/products/1778482293739.jpeg' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-serif mb-2">Blog Posts</h1>
          <p className="text-gray-500">Manage your journal articles and stories.</p>
        </div>
        <button className="bg-brand-teal text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-brand-navy transition-all shadow-lg shadow-brand-teal/20">
          <Plus size={20} />
          New Article
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-[2rem] border overflow-hidden marble-gloss group transition-all hover:shadow-xl">
            <div className="relative aspect-video">
              <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-bold tracking-widest text-brand-teal">
                {post.category}
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-serif italic mb-4 line-clamp-1">{post.title}</h3>
              <div className="flex justify-between items-center text-xs text-gray-500 mb-6">
                <span>By {post.author}</span>
                <span>{new Date(post.date).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between items-center pt-4 border-t">
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${post.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                  {post.status}
                </span>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-brand-teal transition-colors"><Edit2 size={16} /></button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
