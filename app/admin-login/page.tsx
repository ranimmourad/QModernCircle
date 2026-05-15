'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';

export default function AdminLoginPage() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-32 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-md w-full text-center"
      >
        <Lock
          size={28}
          strokeWidth={1.25}
          className="text-terracotta mx-auto mb-8"
        />
        <p className="text-xs uppercase tracking-widest text-bark mb-4">
          Restricted Area
        </p>
        <h1 className="font-display text-5xl md:text-6xl tracking-widest text-cocoa">
          Admin Login
        </h1>
        <p className="font-heading italic text-xl text-bark mt-6">
          Coming soon.
        </p>
        <p className="text-sm text-bark mt-2 leading-loose">
          The admin portal is being prepared with the same care as everything
          else here. Check back shortly.
        </p>
        <Link
          href="/"
          className="inline-block mt-10 px-10 py-3 border border-cocoa text-cocoa text-xs uppercase tracking-widest hover:bg-cocoa hover:text-cream transition-colors duration-500"
        >
          Back to Modern Circle
        </Link>
      </motion.div>
    </section>
  );
}
