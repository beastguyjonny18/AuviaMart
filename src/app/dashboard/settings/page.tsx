'use client';

import { motion } from 'framer-motion';
import { Save, User, Bell, Shield, CreditCard, Store, Loader2, Layout } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { getSiteSettingsAction, updateSiteSettingsAction } from '@/lib/actions';

export default function DashboardSettings() {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [activeTab, setActiveTab] = useState('general');
  const [siteSettings, setSiteSettings] = useState<any>(null);

  useEffect(() => {
    async function fetchSettings() {
      const data = await getSiteSettingsAction();
      setSiteSettings(data);
      setFetching(false);
    }
    fetchSettings();
  }, []);

  const tabs = [
    { id: 'general', label: 'General', icon: Store },
    { id: 'site', label: 'Site Content', icon: Layout },
    { id: 'profile', label: 'Admin Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
  ];

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    if (activeTab === 'site') {
      const formData = new FormData(e.currentTarget as HTMLFormElement);
      const data = Object.fromEntries(formData.entries());
      const result = await updateSiteSettingsAction(data);
      if (result.success) {
        alert('Settings updated successfully!');
      } else {
        alert('Error: ' + result.error);
      }
    } else {
      // Mock other saves
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Settings saved!');
    }
    setLoading(false);
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="animate-spin text-brand-teal" size={40} />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <form onSubmit={handleSave} className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-serif mb-2">Settings</h1>
            <p className="text-gray-500">Configure your store preferences and account settings.</p>
          </div>
          <button 
            type="submit"
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
                type="button"
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
              <h3 className="text-xl font-serif mb-8 capitalize">{activeTab.replace('-', ' ')} Settings</h3>
              
              <div className="space-y-6 max-w-2xl">
                {activeTab === 'general' && (
                  <>
                    <div className="space-y-2">
                      <label className="text-sm font-bold">Store Name</label>
                      <input name="storeName" defaultValue="AuviaMart Pakistan" className="w-full bg-gray-50 dark:bg-white/5 border rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-brand-teal" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold">Support Email</label>
                      <input name="supportEmail" defaultValue={siteSettings?.supportEmail || "support@auviamart.pk"} className="w-full bg-gray-50 dark:bg-white/5 border rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-brand-teal" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold">Store Currency</label>
                      <select name="currency" className="w-full bg-gray-50 dark:bg-white/5 border rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-brand-teal">
                        <option>PKR - Pakistani Rupee</option>
                        <option>USD - US Dollar</option>
                      </select>
                    </div>
                  </>
                )}

                {activeTab === 'site' && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold">CTA Title</label>
                        <input name="ctaTitle" defaultValue={siteSettings?.ctaTitle} className="w-full bg-gray-50 dark:bg-white/5 border rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-brand-teal" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold">CTA Button Text</label>
                        <input name="ctaButtonText" defaultValue={siteSettings?.ctaButtonText} className="w-full bg-gray-50 dark:bg-white/5 border rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-brand-teal" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold">CTA Description</label>
                      <textarea name="ctaDescription" rows={3} defaultValue={siteSettings?.ctaDescription} className="w-full bg-gray-50 dark:bg-white/5 border rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-brand-teal" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold">CTA Background Image URL</label>
                      <input name="ctaImage" defaultValue={siteSettings?.ctaImage} className="w-full bg-gray-50 dark:bg-white/5 border rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-brand-teal" />
                    </div>

                    <div className="pt-6 border-t">
                      <h4 className="font-bold mb-4">Social Media Links</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-xs text-gray-400 font-bold uppercase">Instagram</label>
                          <input name="instagram" defaultValue={siteSettings?.instagram} className="w-full bg-gray-50 dark:bg-white/5 border rounded-xl py-2 px-4 outline-none focus:ring-2 focus:ring-brand-teal" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs text-gray-400 font-bold uppercase">Facebook</label>
                          <input name="facebook" defaultValue={siteSettings?.facebook} className="w-full bg-gray-50 dark:bg-white/5 border rounded-xl py-2 px-4 outline-none focus:ring-2 focus:ring-brand-teal" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs text-gray-400 font-bold uppercase">Twitter</label>
                          <input name="twitter" defaultValue={siteSettings?.twitter} className="w-full bg-gray-50 dark:bg-white/5 border rounded-xl py-2 px-4 outline-none focus:ring-2 focus:ring-brand-teal" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs text-gray-400 font-bold uppercase">LinkedIn</label>
                          <input name="linkedin" defaultValue={siteSettings?.linkedin} className="w-full bg-gray-50 dark:bg-white/5 border rounded-xl py-2 px-4 outline-none focus:ring-2 focus:ring-brand-teal" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 pt-6 border-t">
                      <label className="text-sm font-bold">Footer Description</label>
                      <textarea name="footerText" rows={3} defaultValue={siteSettings?.footerText} className="w-full bg-gray-50 dark:bg-white/5 border rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-brand-teal" />
                    </div>
                  </>
                )}
                
                {activeTab === 'profile' && (
                  <>
                    <div className="flex items-center gap-6 mb-8">
                      <div className="w-20 h-20 rounded-full bg-brand-teal text-white flex items-center justify-center text-3xl font-bold">R</div>
                      <button type="button" className="text-sm font-bold text-brand-teal hover:underline">Change Avatar</button>
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

                {['notifications', 'security'].includes(activeTab) && (
                  <div className="py-20 text-center text-gray-500 italic">
                    Advanced {activeTab} settings will be available in the next update.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
