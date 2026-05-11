'use client';

import { motion } from 'framer-motion';
import { Search, Filter, Mail, Phone, Calendar, Loader2, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { getUsersAction } from '@/lib/actions';

export default function DashboardCustomers() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function fetchUsers() {
      const data = await getUsersAction();
      setUsers(data);
      setLoading(false);
    }
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(u => 
    u.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif mb-2">Customers</h1>
        <p className="text-gray-500">View and manage your registered customer base.</p>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by name or email..."
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

      {/* Customers Table */}
      <div className="bg-white dark:bg-surface-card-dark rounded-3xl border shadow-sm overflow-x-auto min-h-[400px]">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="animate-spin text-brand-teal" size={40} />
            <p className="text-gray-500 font-medium">Loading customers...</p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs font-bold uppercase tracking-widest text-gray-400 border-b dark:border-white/10">
                <th className="p-6">Customer</th>
                <th className="p-6">Contact</th>
                <th className="p-6">Joined Date</th>
                <th className="p-6">Status</th>
                <th className="p-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y dark:divide-white/10">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="group hover:bg-gray-50 dark:hover:bg-white/5 transition-all">
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-brand-teal/10 text-brand-teal flex items-center justify-center font-bold">
                        {user.fullName?.charAt(0) || <User size={20} />}
                      </div>
                      <div>
                        <p className="text-sm font-bold">{user.fullName || 'Anonymous'}</p>
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest">ID: {user.id.substring(0, 8)}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Mail size={12} className="text-brand-teal" />
                        {user.email}
                      </div>
                      {user.phoneNumber && (
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Phone size={12} className="text-brand-teal" />
                          {user.phoneNumber}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar size={14} />
                      {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                    </div>
                  </td>
                  <td className="p-6">
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-500">
                      Active
                    </span>
                  </td>
                  <td className="p-6 text-right">
                    <button className="text-brand-teal hover:underline text-sm font-bold">View Profile</button>
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-20 text-center text-gray-500">
                    No customers found.
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
