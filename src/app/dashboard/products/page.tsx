'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Filter, Edit2, Trash2, Eye, X, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { getProductsAction, addProductAction, updateProductAction, deleteProductAction } from '@/lib/actions';

export default function DashboardProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    const data = await getProductsAction();
    setProducts(data);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const productData = {
      name: formData.get('name'),
      brand: formData.get('brand'),
      price: Number(formData.get('price')),
      category: formData.get('category'),
      image: formData.get('image'),
      stock: Number(formData.get('stock')),
      description: formData.get('description'),
      status: formData.get('status'),
    };

    let result;
    if (editingProduct) {
      result = await updateProductAction(editingProduct.id, productData);
    } else {
      result = await addProductAction(productData);
    }

    if (result.success) {
      setIsModalOpen(false);
      setEditingProduct(null);
      fetchProducts();
    } else {
      alert('Error: ' + result.error);
    }
    setSubmitting(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      const result = await deleteProductAction(id);
      if (result.success) {
        fetchProducts();
      } else {
        alert('Error: ' + result.error);
      }
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-serif mb-2">Products</h1>
          <p className="text-gray-500">Manage your product catalog and inventory.</p>
        </div>
        <button 
          onClick={() => {
            setEditingProduct(null);
            setIsModalOpen(true);
          }}
          className="bg-brand-teal text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-brand-navy transition-all shadow-lg shadow-brand-teal/20"
        >
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
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white dark:bg-white border rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-brand-teal transition-all"
          />
        </div>
        <button className="px-6 py-3 bg-white dark:bg-white border rounded-xl flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-100 transition-all">
          <Filter size={20} className="text-gray-400" />
          <span>Filters</span>
        </button>
      </div>

      {/* Products Table */}
      <div className="bg-white dark:bg-surface-card-dark rounded-3xl border shadow-sm overflow-x-auto min-h-[400px]">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="animate-spin text-brand-teal" size={40} />
            <p className="text-gray-500 font-medium">Loading products...</p>
          </div>
        ) : (
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
              {filteredProducts.map((product) => (
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
                  <td className="p-6 text-sm font-bold">Rs. {Number(product.price).toFixed(2)}</td>
                  <td className="p-6 text-sm">
                    <span className={cn(
                      "font-bold",
                      Number(product.stock) < 10 ? "text-red-500" : "text-gray-500"
                    )}>
                      {product.stock} in stock
                    </span>
                  </td>
                  <td className="p-6">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-[10px] font-bold",
                      product.status === 'Active' ? "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-500" : "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-500"
                    )}>
                      {product.status || 'Active'}
                    </span>
                  </td>
                  <td className="p-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => {
                          setEditingProduct(product);
                          setIsModalOpen(true);
                        }}
                        className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-all"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(product.id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-all"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-20 text-center text-gray-500">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white dark:bg-surface-card-dark rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b flex justify-between items-center">
                <h2 className="text-xl font-bold">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-full transition-all">
                  <X size={24} />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold">Product Name</label>
                    <input name="name" defaultValue={editingProduct?.name} required className="w-full bg-gray-50 dark:bg-white/5 border rounded-xl py-2 px-4 outline-none focus:ring-2 focus:ring-brand-teal" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold">Brand</label>
                    <input name="brand" defaultValue={editingProduct?.brand} required className="w-full bg-gray-50 dark:bg-white/5 border rounded-xl py-2 px-4 outline-none focus:ring-2 focus:ring-brand-teal" />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold">Price (Rs.)</label>
                    <input name="price" type="number" defaultValue={editingProduct?.price} required className="w-full bg-gray-50 dark:bg-white/5 border rounded-xl py-2 px-4 outline-none focus:ring-2 focus:ring-brand-teal" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold">Stock</label>
                    <input name="stock" type="number" defaultValue={editingProduct?.stock} required className="w-full bg-gray-50 dark:bg-white/5 border rounded-xl py-2 px-4 outline-none focus:ring-2 focus:ring-brand-teal" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold">Status</label>
                    <select name="status" defaultValue={editingProduct?.status || 'Active'} className="w-full bg-gray-50 dark:bg-white/5 border rounded-xl py-2 px-4 outline-none focus:ring-2 focus:ring-brand-teal">
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold">Category</label>
                  <input name="category" defaultValue={editingProduct?.category} required className="w-full bg-gray-50 dark:bg-white/5 border rounded-xl py-2 px-4 outline-none focus:ring-2 focus:ring-brand-teal" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold">Image URL</label>
                  <input name="image" defaultValue={editingProduct?.image} required className="w-full bg-gray-50 dark:bg-white/5 border rounded-xl py-2 px-4 outline-none focus:ring-2 focus:ring-brand-teal" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold">Description</label>
                  <textarea name="description" defaultValue={editingProduct?.description} rows={3} required className="w-full bg-gray-50 dark:bg-white/5 border rounded-xl py-2 px-4 outline-none focus:ring-2 focus:ring-brand-teal" />
                </div>

                <div className="pt-4 flex gap-4">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3 border rounded-xl font-bold hover:bg-gray-50 transition-all">
                    Cancel
                  </button>
                  <button type="submit" disabled={submitting} className="flex-1 py-3 bg-brand-teal text-white rounded-xl font-bold hover:bg-brand-navy transition-all flex items-center justify-center gap-2">
                    {submitting && <Loader2 className="animate-spin" size={20} />}
                    {editingProduct ? 'Update Product' : 'Add Product'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
