'use client';

import { motion } from 'framer-motion';
import { Search, Filter, ShoppingBag, Clock, CheckCircle2, MoreVertical, Eye, Download, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

const mockOrders = [
  { id: 'ORD-7241', customer: 'Khalid Al-Thani', date: '2026-05-10', status: 'Delivered', amount: 12500, items: 2 },
  { id: 'ORD-7242', customer: 'Sarah Jenkins', date: '2026-05-11', status: 'Processing', amount: 4500, items: 1 },
  { id: 'ORD-7243', customer: 'Ahmed Hassan', date: '2026-05-11', status: 'Pending', amount: 6800, items: 3 },
  { id: 'ORD-7244', customer: 'Fatima Ali', date: '2026-05-09', status: 'Delivered', amount: 18900, items: 1 },
  { id: 'ORD-7245', customer: 'Zubair Khan', date: '2026-05-08', status: 'Cancelled', amount: 3200, items: 1 },
];

export default function DashboardOrders() {
  const [orders, setOrders] = useState(mockOrders);
  const [loading, setLoading] = useState(false); // Set to false since using mock data
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOrders = orders.filter(o => 
    o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.customer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-500';
      case 'Processing': return 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-500';
      case 'Pending': return 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-500';
      case 'Cancelled': return 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-500';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-serif mb-2">Orders</h1>
          <p className="text-gray-500">Manage and track customer purchases.</p>
        </div>
        <button className="bg-brand-teal text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-brand-navy transition-all shadow-lg shadow-brand-teal/20">
          <Download size={20} />
          Export Report
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by order ID or customer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white dark:bg-white border rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-brand-teal transition-all"
          />
        </div>
        <div className="flex gap-4">
          <select className="px-6 py-3 bg-white dark:bg-white border rounded-xl outline-none focus:ring-2 focus:ring-brand-teal transition-all">
            <option>All Status</option>
            <option>Pending</option>
            <option>Processing</option>
            <option>Delivered</option>
            <option>Cancelled</option>
          </select>
          <button className="px-6 py-3 bg-white dark:bg-white border rounded-xl flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-100 transition-all">
            <Filter size={20} className="text-gray-400" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white dark:bg-surface-card-dark rounded-3xl border shadow-sm overflow-x-auto">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="animate-spin text-brand-teal" size={40} />
            <p className="text-gray-500 font-medium">Loading orders...</p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs font-bold uppercase tracking-widest text-gray-400 border-b dark:border-white/10">
                <th className="p-6">Order ID</th>
                <th className="p-6">Customer</th>
                <th className="p-6">Date</th>
                <th className="p-6">Amount</th>
                <th className="p-6">Status</th>
                <th className="p-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y dark:divide-white/10">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="group hover:bg-gray-50 dark:hover:bg-white/5 transition-all">
                  <td className="p-6">
                    <p className="text-sm font-bold text-brand-teal">{order.id}</p>
                    <p className="text-[10px] text-gray-400">{order.items} items</p>
                  </td>
                  <td className="p-6">
                    <p className="text-sm font-bold">{order.customer}</p>
                  </td>
                  <td className="p-6">
                    <p className="text-sm text-gray-500">{new Date(order.date).toLocaleDateString()}</p>
                  </td>
                  <td className="p-6">
                    <p className="text-sm font-bold">Rs. {order.amount.toFixed(2)}</p>
                  </td>
                  <td className="p-6">
                    <span className={cn("px-3 py-1 rounded-full text-[10px] font-bold", getStatusColor(order.status))}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-gray-400 hover:text-brand-teal hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-all">
                        <Eye size={18} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-brand-navy hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-all">
                        <MoreVertical size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-20 text-center text-gray-500">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
