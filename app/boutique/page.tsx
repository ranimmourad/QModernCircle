'use client';

import { useMemo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Check } from 'lucide-react';
import { useCart } from '@/context/CartContext';

// This now matches exactly what Supabase sends
interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  in_stock: boolean;
  description: string;
}

type Filter = 'All' | string;

export default function BoutiquePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [filter, setFilter] = useState<Filter>('All');
  const [query, setQuery] = useState('');
  const [justAdded, setJustAdded] = useState<string | null>(null);
  const { addToCart } = useCart();

  // Fetch live data from Supabase
  useEffect(() => {
    fetch('/api/products', { cache: 'no-store' })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setProducts(data);
          // Automatically grab categories from the database
          const uniqueCats = Array.from(new Set(data.map((p: Product) => p.category).filter(Boolean))) as string[];
          setCategories(uniqueCats);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = filter === 'All' || p.category === filter;
      const matchesQuery =
        query.trim() === '' ||
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        (p.description && p.description.toLowerCase().includes(query.toLowerCase()));
      return matchesCategory && matchesQuery;
    });
  }, [filter, query, products]);

  const handleAdd = (id: string) => {
    const product = products.find((p) => p.id === id);
    if (!product || !product.in_stock) return;
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    setJustAdded(id);
    setTimeout(() => setJustAdded((prev) => (prev === id ? null : prev)), 1400);
  };

  if (loading) {
    return (
      <section className="pt-40 pb-16 px-6 md:px-10 text-center">
        <p className="font-heading italic text-2xl text-bark animate-pulse">Loading the boutique...</p>
      </section>
    );
  }

  return (
    <>
      {/* ===== Header ===== */}
      <section className="pt-40 pb-16 px-6 md:px-10 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-xs uppercase tracking-widest text-bark mb-4"
        >
          Concept Store
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.15 }}
          className="font-display text-6xl md:text-7xl tracking-widest text-cocoa"
        >
          The Boutique
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="font-heading italic text-xl md:text-2xl text-bark mt-5 max-w-2xl mx-auto"
        >
          A small, considered collection from local artisans &mdash; the
          everyday objects we love.
        </motion.p>
      </section>

      {/* ===== Search + Filter ===== */}
      <section className="px-6 md:px-10 sticky top-[68px] z-30 bg-cream/95 border-y border-cocoa/10 py-5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center gap-5 md:gap-8">
          {/* Search */}
          <div className="relative md:w-72 flex-shrink-0">
            <Search
              size={16}
              strokeWidth={1.25}
              className="absolute left-0 top-1/2 -translate-y-1/2 text-bark"
            />
            <input
              type="text"
              placeholder="Search the boutique..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent border-b border-cocoa/20 pl-7 pr-2 py-2 text-sm text-cocoa placeholder-bark/60 focus:border-cocoa focus:outline-none transition-colors"
            />
          </div>

          {/* Category buttons */}
          <div className="flex-1 overflow-x-auto">
            <div className="flex gap-2 md:gap-3 md:flex-wrap min-w-max md:min-w-0">
              {(['All', ...categories] as Filter[]).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-2 text-xs uppercase tracking-widest border whitespace-nowrap transition-colors duration-300 ${
                    filter === cat
                      ? 'bg-cocoa text-cream border-cocoa'
                      : 'bg-transparent text-cocoa border-cocoa/20 hover:border-cocoa'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== Product Grid ===== */}
      <section className="px-6 md:px-10 py-16">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-bark mb-10">
            {filtered.length} {filtered.length === 1 ? 'piece' : 'pieces'}
            {filter !== 'All' && (
              <>
                {' '}&middot; <span className="text-cocoa">{filter}</span>
              </>
            )}
          </p>

          {filtered.length === 0 ? (
            <div className="text-center py-32">
              <p className="font-heading italic text-2xl text-bark">
                Nothing here yet.
              </p>
              <p className="text-sm text-bark mt-3">
                Try a different category or search term.
              </p>
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-14 md:gap-x-8 md:gap-y-16"
            >
              <AnimatePresence mode="popLayout">
                {filtered.map((p, i) => (
                  <motion.article
                    layout
                    key={p.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{
                      duration: 0.6,
                      delay: (i % 8) * 0.04,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="group flex flex-col"
                  >
                    {/* Image */}
                    <div className="relative aspect-[4/5] overflow-hidden bg-cocoa/5 mb-5">
                      <img
                        src={p.image}
                        alt={p.name}
                        className={`w-full h-full object-cover transition-opacity duration-700 ${
                          p.in_stock ? 'group-hover:opacity-90' : 'opacity-60'
                        }`}
                      />
                      {!p.in_stock && (
                        <div className="absolute top-3 left-3 bg-cream px-3 py-1 text-[10px] uppercase tracking-widest text-bark border border-cocoa/15">
                          Sold Out
                        </div>
                      )}
                      <div className="absolute top-3 right-3 text-[10px] uppercase tracking-widest text-bark/70">
                        {p.category ? p.category.split(' ')[0] : ''}
                      </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1 flex flex-col">
                      <h3 className="font-heading text-xl text-cocoa leading-tight">
                        {p.name}
                      </h3>
                      <p className="text-xs text-bark italic-accent mt-1 line-clamp-2">
                        {p.description}
                      </p>

                      <div className="mt-auto pt-4 flex items-baseline justify-between">
                        <span className="font-heading text-lg text-terracotta">
                          {p.price} TND
                        </span>
                        <span
                          className={`text-[10px] uppercase tracking-widest ${
                            p.in_stock ? 'text-olive' : 'text-bark/60'
                          }`}
                        >
                          {p.in_stock ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </div>

                      <button
                        onClick={() => handleAdd(p.id)}
                        disabled={!p.in_stock}
                        className={`mt-4 w-full py-3 text-[11px] uppercase tracking-widest border transition-colors duration-400 flex items-center justify-center gap-2 ${
                          !p.in_stock
                            ? 'border-cocoa/15 text-bark/40 cursor-not-allowed'
                            : justAdded === p.id
                            ? 'border-olive bg-olive text-cream'
                            : 'border-cocoa text-cocoa hover:bg-cocoa hover:text-cream'
                        }`}
                      >
                        {justAdded === p.id ? (
                          <>
                            <Check size={14} strokeWidth={1.5} />
                            Added
                          </>
                        ) : p.in_stock ? (
                          'Add to Cart'
                        ) : (
                          'Unavailable'
                        )}
                      </button>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      {/* ===== Closing strip ===== */}
      <section className="px-6 md:px-10 py-24 border-t border-cocoa/10 text-center">
        <p className="font-display text-3xl md:text-4xl tracking-widest text-cocoa">
          Made by hand &middot; sent with care
        </p>
        <p className="font-heading italic text-bark mt-4">
          Each piece is one-of-a-kind. Once it&apos;s gone, it&apos;s gone.
        </p>
      </section>
    </>
  );
}