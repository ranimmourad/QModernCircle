'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalItems } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const linkClass =
    'text-xs uppercase tracking-widest font-light transition-opacity hover:opacity-60';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-cream/95 border-b border-cocoa/10 py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="font-display text-2xl md:text-3xl tracking-widest text-cocoa"
        >
          MODERN<span className="italic-accent text-terracotta mx-1">·</span>CIRCLE
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-10">
          <Link href="/#about" className={linkClass}>
            About
          </Link>
          <Link href="/#menu" className={linkClass}>
            Menu
          </Link>
          <Link href="/#gallery" className={linkClass}>
            Gallery
          </Link>
          <Link href="/boutique" className={linkClass}>
            Boutique
          </Link>
          <Link href="/#reserve" className={linkClass}>
            Reserve
          </Link>
          <Link
            href="/cart"
            className="relative flex items-center text-cocoa"
            aria-label="Cart"
          >
            <ShoppingBag size={18} strokeWidth={1.25} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-3 text-[10px] bg-cocoa text-cream rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-4">
          <Link href="/cart" className="relative text-cocoa" aria-label="Cart">
            <ShoppingBag size={18} strokeWidth={1.25} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-3 text-[10px] bg-cocoa text-cream rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            className="text-cocoa"
          >
            {menuOpen ? (
              <X size={22} strokeWidth={1.25} />
            ) : (
              <Menu size={22} strokeWidth={1.25} />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu drawer */}
      {menuOpen && (
        <div className="md:hidden bg-cream border-t border-cocoa/10 px-6 py-8 flex flex-col gap-6">
          <Link
            href="/#about"
            onClick={() => setMenuOpen(false)}
            className={linkClass}
          >
            About
          </Link>
          <Link
            href="/#menu"
            onClick={() => setMenuOpen(false)}
            className={linkClass}
          >
            Menu
          </Link>
          <Link
            href="/#gallery"
            onClick={() => setMenuOpen(false)}
            className={linkClass}
          >
            Gallery
          </Link>
          <Link
            href="/boutique"
            onClick={() => setMenuOpen(false)}
            className={linkClass}
          >
            Boutique
          </Link>
          <Link
            href="/#reserve"
            onClick={() => setMenuOpen(false)}
            className={linkClass}
          >
            Reserve
          </Link>
        </div>
      )}
    </header>
  );
}
