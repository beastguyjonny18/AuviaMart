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
    name: 'Portable Desktop Air Cooler',
    brand: 'AUVIA',
    price: 145.00,
    image: '/products/1778480431596.jpeg',
    badge: 'BEST SELLER',
    rating: 4.8,
    category: 'Home Appliances',
    description: 'Stay cool anywhere with our portable desktop air cooler. Features 3-speed settings, LED mood lighting, and a compact design perfect for offices or bedrooms.',
    features: ['3 Cooling Speeds', 'Ultra-Quiet Operation', 'USB Powered', 'Compact & Portable']
  },
  {
    id: '2',
    slug: 'modern-3d-diy-wall-clock',
    name: 'Modern 3D DIY Wall Clock',
    brand: 'AUVIA HOME',
    price: 85.00,
    image: '/products/1778480407790.jpeg',
    badge: 'NEW',
    rating: 4.9,
    category: 'Home Decor',
    description: 'Transform your wall with this stylish DIY 3D wall clock. Easy to install and customize to your preferred size.',
    features: ['Silent Movement', 'Adjustable Diameter', 'Mirror Surface', 'Easy Installation']
  },
  {
    id: '3',
    slug: 'arabic-calligraphy-wall-clock',
    name: 'Arabic Calligraphy 3D Wall Clock',
    brand: 'AUVIA ISLAMIC',
    price: 110.00,
    image: '/products/1778480407791.jpeg',
    badge: 'BEST SELLER',
    rating: 5.0,
    category: 'Home Decor',
    description: 'A beautiful blend of modern design and traditional calligraphy. Features "Al-Falaq" in stunning 3D acrylic.',
    features: ['High-Quality Acrylic', 'Precision Cut', 'Silent Quartz Mechanism', 'Cultural Aesthetic']
  },
  {
    id: '4',
    slug: 'smart-watch-ultra-series',
    name: 'Smart Watch Ultra Series',
    brand: 'AUVIA TECH',
    price: 295.00,
    image: '/products/1778480422145.jpeg',
    badge: 'NEW',
    rating: 4.7,
    category: 'Electronics',
    description: 'The ultimate companion for your active lifestyle. High-resolution display, heart rate monitoring, and 7-day battery life.',
    features: ['AMOLED Display', 'Blood Oxygen Sensor', 'IP68 Waterproof', 'Multiple Sports Modes']
  },
  {
    id: '5',
    slug: 'premium-skincare-regimen',
    name: 'Premium Skincare Regimen Set',
    brand: 'AUVIA BEAUTY',
    price: 185.00,
    image: '/products/1778480424461.jpeg',
    rating: 4.6,
    category: 'Beauty',
    description: 'Achieve glowing skin with our curated selection of organic skincare essentials. Includes cleanser, toner, and moisturizer.',
    features: ['100% Organic', 'Cruelty-Free', 'For All Skin Types', 'Paraben-Free']
  },
  {
    id: '6',
    slug: 'minimalist-glow-clock',
    name: 'Minimalist Glow 3D Clock',
    brand: 'AUVIA HOME',
    price: 125.00,
    image: '/products/1778482106500.jpeg',
    badge: 'BEST SELLER',
    rating: 4.8,
    category: 'Home Decor',
    description: 'Add a warm ambiance to your living space with our backlit 3D wall clock. Perfect for creating a cozy atmosphere.',
    features: ['LED Backlight', 'Remote Controlled', 'Adjustable Brightness', 'Energy Efficient']
  }
];
