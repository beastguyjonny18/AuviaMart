'use client';

import { motion } from 'framer-motion';
import { Plus, Search, Filter, MoreVertical, Edit2, Trash2, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

import { products as allProducts } from '@/lib/products';

const products = allProducts.map(p => ({
  ...p,
  stock: Math.floor(Math.random() * 100),
  status: 'Active'
}));

export default function DashboardProducts() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-serif mb-2">Products</h1>
          <p className="text-gray-500">Manage your product catalog and inventory.</p>
        </div>
        <button className="bg-brand-teal text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-brand-navy transition-all shadow-lg shadow-brand-teal/20">
          <Plus size={20} />
          Add Product
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search products by name, brand, or SKU..."
            className="w-full bg-white dark:bg-white border rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-brand-teal transition-all"
          />
        </div>
        <button className="px-6 py-3 bg-white dark:bg-white border rounded-xl flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-100 transition-all">
          <Filter size={20} className="text-gray-400" />
          <span>Filters</span>
        </button>
      </div>

      {/* Products Table */}
      <div className="bg-white dark:bg-surface-card-dark rounded-3xl border shadow-sm overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-xs font-bold uppercase tracking-widest text-gray-400 border-b dark:border-white/10">
              <th className="p-6">Product</th>
              <th className="p-6">Price</th>
              <th className="p-6">Stock</th>
              <th className="p-6">Status</th>
              <th className="p-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y dark:divide-white/10">
            {products.map((product) => (
              <tr key={product.id} className="group hover:bg-gray-50 dark:hover:bg-white/5 transition-all">
                <td className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-50">
                      <Image src={product.image} alt="" fill className="object-cover" />
                    </div>
                    <div>
                      <p className="text-sm font-bold">{product.name}</p>
                      <p className="text-[10px] text-brand-teal uppercase tracking-widest">{product.brand}</p>
                    </div>
                  </div>
                </td>
                <td className="p-6 text-sm font-bold">Rs. {product.price.toFixed(2)}</td>
                <td className="p-6 text-sm">
                  <span className={cn(
                    "font-bold",
                    product.stock < 10 ? "text-red-500" : "text-gray-500"
                  )}>
                    {product.stock} in stock
                  </span>
                </td>
                <td className="p-6">
                  <span className={cn(
                    "px-3 py-1 rounded-full text-[10px] font-bold",
                    product.status === 'Active' ? "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-500" : "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-500"
                  )}>
                    {product.status}
                  </span>
                </td>
                <td className="p-6 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-2 text-gray-400 hover:text-brand-teal hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-all">
                      <Eye size={18} />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-all">
                      <Edit2 size={18} />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-all">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
