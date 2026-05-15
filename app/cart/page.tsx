'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus, X, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalPrice, clearCart } =
    useCart();

  return (
    <section className="pt-40 pb-24 px-6 md:px-10 min-h-[80vh]">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <p className="text-xs uppercase tracking-widest text-bark mb-4">
            Your Selection
          </p>
          <h1 className="font-display text-6xl md:text-7xl tracking-widest text-cocoa">
            Cart
          </h1>
        </motion.div>

        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="font-heading italic text-2xl text-bark mb-2">
              Your cart is quiet for now.
            </p>
            <p className="text-sm text-bark mb-10">
              Wander through the boutique and find something to bring home.
            </p>
            <Link
              href="/boutique"
              className="inline-block px-10 py-4 border border-cocoa text-cocoa text-xs uppercase tracking-widest hover:bg-cocoa hover:text-cream transition-colors duration-500"
            >
              Browse the Boutique
            </Link>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Items */}
            <div className="lg:col-span-2">
              <div className="border-t border-cocoa/15">
                <AnimatePresence>
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.4 }}
                      className="py-6 border-b border-cocoa/15 flex gap-5"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-32 object-cover flex-shrink-0"
                      />
                      <div className="flex-1 flex flex-col">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-[10px] uppercase tracking-widest text-bark mb-1">
                              {item.category}
                            </p>
                            <h3 className="font-heading text-xl text-cocoa">
                              {item.name}
                            </h3>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            aria-label="Remove"
                            className="text-bark hover:text-terracotta transition-colors"
                          >
                            <X size={16} strokeWidth={1.25} />
                          </button>
                        </div>

                        <div className="mt-auto pt-4 flex items-end justify-between">
                          <div className="inline-flex items-center border border-cocoa/20">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="px-3 py-2 text-cocoa hover:bg-cocoa hover:text-cream transition-colors"
                              aria-label="Decrease"
                            >
                              <Minus size={12} strokeWidth={1.5} />
                            </button>
                            <span className="px-4 text-sm font-heading text-cocoa min-w-[2rem] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="px-3 py-2 text-cocoa hover:bg-cocoa hover:text-cream transition-colors"
                              aria-label="Increase"
                            >
                              <Plus size={12} strokeWidth={1.5} />
                            </button>
                          </div>
                          <p className="font-heading text-lg text-terracotta">
                            {(item.price * item.quantity).toFixed(0)} TND
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              <button
                onClick={clearCart}
                className="mt-6 text-xs uppercase tracking-widest text-bark hover:text-terracotta transition-colors"
              >
                Clear cart
              </button>
            </div>

            {/* Summary */}
            <motion.aside
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="lg:sticky lg:top-32 h-fit border border-cocoa/15 p-8"
            >
              <p className="text-xs uppercase tracking-widest text-bark mb-6">
                Order Summary
              </p>

              <div className="space-y-3 text-sm text-bark">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-cocoa">{totalPrice.toFixed(0)} TND</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="italic-accent">calculated at checkout</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-cocoa/15 flex justify-between items-baseline">
                <span className="font-heading text-lg text-cocoa">Total</span>
                <span className="font-display text-3xl text-terracotta">
                  {totalPrice.toFixed(0)} TND
                </span>
              </div>

              <button
                onClick={() =>
                  alert(
                    'Thank you. Checkout will be available soon — your selection is saved.'
                  )
                }
                className="mt-8 w-full py-4 bg-cocoa text-cream text-xs uppercase tracking-widest hover:bg-terracotta transition-colors duration-500 flex items-center justify-center gap-3"
              >
                Checkout
                <ArrowRight size={14} strokeWidth={1.5} />
              </button>

              <Link
                href="/boutique"
                className="mt-4 block text-center text-xs uppercase tracking-widest text-bark hover:text-cocoa transition-colors"
              >
                Continue shopping
              </Link>
            </motion.aside>
          </div>
        )}
      </div>
    </section>
  );
}
