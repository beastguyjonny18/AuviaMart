'use client';

import { motion } from 'framer-motion';
import { Save, User, Bell, Shield, CreditCard, Store, Loader2, Layout, Upload, Link as LinkIcon, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState, useEffect, useRef } from 'react';
import { getSiteSettingsAction, updateSiteSettingsAction } from '@/lib/actions';
import { storage } from '@/lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function DashboardSettings() {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [activeTab, setActiveTab] = useState('site');
  const [siteSettings, setSiteSettings] = useState<any>(null);
  
  // Image Upload State
  const [uploading, setUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function fetchSettings() {
      const data = await getSiteSettingsAction();
      setSiteSettings(data);
      setPreviewImage(data?.ctaImage || null);
      setFetching(false);
    }
    fetchSettings();
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show local preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result as string);
    };
    reader.readAsDataURL(file);

    setUploading(true);
    try {
      const storageRef = ref(storage, `settings/cta-bg-${Date.now()}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      setSiteSettings((prev: any) => ({ ...prev, ctaImage: downloadURL }));
      alert('Image uploaded successfully! Remember to Save Changes.');
    } catch (error: any) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    
    const finalData = {
      ...siteSettings,
      ...data,
    };

    if (activeTab === 'site') {
      const result = await updateSiteSettingsAction(finalData);
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

  const tabs = [
    { id: 'site', label: 'Site Content', icon: Layout },
    { id: 'general', label: 'General', icon: Store },
    { id: 'profile', label: 'Admin Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
  ];

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
            <h1 className="text-3xl font-serif mb-2 text-brand-navy">Dashboard *Settings*</h1>
            <p className="text-gray-500 italic">Configure your platform preferences and content.</p>
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
                    : "text-gray-500 hover:bg-gray-100"
                )}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </aside>

          <div className="flex-1 space-y-8">
            <div className="bg-white dark:bg-surface-card-dark rounded-[2.5rem] border shadow-sm p-10 marble-gloss">
              <h3 className="text-xl font-serif mb-10 capitalize italic border-b pb-4">{activeTab.replace('-', ' ')} Configuration</h3>
              
              <div className="space-y-8 max-w-3xl">
                {activeTab === 'general' && (
                  <>
                    <div className="space-y-2">
                      <label className="text-sm font-bold">Store Name</label>
                      <input name="storeName" defaultValue="AuviaMart Pakistan" className="w-full bg-gray-50 border rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-brand-teal" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold">Support Email</label>
                      <input name="supportEmail" defaultValue={siteSettings?.supportEmail || "support@auviamart.pk"} className="w-full bg-gray-50 border rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-brand-teal" />
                    </div>
                  </>
                )}

                {activeTab === 'site' && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-sm font-bold">CTA Title (use *stars* for gold)</label>
                        <input name="ctaTitle" defaultValue={siteSettings?.ctaTitle} className="w-full bg-gray-50 border rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-brand-teal font-medium" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold">CTA Button Text</label>
                        <input name="ctaButtonText" defaultValue={siteSettings?.ctaButtonText} className="w-full bg-gray-50 border rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-brand-teal font-medium" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold">CTA Description</label>
                      <textarea name="ctaDescription" rows={3} defaultValue={siteSettings?.ctaDescription} className="w-full bg-gray-50 border rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-brand-teal leading-relaxed" />
                    </div>

                    <div className="space-y-4">
                      <label className="text-sm font-bold block text-brand-navy uppercase tracking-widest text-[10px]">CTA Background Image</label>
                      
                      <div className="flex flex-col md:flex-row gap-8 items-start">
                        <div className="relative w-full md:w-80 aspect-video rounded-[1.5rem] overflow-hidden bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center group shadow-inner">
                          {previewImage ? (
                            <>
                              <img src={previewImage} alt="CTA Preview" className="w-full h-full object-cover" />
                              <div className="absolute inset-0 bg-brand-navy/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-3 backdrop-blur-sm">
                                <button 
                                  type="button"
                                  onClick={() => fileInputRef.current?.click()}
                                  className="p-3 bg-white rounded-2xl text-brand-navy hover:scale-110 transition-transform shadow-xl"
                                >
                                  <Upload size={20} />
                                </button>
                                <button 
                                  type="button"
                                  onClick={() => { setPreviewImage(null); setSiteSettings((p:any) => ({...p, ctaImage: ''})); }}
                                  className="p-3 bg-white rounded-2xl text-red-500 hover:scale-110 transition-transform shadow-xl"
                                >
                                  <X size={20} />
                                </button>
                              </div>
                            </>
                          ) : (
                            <button 
                              type="button"
                              onClick={() => fileInputRef.current?.click()}
                              className="flex flex-col items-center gap-3 text-gray-400 hover:text-brand-teal transition-all group-hover:scale-105"
                            >
                              <Upload size={40} strokeWidth={1.5} />
                              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Upload Curation Image</span>
                            </button>
                          )}
                          
                          {uploading && (
                            <div className="absolute inset-0 bg-white/90 backdrop-blur-md flex flex-col items-center justify-center gap-3">
                              <Loader2 className="animate-spin text-brand-teal" size={32} />
                              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-teal">Processing Media...</span>
                            </div>
                          )}
                        </div>

                        <div className="flex-1 w-full space-y-4">
                          <div className="p-5 bg-brand-navy/5 rounded-[1.5rem] border border-brand-navy/10">
                             <p className="text-xs text-brand-navy/70 font-medium leading-relaxed italic">
                               Tip: Upload a high-resolution landscape image (1920x1080) for the best visual experience on the homepage.
                             </p>
                          </div>
                          <div className="relative">
                            <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input 
                              name="ctaImage" 
                              value={siteSettings?.ctaImage || ''} 
                              onChange={(e) => {
                                setSiteSettings((p:any) => ({...p, ctaImage: e.target.value}));
                                setPreviewImage(e.target.value);
                              }}
                              placeholder="Direct Image URL"
                              className="w-full bg-gray-50 border rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-brand-teal text-sm" 
                            />
                          </div>
                        </div>
                      </div>

                      <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
                    </div>

                    <div className="pt-10 border-t space-y-6">
                      <h4 className="font-bold text-brand-navy uppercase tracking-widest text-[10px]">Social Ecosystem</h4>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs text-gray-400 font-bold uppercase tracking-tighter">Instagram</label>
                          <input name="instagram" defaultValue={siteSettings?.instagram} className="w-full bg-gray-50 border rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-brand-teal text-sm font-medium" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs text-gray-400 font-bold uppercase tracking-tighter">Facebook</label>
                          <input name="facebook" defaultValue={siteSettings?.facebook} className="w-full bg-gray-50 border rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-brand-teal text-sm font-medium" />
                        </div>
                      </div>
                    </div>
                  </>
                )}
                
                {activeTab === 'profile' && (
                  <>
                    <div className="flex items-center gap-8 mb-10">
                      <div className="w-24 h-24 rounded-3xl bg-brand-teal text-white flex items-center justify-center text-4xl font-bold shadow-xl">R</div>
                      <div className="space-y-2">
                        <h4 className="text-xl font-serif italic">Roshaan</h4>
                        <button type="button" className="text-xs font-black uppercase tracking-widest text-brand-teal hover:underline">Update Personal Avatar</button>
                      </div>
                    </div>
                  </>
                )}

                {['notifications', 'security'].includes(activeTab) && (
                  <div className="py-24 text-center text-gray-400 italic">
                    Advanced curation protocols will be available in the next update.
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
