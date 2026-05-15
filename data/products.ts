export type ProductCategory =
  | 'Handmade Clothing'
  | 'Beauty/Skincare'
  | 'Bags & Wallets'
  | 'Accessories'
  | 'Stickers'
  | 'Ceramics & Stoneware';

export interface Product {
  id: string;
  name: string;
  price: number; // in TND
  image: string;
  category: ProductCategory;
  inStock: boolean;
  description: string;
}

export const categories: ProductCategory[] = [
  'Handmade Clothing',
  'Beauty/Skincare',
  'Bags & Wallets',
  'Accessories',
  'Stickers',
  'Ceramics & Stoneware',
];

export const products: Product[] = [
  // ---------- Handmade Clothing ----------
  {
    id: 'hc-01',
    name: 'Linen Wrap Blouse',
    price: 165,
    image: 'https://picsum.photos/seed/moderncircle101/800/1000',
    category: 'Handmade Clothing',
    inStock: true,
    description: 'Soft natural linen, hand-stitched in Tunis. Cream tone.',
  },
  {
    id: 'hc-02',
    name: 'Oversized Knit Cardigan',
    price: 220,
    image: 'https://picsum.photos/seed/moderncircle102/800/1000',
    category: 'Handmade Clothing',
    inStock: true,
    description: 'Slow-knitted by local artisans. Warm oat colour.',
  },
  {
    id: 'hc-03',
    name: 'Cotton Wide-Leg Trousers',
    price: 180,
    image: 'https://picsum.photos/seed/moderncircle103/800/1000',
    category: 'Handmade Clothing',
    inStock: false,
    description: 'Relaxed organic cotton trousers. Elastic waist.',
  },
  {
    id: 'hc-04',
    name: 'Hand-Embroidered Tunic',
    price: 195,
    image: 'https://picsum.photos/seed/moderncircle104/800/1000',
    category: 'Handmade Clothing',
    inStock: true,
    description: 'Subtle floral embroidery on raw cotton.',
  },

  // ---------- Beauty / Skincare ----------
  {
    id: 'bs-01',
    name: 'Argan & Rose Face Oil',
    price: 78,
    image: 'https://picsum.photos/seed/moderncircle201/800/1000',
    category: 'Beauty/Skincare',
    inStock: true,
    description: 'Cold-pressed argan blended with damask rose. 30ml.',
  },
  {
    id: 'bs-02',
    name: 'Olive Leaf Soap Bar',
    price: 22,
    image: 'https://picsum.photos/seed/moderncircle202/800/1000',
    category: 'Beauty/Skincare',
    inStock: true,
    description: 'Hand-cut soap from Sahel olives. Gentle, daily use.',
  },
  {
    id: 'bs-03',
    name: 'Neroli Body Balm',
    price: 64,
    image: 'https://picsum.photos/seed/moderncircle203/800/1000',
    category: 'Beauty/Skincare',
    inStock: true,
    description: 'Whipped shea butter with Tunisian neroli. 100ml.',
  },
  {
    id: 'bs-04',
    name: 'Mint & Clay Mask',
    price: 48,
    image: 'https://picsum.photos/seed/moderncircle204/800/1000',
    category: 'Beauty/Skincare',
    inStock: false,
    description: 'Ghassoul clay with fresh mint extract.',
  },

  // ---------- Bags & Wallets ----------
  {
    id: 'bw-01',
    name: 'Vegetable-Tanned Tote',
    price: 245,
    image: 'https://picsum.photos/seed/moderncircle301/800/1000',
    category: 'Bags & Wallets',
    inStock: true,
    description: 'Full-grain leather, ages beautifully. Holds a 13" laptop.',
  },
  {
    id: 'bw-02',
    name: 'Slim Bifold Wallet',
    price: 95,
    image: 'https://picsum.photos/seed/moderncircle302/800/1000',
    category: 'Bags & Wallets',
    inStock: true,
    description: 'Minimal six-card wallet. Hand-stitched edges.',
  },
  {
    id: 'bw-03',
    name: 'Canvas Market Bag',
    price: 55,
    image: 'https://picsum.photos/seed/moderncircle303/800/1000',
    category: 'Bags & Wallets',
    inStock: true,
    description: 'Heavy 14oz raw canvas. Carries everything beautifully.',
  },
  {
    id: 'bw-04',
    name: 'Leather Crossbody Pouch',
    price: 170,
    image: 'https://picsum.photos/seed/moderncircle304/800/1000',
    category: 'Bags & Wallets',
    inStock: false,
    description: 'Soft tan leather, adjustable strap.',
  },

  // ---------- Accessories ----------
  {
    id: 'ac-01',
    name: 'Brass Hair Pin',
    price: 38,
    image: 'https://picsum.photos/seed/moderncircle401/800/1000',
    category: 'Accessories',
    inStock: true,
    description: 'Hand-forged brass, develops a soft patina.',
  },
  {
    id: 'ac-02',
    name: 'Silk Hair Scarf',
    price: 65,
    image: 'https://picsum.photos/seed/moderncircle402/800/1000',
    category: 'Accessories',
    inStock: true,
    description: 'Naturally dyed silk square. Limited print.',
  },
  {
    id: 'ac-03',
    name: 'Minimal Pearl Earrings',
    price: 85,
    image: 'https://picsum.photos/seed/moderncircle403/800/1000',
    category: 'Accessories',
    inStock: true,
    description: 'Freshwater pearls on sterling silver.',
  },
  {
    id: 'ac-04',
    name: 'Wool Felt Beret',
    price: 72,
    image: 'https://picsum.photos/seed/moderncircle404/800/1000',
    category: 'Accessories',
    inStock: false,
    description: 'Soft merino wool, classic shape.',
  },

  // ---------- Stickers ----------
  {
    id: 'st-01',
    name: 'Slow Living Sticker Pack',
    price: 18,
    image: 'https://picsum.photos/seed/moderncircle501/800/1000',
    category: 'Stickers',
    inStock: true,
    description: 'Six matte vinyl stickers. Calm, minimal illustrations.',
  },
  {
    id: 'st-02',
    name: 'Coffee Phrases Set',
    price: 15,
    image: 'https://picsum.photos/seed/moderncircle502/800/1000',
    category: 'Stickers',
    inStock: true,
    description: 'Hand-lettered phrases. Waterproof.',
  },
  {
    id: 'st-03',
    name: 'Botanical Line Art Pack',
    price: 20,
    image: 'https://picsum.photos/seed/moderncircle503/800/1000',
    category: 'Stickers',
    inStock: true,
    description: 'Eight delicate plant illustrations.',
  },

  // ---------- Ceramics & Stoneware ----------
  {
    id: 'cs-01',
    name: 'Hand-Thrown Cappuccino Cup',
    price: 58,
    image: 'https://picsum.photos/seed/moderncircle601/800/1000',
    category: 'Ceramics & Stoneware',
    inStock: true,
    description: 'Stoneware in matte cream. 180ml, each one unique.',
  },
  {
    id: 'cs-02',
    name: 'Raw Stoneware Bowl',
    price: 72,
    image: 'https://picsum.photos/seed/moderncircle602/800/1000',
    category: 'Ceramics & Stoneware',
    inStock: true,
    description: 'Wide breakfast bowl. Warm sand glaze.',
  },
  {
    id: 'cs-03',
    name: 'Ceramic Pour-Over Set',
    price: 165,
    image: 'https://picsum.photos/seed/moderncircle603/800/1000',
    category: 'Ceramics & Stoneware',
    inStock: true,
    description: 'Dripper + carafe. Slow ritual, beautiful object.',
  },
  {
    id: 'cs-04',
    name: 'Minimal Vase, Tall',
    price: 95,
    image: 'https://picsum.photos/seed/moderncircle604/800/1000',
    category: 'Ceramics & Stoneware',
    inStock: false,
    description: 'Hand-shaped, soft white. 28cm.',
  },
];
