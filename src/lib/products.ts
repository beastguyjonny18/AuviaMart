export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  badge?: 'BEST SELLER' | 'NEW';
  rating: number;
  category: string;
  description: string;
  features: string[];
}

export const products: Product[] = [
  {
    id: '1',
    slug: 'portable-desktop-air-cooler',
    name: 'Arctic Wave Portable Cooler',
    brand: 'AUVIA',
    price: 12500,
    image: '/products/Portable fan cooler.jpeg',
    badge: 'BEST SELLER',
    rating: 4.8,
    category: 'Home Appliances',
    description: 'Beat the heat in Pakistan with our high-performance portable air cooler. Perfect for humid summers, featuring energy-efficient cooling and silent operation.',
    features: ['Low Power Consumption', 'High Air Throw', 'USB Rechargeable', '3 Speed Modes']
  },
  {
    id: '2',
    slug: 'modern-3d-diy-wall-clock',
    name: 'Luxe 3D Crystal Wall Clock',
    brand: 'AUVIA HOME',
    price: 4500,
    image: '/products/1778480407790.jpeg',
    badge: 'NEW',
    rating: 4.9,
    category: 'Home Decor',
    description: 'Elevate your drawing room with this stunning 3D DIY wall clock. A masterpiece of modern art that fits perfectly on any wall.',
    features: ['Noiseless Movement', 'Large Display', 'Mirror Finish', 'DIY Installation']
  },
  {
    id: '3',
    slug: 'arabic-calligraphy-wall-clock',
    name: 'Islamic Calligraphy Masterpiece',
    brand: 'AUVIA ISLAMIC',
    price: 6800,
    image: '/products/1778480407791.jpeg',
    badge: 'BEST SELLER',
    rating: 5.0,
    category: 'Home Decor',
    description: 'Beautifully crafted Arabic calligraphy clock featuring Al-Falaq. A perfect spiritual addition to your Pakistani home.',
    features: ['High-Grade Acrylic', 'Golden 3D Effect', 'Quartz Reliability', 'Cultural Heritage']
  },
  {
    id: '4',
    slug: 'smart-watch-ultra-series',
    name: 'Titan Ultra Smart Watch',
    brand: 'AUVIA TECH',
    price: 18900,
    image: '/products/apple watch.jpeg',
    badge: 'NEW',
    rating: 4.7,
    category: 'Electronics',
    description: 'The ultimate smartwatch for the modern Pakistani professional. Features heart rate tracking, local notification support, and long-lasting battery.',
    features: ['HD Display', 'Wireless Charging', 'Water Resistant', 'Fitness Tracking']
  },
  {
    id: '5',
    slug: 'blackhead-remover-pro',
    name: 'PorePure Blackhead Remover',
    brand: 'AUVIA BEAUTY',
    price: 3200,
    image: '/products/black head remover machine.jpeg',
    rating: 4.6,
    category: 'Beauty',
    description: 'Professional grade skin care at home. Efficiently removes blackheads and cleanses pores for a healthy Pakistani glow.',
    features: ['Vacuum Suction', '5 Level Intensity', 'Rechargeable', 'Easy Clean']
  },
  {
    id: '6',
    slug: 'gaming-chair-pro-red',
    name: 'Apex Gaming Chair - Crimson',
    brand: 'AUVIA GAMING',
    price: 42000,
    image: '/products/Gaming chair red.jpeg',
    badge: 'BEST SELLER',
    rating: 4.8,
    category: 'Furniture',
    description: 'Premium ergonomic gaming chair designed for long sessions. Superior comfort with breathable materials and adjustable support.',
    features: ['Memory Foam', '180 Deg Recline', 'Adjustable Armrests', 'Heavy Duty Base']
  }
];
