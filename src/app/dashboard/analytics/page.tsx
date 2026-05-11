'use client';

import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Users, ShoppingCart, ArrowUpRight, ArrowDownRight, Loader2 } from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { useState, useEffect } from 'react';
import { getDashboardStatsAction } from '@/lib/actions';

export default function AnalyticsPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getDashboardStatsAction();
      setStats(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  const deviceData = [
    { name: 'Mobile', value: 65, color: '#1a5f7a' },
    { name: 'Desktop', value: 25, color: '#0d3b55' },
    { name: 'Tablet', value: 10, color: '#e8a44a' },
  ];

  const salesTrend = [
    { name: 'Mon', sales: 1200 },
    { name: 'Tue', sales: 1900 },
    { name: 'Wed', sales: 1500 },
    { name: 'Thu', sales: 2100 },
    { name: 'Fri', sales: 2400 },
    { name: 'Sat', sales: 1800 },
    { name: 'Sun', sales: 2800 },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="animate-spin text-brand-teal" size={40} />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif mb-2">Analytics</h1>
        <p className="text-gray-500">In-depth insights into your store performance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Conversion Rate', value: '3.2%', change: '+0.4%', icon: TrendingUp },
          { label: 'Avg. Order Value', value: 'Rs. 4,500', change: '+Rs. 250', icon: ShoppingCart },
          { label: 'Bounce Rate', value: '42%', change: '-2.1%', icon: ArrowDownRight },
          { label: 'Active Now', value: '24', change: '+8', icon: Users },
        ].map((stat, i) => (
          <div key={i} className="p-6 bg-white rounded-3xl border shadow-sm marble-gloss">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-brand-teal/10 rounded-lg text-brand-teal">
                <stat.icon size={20} />
              </div>
              <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">{stat.change}</span>
            </div>
            <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
            <h3 className="text-2xl font-bold">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="p-8 bg-white rounded-[2rem] border shadow-sm marble-gloss">
          <h3 className="text-xl font-serif mb-8">Weekly Sales Trend</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesTrend}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Line type="monotone" dataKey="sales" stroke="#1a5f7a" strokeWidth={4} dot={{ r: 6, fill: '#1a5f7a' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-8 bg-white rounded-[2rem] border shadow-sm marble-gloss text-center">
          <h3 className="text-xl font-serif mb-8">Device Distribution</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={deviceData}
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {deviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-4">
            {deviceData.map((d) => (
              <div key={d.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }} />
                <span className="text-xs font-bold">{d.name} ({d.value}%)</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
