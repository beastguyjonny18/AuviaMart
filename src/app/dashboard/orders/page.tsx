'use client';

import { Search, Filter, MoreVertical, Eye, Download, Loader2, CheckCircle2, Clock, Package } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { getOrdersAction, updateOrderStatusAction } from '@/lib/actions';

export default function DashboardOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchOrders = async () => {
    setLoading(true);
    const data = await getOrdersAction();
    setOrders(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    const result = await updateOrderStatusAction(orderId, newStatus);
    if (result.success) {
      fetchOrders();
    } else {
      alert("Error updating status: " + result.error);
    }
  };

  const filteredOrders = orders.filter(o => 
    o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (o.userEmail && o.userEmail.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-700';
      case 'Processing': return 'bg-blue-100 text-blue-700';
      case 'Pending': return 'bg-amber-100 text-amber-700';
      case 'Cancelled': return 'bg-red-100 text-red-700';
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

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by order ID or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white dark:bg-white border rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-brand-teal transition-all"
          />
        </div>
      </div>

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
                    <p className="text-[10px] text-gray-400">{Array.isArray(order.items) ? order.items.length : 0} items</p>
                  </td>
                  <td className="p-6">
                    <p className="text-sm font-bold">{order.userEmail || 'Guest'}</p>
                    <p className="text-[10px] text-gray-400">{order.userId || 'No ID'}</p>
                  </td>
                  <td className="p-6">
                    <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</p>
                  </td>
                  <td className="p-6">
                    <p className="text-sm font-bold">Rs. {order.totalPrice?.toLocaleString() || '0'}</p>
                  </td>
                  <td className="p-6">
                    <select 
                      value={order.status}
                      onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                      className={cn(
                        "px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase outline-none border-none cursor-pointer appearance-none text-center",
                        getStatusColor(order.status)
                      )}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
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
