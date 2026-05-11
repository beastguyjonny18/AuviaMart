'use client';

import { motion } from 'framer-motion';
import { Save, User, Bell, Shield, CreditCard, Store, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export default function DashboardSettings() {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', label: 'General', icon: Store },
    { id: 'profile', label: 'Admin Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'payments', label: 'Payments', icon: CreditCard },
  ];

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif mb-2">Settings</h1>
          <p className="text-gray-500">Configure your store preferences and account settings.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={loading}
          className="bg-brand-teal text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-brand-navy transition-all shadow-lg shadow-brand-teal/20"
        >
          {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
          Save Changes
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Settings Navigation */}
        <aside className="lg:w-64 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                activeTab === tab.id 
                  ? "bg-brand-teal text-white shadow-lg" 
                  : "text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5"
              )}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </aside>

        {/* Settings Content */}
        <div className="flex-1 space-y-8">
          <div className="bg-white dark:bg-surface-card-dark rounded-3xl border shadow-sm p-8">
            <h3 className="text-xl font-serif mb-8 capitalize">{activeTab} Settings</h3>
            
            <div className="space-y-6 max-w-2xl">
              {activeTab === 'general' && (
                <>
                  <div className="space-y-2">
                    <label className="text-sm font-bold">Store Name</label>
                    <input defaultValue="AuviaMart Pakistan" className="w-full bg-gray-50 dark:bg-white/5 border rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-brand-teal" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold">Support Email</label>
                    <input defaultValue="support@auviamart.pk" className="w-full bg-gray-50 dark:bg-white/5 border rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-brand-teal" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold">Store Currency</label>
                    <select className="w-full bg-gray-50 dark:bg-white/5 border rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-brand-teal">
                      <option>PKR - Pakistani Rupee</option>
                      <option>USD - US Dollar</option>
                    </select>
                  </div>
                </>
              )}
              
              {activeTab === 'profile' && (
                <>
                  <div className="flex items-center gap-6 mb-8">
                    <div className="w-20 h-20 rounded-full bg-brand-teal text-white flex items-center justify-center text-3xl font-bold">R</div>
                    <button className="text-sm font-bold text-brand-teal hover:underline">Change Avatar</button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-bold">Full Name</label>
                      <input defaultValue="Roshaan" className="w-full bg-gray-50 dark:bg-white/5 border rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-brand-teal" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold">Role</label>
                      <input defaultValue="Super Admin" disabled className="w-full bg-gray-100 dark:bg-white/10 border rounded-xl py-3 px-4 outline-none cursor-not-allowed" />
                    </div>
                  </div>
                </>
              )}

              {/* Other tabs can be added as needed */}
              {['notifications', 'security', 'payments'].includes(activeTab) && (
                <div className="py-20 text-center text-gray-500 italic">
                  Advanced {activeTab} settings will be available in the next update.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
