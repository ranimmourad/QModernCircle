'use client';

import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import { Wifi, Leaf, Coffee, Heart, X, Plus, Minus } from 'lucide-react';

// ---------- DATA ----------
const drinks = [
  {
    name: 'Espresso',
    desc: 'Single origin, slow extraction.',
    price: '6 TND',
    img: 'https://picsum.photos/seed/moderncircle11/800/1000',
  },
  {
    name: 'Carrot Cake',
    desc: 'Spiced, cream cheese frosting.',
    price: '14 TND',
    img: 'https://picsum.photos/seed/moderncircle12/800/1000',
  },
  {
    name: 'Pistachier',
    desc: 'Roasted pistachio, soft sponge.',
    price: '16 TND',
    img: 'https://picsum.photos/seed/moderncircle13/800/1000',
  },
  {
    name: 'Cheesecake',
    desc: 'Vanilla bean, biscuit crumble.',
    price: '15 TND',
    img: 'https://picsum.photos/seed/moderncircle14/800/1000',
  },
  {
    name: 'Granola Bowl',
    desc: 'Yogurt, honey, seasonal fruit.',
    price: '18 TND',
    img: 'https://picsum.photos/seed/moderncircle15/800/1000',
  },
  {
    name: 'Flat White',
    desc: 'Velvety milk, double ristretto.',
    price: '8 TND',
    img: 'https://picsum.photos/seed/moderncircle16/800/1000',
  },
];

const brunchMenu = [
  {
    section: 'Mornings',
    items: [
      { name: 'Avocado & Poached Egg on Sourdough', price: '22 TND' },
      { name: 'Granola, Yogurt & Honey', price: '18 TND' },
      { name: 'French Toast, Vanilla & Berries', price: '20 TND' },
      { name: 'Shakshuka, Fresh Herbs', price: '24 TND' },
    ],
  },
  {
    section: 'Plates',
    items: [
      { name: 'Smoked Salmon Bagel', price: '28 TND' },
      { name: 'Halloumi Salad, Lemon Dressing', price: '26 TND' },
      { name: 'Truffle Mushroom Toast', price: '25 TND' },
      { name: 'Chicken Pesto Sandwich', price: '24 TND' },
    ],
  },
  {
    section: 'Sweet',
    items: [
      { name: 'Carrot Cake', price: '14 TND' },
      { name: 'Pistachier', price: '16 TND' },
      { name: 'Vanilla Cheesecake', price: '15 TND' },
      { name: 'Lemon Tart', price: '14 TND' },
    ],
  },
  {
    section: 'Coffee & Tea',
    items: [
      { name: 'Espresso', price: '6 TND' },
      { name: 'Flat White', price: '8 TND' },
      { name: 'Cappuccino', price: '8 TND' },
      { name: 'Matcha Latte', price: '12 TND' },
      { name: 'House Tea Selection', price: '7 TND' },
    ],
  },
];

const galleryImages = [
  { src: 'https://picsum.photos/seed/moderncircle21/800/1000', h: 'h-80' },
  { src: 'https://picsum.photos/seed/moderncircle22/800/800', h: 'h-64' },
  { src: 'https://picsum.photos/seed/moderncircle23/800/1200', h: 'h-96' },
  { src: 'https://picsum.photos/seed/moderncircle24/800/900', h: 'h-72' },
  { src: 'https://picsum.photos/seed/moderncircle25/800/1100', h: 'h-96' },
  { src: 'https://picsum.photos/seed/moderncircle26/800/700', h: 'h-60' },
  { src: 'https://picsum.photos/seed/moderncircle27/800/1000', h: 'h-80' },
  { src: 'https://picsum.photos/seed/moderncircle28/800/900', h: 'h-72' },
  { src: 'https://picsum.photos/seed/moderncircle29/800/1200', h: 'h-96' },
  { src: 'https://picsum.photos/seed/moderncircle30/800/800', h: 'h-64' },
  { src: 'https://picsum.photos/seed/moderncircle31/800/1000', h: 'h-80' },
  { src: 'https://picsum.photos/seed/moderncircle32/800/900', h: 'h-72' },
];

const reviews = [
  {
    text: 'Une expérience exceptionnelle au Modern Circle ! Le lieu est magnifiquement décoré, lumineux, apaisant — un vrai havre de paix en plein El Mourouj. Les détails comptent ici : la vaisselle, la musique, le service attentionné.',
    name: 'Yassine H',
  },
  {
    text: 'J\u2019aime beaucoup cet endroit qui est propice au travail. L\u2019ambiance est détendue, le wifi est solide, et le café est excellent. C\u2019est devenu mon bureau préféré.',
    name: 'Lina Aouadi',
  },
  {
    text: 'Un endroit superbe pour un brunch ou petit déjeuner ! Le cadre est vraiment magnifique, les plats faits maison sont délicieux, et l\u2019équipe est adorable. Je recommande sans hésiter.',
    name: 'Khadidja Djeb',
  },
];

const faqs = [
  {
    q: 'Is Modern Circle really non-smoking?',
    a: 'Yes — entirely. The space is fully non-smoking, indoors and on the terrace, to keep the air clean and the atmosphere calm.',
  },
  {
    q: 'Can I work from here for a few hours?',
    a: 'Absolutely. Strong WiFi, plenty of outlets, comfortable seating, and a soft soundtrack. We just ask that you order from time to time so we can keep the lights on.',
  },
  {
    q: 'Do you take reservations?',
    a: 'Yes — for groups of 4 or more, especially for weekend brunch, we recommend booking in advance through the form above.',
  },
  {
    q: 'Is the concept store open the same hours?',
    a: 'Yes. The boutique is open whenever the café is — from 08:00 until 23:00, every day of the week.',
  },
];

// ---------- COUNTER ----------
function AnimatedCounter({
  to,
  suffix = '',
  duration = 2,
}: {
  to: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf: number;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.floor(eased * to));
      if (t < 1) raf = requestAnimationFrame(tick);
      else setValue(to);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}

// ---------- FADE-UP WRAPPER ----------
function FadeUp({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ---------- PAGE ----------
export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  // Lightbox
  const [lightbox, setLightbox] = useState<string | null>(null);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // FAQ
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      {/* ===================== HERO ===================== */}
      <section
        ref={heroRef}
        className="relative h-screen w-full overflow-hidden"
      >
        <motion.div
          style={{ y: heroY }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://picsum.photos/seed/moderncirclehero/1920/1200')",
            }}
          />
          <div className="absolute inset-0 bg-cocoa/30" />
        </motion.div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
        >
          <motion.p
            initial={{ opacity: 0, letterSpacing: '0.5em' }}
            animate={{ opacity: 1, letterSpacing: '0.4em' }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-cream/80 text-xs uppercase tracking-[0.4em] font-light mb-8"
          >
            El Mourouj 6 · Tunisia
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-cream text-6xl md:text-8xl lg:text-9xl tracking-widest leading-none"
          >
            MODERN
            <br />
            <span className="italic-accent text-terracotta text-5xl md:text-7xl lg:text-8xl">
              &mdash; circle &mdash;
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.9 }}
            className="font-heading italic text-cream/80 text-lg md:text-xl mt-10 max-w-md"
          >
            a quiet coffee sanctuary &middot; slow living, handmade craft
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4, delay: 1.4 }}
            className="mt-16 flex flex-col items-center"
          >
            <span className="text-cream/60 text-xs uppercase tracking-widest mb-3">
              Scroll
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-px h-12 bg-cream/40"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ===================== MARQUEE ===================== */}
      <section className="py-10 border-y border-cocoa/10 bg-cream overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center">
              {[
                'Brunch',
                'Handmade',
                'Slow Living',
                'Specialty Coffee',
                'Non-Smoking',
                'Concept Store',
                'Local Artisans',
                'Quiet Hours',
              ].map((word) => (
                <span key={word + i} className="flex items-center">
                  <span className="font-display text-4xl md:text-6xl tracking-widest text-cocoa mx-10">
                    {word}
                  </span>
                  <span className="text-terracotta text-3xl">&middot;</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ===================== ABOUT ===================== */}
      <section id="about" className="py-32 px-6 md:px-10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 md:gap-24 items-center">
          <FadeUp>
            <div className="relative">
              <div
                className="aspect-[4/5] bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://picsum.photos/seed/moderncircleabout/800/1000')",
                }}
              />
              <div className="absolute -bottom-6 -right-6 hidden md:block">
                <div className="bg-cream border border-cocoa/20 px-8 py-6">
                  <p className="font-display text-5xl text-terracotta">
                    <AnimatedCounter to={2019} />
                  </p>
                  <p className="text-xs uppercase tracking-widest text-bark mt-1">
                    Est.
                  </p>
                </div>
              </div>
            </div>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p className="text-xs uppercase tracking-widest text-bark mb-6">
              Our Story
            </p>
            <h2 className="font-display text-5xl md:text-6xl tracking-wider leading-tight text-cocoa">
              A quieter
              <br />
              way to gather.
            </h2>
            <p className="font-heading italic text-2xl text-bark mt-6">
              Coffee, craft, and conversation &mdash; without the noise.
            </p>
            <p className="mt-8 text-bark leading-loose">
              Modern Circle began as a small idea: a calm, non-smoking space in
              El Mourouj where mornings feel unhurried, work feels possible, and
              every object on the shelf has been chosen with care. Six years on,
              it remains exactly that &mdash; a sanctuary for slow days and
              handmade things.
            </p>

            <div className="grid grid-cols-3 gap-6 mt-12 pt-12 border-t border-cocoa/10">
              <div>
                <p className="font-display text-4xl md:text-5xl text-cocoa">
                  <AnimatedCounter to={6} suffix="+" />
                </p>
                <p className="text-xs uppercase tracking-widest text-bark mt-2">
                  Years Open
                </p>
              </div>
              <div>
                <p className="font-display text-4xl md:text-5xl text-cocoa">
                  <AnimatedCounter to={32} />
                </p>
                <p className="text-xs uppercase tracking-widest text-bark mt-2">
                  Artisans
                </p>
              </div>
              <div>
                <p className="font-display text-4xl md:text-5xl text-cocoa">
                  <AnimatedCounter to={100} suffix="%" />
                </p>
                <p className="text-xs uppercase tracking-widest text-bark mt-2">
                  Handmade
                </p>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ===================== FEATURED DRINKS ===================== */}
      <section className="py-32 px-6 md:px-10 bg-cocoa/5">
        <div className="max-w-7xl mx-auto">
          <FadeUp className="text-center mb-20">
            <p className="text-xs uppercase tracking-widest text-bark mb-4">
              Featured
            </p>
            <h2 className="font-display text-5xl md:text-6xl tracking-wider text-cocoa">
              Drinks &amp; Desserts
            </h2>
            <p className="font-heading italic text-xl text-bark mt-4">
              Small batch, made fresh each morning.
            </p>
          </FadeUp>

          <FadeUp delay={0.1}>
            <Swiper
              modules={[Autoplay, Pagination]}
              slidesPerView={1.2}
              spaceBetween={24}
              centeredSlides={false}
              autoplay={{ delay: 3500, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              breakpoints={{
                640: { slidesPerView: 2.2, spaceBetween: 24 },
                1024: { slidesPerView: 3.2, spaceBetween: 32 },
              }}
              className="pb-16"
            >
              {drinks.map((d) => (
                <SwiperSlide key={d.name}>
                  <div className="group">
                    <div className="aspect-[4/5] overflow-hidden mb-5">
                      <img
                        src={d.img}
                        alt={d.name}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.02]"
                      />
                    </div>
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-heading text-2xl text-cocoa">
                        {d.name}
                      </h3>
                      <span className="font-heading text-lg text-terracotta">
                        {d.price}
                      </span>
                    </div>
                    <p className="text-sm text-bark mt-1 italic-accent">
                      {d.desc}
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </FadeUp>
        </div>
      </section>

      {/* ===================== BRUNCH MENU ===================== */}
      <section id="menu" className="py-32 px-6 md:px-10">
        <div className="max-w-4xl mx-auto">
          <FadeUp className="text-center mb-20">
            <p className="text-xs uppercase tracking-widest text-bark mb-4">
              Daily
            </p>
            <h2 className="font-display text-5xl md:text-6xl tracking-wider text-cocoa">
              Brunch Menu
            </h2>
            <p className="font-heading italic text-xl text-bark mt-4">
              Served all day, every day.
            </p>
          </FadeUp>

          <div className="space-y-16">
            {brunchMenu.map((section, idx) => (
              <FadeUp key={section.section} delay={idx * 0.08}>
                <h3 className="font-display text-3xl tracking-widest text-terracotta text-center mb-10">
                  &mdash; {section.section} &mdash;
                </h3>
                <ul className="space-y-5">
                  {section.items.map((item) => (
                    <li
                      key={item.name}
                      className="dotted-leader text-cocoa text-lg"
                    >
                      <span className="name font-heading">{item.name}</span>
                      <span className="dots" />
                      <span className="price font-heading text-terracotta">
                        {item.price}
                      </span>
                    </li>
                  ))}
                </ul>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== WORK-FRIENDLY PARALLAX ===================== */}
      <section className="relative h-[70vh] overflow-hidden">
        <div
          className="parallax-bg absolute inset-0"
          style={{
            backgroundImage:
              "url('https://picsum.photos/seed/moderncirclework/1920/1200')",
          }}
        />
        <div className="absolute inset-0 bg-cocoa/55" />
        <div className="relative z-10 h-full flex items-center justify-center px-6">
          <FadeUp className="text-center max-w-3xl">
            <p className="text-xs uppercase tracking-widest text-cream/70 mb-6">
              A Space For Quiet Work
            </p>
            <h2 className="font-display text-5xl md:text-7xl tracking-wider text-cream leading-tight">
              Bring your laptop.
              <br />
              <span className="italic-accent text-terracotta">Stay a while.</span>
            </h2>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 mt-14 text-cream/90">
              <div className="flex flex-col items-center">
                <Wifi size={28} strokeWidth={1.25} />
                <span className="mt-3 text-xs uppercase tracking-widest">
                  Strong WiFi
                </span>
              </div>
              <div className="flex flex-col items-center">
                <Leaf size={28} strokeWidth={1.25} />
                <span className="mt-3 text-xs uppercase tracking-widest">
                  Non-Smoking
                </span>
              </div>
              <div className="flex flex-col items-center">
                <Coffee size={28} strokeWidth={1.25} />
                <span className="mt-3 text-xs uppercase tracking-widest">
                  Bottomless Coffee
                </span>
              </div>
              <div className="flex flex-col items-center">
                <Heart size={28} strokeWidth={1.25} />
                <span className="mt-3 text-xs uppercase tracking-widest">
                  Soft Music
                </span>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ===================== ECO / VALUES ===================== */}
      <section className="py-32 px-6 md:px-10">
        <div className="max-w-5xl mx-auto text-center">
          <FadeUp>
            <p className="text-xs uppercase tracking-widest text-bark mb-4">
              Our Values
            </p>
            <h2 className="font-display text-5xl md:text-6xl tracking-wider text-cocoa">
              Handmade,
              <br />
              <span className="italic-accent text-terracotta">heartmade.</span>
            </h2>
          </FadeUp>

          <div className="grid md:grid-cols-3 gap-12 md:gap-16 mt-20">
            {[
              {
                title: 'Local First',
                text: 'We source from Tunisian farms, roasters and artisans whose work we know by name.',
              },
              {
                title: 'Less, Better',
                text: 'A short menu of considered things, made well, served slowly. Nothing wasted.',
              },
              {
                title: 'Soft Footprint',
                text: 'Compostable take-away, ceramic on the table, refillable everywhere we can.',
              },
              {
                title: 'Open Doors',
                text: 'A welcoming space for working alone, gathering quietly, or simply pausing.',
              },
              {
                title: 'Slow Hands',
                text: 'Every cake, every loaf, every plate is made in-house each morning.',
              },
              {
                title: 'Honest Pricing',
                text: 'Fair to the maker, fair to you. No surprises.',
              },
            ].map((v, i) => (
              <FadeUp key={v.title} delay={i * 0.05}>
                <div className="text-left border-t border-cocoa/15 pt-6">
                  <h3 className="font-heading text-2xl text-cocoa mb-3">
                    {v.title}
                  </h3>
                  <p className="text-bark text-sm leading-loose">{v.text}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== GALLERY ===================== */}
      <section id="gallery" className="py-32 px-6 md:px-10 bg-cocoa/5">
        <div className="max-w-7xl mx-auto">
          <FadeUp className="text-center mb-16">
            <p className="text-xs uppercase tracking-widest text-bark mb-4">
              The Space
            </p>
            <h2 className="font-display text-5xl md:text-6xl tracking-wider text-cocoa">
              A Visual Diary
            </h2>
            <p className="font-heading italic text-xl text-bark mt-4">
              Moments from our quiet corner of El Mourouj.
            </p>
          </FadeUp>

          <div className="masonry">
            {galleryImages.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: 0.8,
                  delay: (i % 4) * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                onClick={() => setLightbox(img.src)}
                className="cursor-pointer overflow-hidden group"
              >
                <img
                  src={img.src}
                  alt={`Gallery ${i + 1}`}
                  className={`w-full ${img.h} object-cover transition-opacity duration-700 group-hover:opacity-80`}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-cocoa/95 flex items-center justify-center p-6"
            onClick={() => setLightbox(null)}
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-6 right-6 text-cream hover:text-terracotta transition-colors"
              aria-label="Close"
            >
              <X size={28} strokeWidth={1.25} />
            </button>
            <motion.img
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              src={lightbox}
              alt="Enlarged"
              className="max-w-[90vw] max-h-[85vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <p className="absolute bottom-6 text-cream/60 text-xs uppercase tracking-widest">
              Press ESC to close
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===================== REVIEWS ===================== */}
      <section className="py-32 px-6 md:px-10">
        <div className="max-w-4xl mx-auto">
          <FadeUp className="text-center mb-16">
            <p className="text-xs uppercase tracking-widest text-bark mb-4">
              Kind Words
            </p>
            <h2 className="font-display text-5xl md:text-6xl tracking-wider text-cocoa">
              From Our Guests
            </h2>
          </FadeUp>

          <FadeUp delay={0.1}>
            <Swiper
              modules={[Autoplay, Pagination, EffectFade]}
              effect="fade"
              fadeEffect={{ crossFade: true }}
              autoplay={{ delay: 6000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              loop
              className="pb-16"
            >
              {reviews.map((r) => (
                <SwiperSlide key={r.name}>
                  <div className="text-center px-4 md:px-12">
                    <p className="font-display text-6xl text-terracotta leading-none mb-6">
                      &ldquo;
                    </p>
                    <p className="font-heading italic text-xl md:text-2xl text-cocoa leading-relaxed">
                      {r.text}
                    </p>
                    <p className="mt-10 text-xs uppercase tracking-widest text-bark">
                      &mdash; {r.name}
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </FadeUp>
        </div>
      </section>

      {/* ===================== RESERVATION ===================== */}
      <section
        id="reserve"
        className="py-32 px-6 md:px-10 bg-cocoa text-cream"
      >
        <div className="max-w-3xl mx-auto">
          <FadeUp className="text-center mb-16">
            <p className="text-xs uppercase tracking-widest text-cream/60 mb-4">
              Save A Table
            </p>
            <h2 className="font-display text-5xl md:text-6xl tracking-wider">
              Reserve
            </h2>
            <p className="font-heading italic text-xl text-cream/70 mt-4">
              Weekend brunch fills early &mdash; book ahead.
            </p>
          </FadeUp>

          <FadeUp delay={0.1}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert('Thank you. We will confirm your booking shortly.');
              }}
              className="grid md:grid-cols-2 gap-8"
            >
              <div>
                <label className="block text-xs uppercase tracking-widest text-cream/60 mb-3">
                  Date
                </label>
                <input
                  type="date"
                  required
                  className="w-full bg-transparent border-b border-cream/30 py-3 text-cream focus:border-terracotta focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-cream/60 mb-3">
                  Time
                </label>
                <input
                  type="time"
                  required
                  className="w-full bg-transparent border-b border-cream/30 py-3 text-cream focus:border-terracotta focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-cream/60 mb-3">
                  Guests
                </label>
                <select
                  required
                  className="w-full bg-transparent border-b border-cream/30 py-3 text-cream focus:border-terracotta focus:outline-none transition-colors"
                >
                  <option className="text-cocoa">1 guest</option>
                  <option className="text-cocoa">2 guests</option>
                  <option className="text-cocoa">3 guests</option>
                  <option className="text-cocoa">4 guests</option>
                  <option className="text-cocoa">5 guests</option>
                  <option className="text-cocoa">6+ guests</option>
                </select>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-cream/60 mb-3">
                  Phone
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+216 ..."
                  className="w-full bg-transparent border-b border-cream/30 py-3 text-cream placeholder-cream/30 focus:border-terracotta focus:outline-none transition-colors"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs uppercase tracking-widest text-cream/60 mb-3">
                  Special Requests
                </label>
                <textarea
                  rows={3}
                  placeholder="Birthday, dietary notes, seat by the window..."
                  className="w-full bg-transparent border-b border-cream/30 py-3 text-cream placeholder-cream/30 focus:border-terracotta focus:outline-none transition-colors resize-none"
                />
              </div>
              <div className="md:col-span-2 mt-6">
                <button
                  type="submit"
                  className="w-full md:w-auto px-12 py-4 border border-cream text-cream text-xs uppercase tracking-widest hover:bg-cream hover:text-cocoa transition-colors duration-500"
                >
                  Request Reservation
                </button>
              </div>
            </form>
          </FadeUp>
        </div>
      </section>

      {/* ===================== CONTACT ===================== */}
      <section className="py-32 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <FadeUp className="text-center mb-16">
            <p className="text-xs uppercase tracking-widest text-bark mb-4">
              Find Us
            </p>
            <h2 className="font-display text-5xl md:text-6xl tracking-wider text-cocoa">
              Come Visit
            </h2>
          </FadeUp>

          <div className="grid md:grid-cols-2 gap-12">
            <FadeUp>
              <div className="border border-cocoa/15 aspect-[4/3] overflow-hidden">
                <iframe
                  src="https://www.google.com/maps?q=El+Mourouj+6+Tunisia&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'grayscale(0.4)' }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </FadeUp>

            <FadeUp delay={0.1}>
              <div>
                <h3 className="font-heading text-3xl text-cocoa mb-6">
                  Modern Circle
                </h3>
                <div className="space-y-4 text-bark">
                  <p>
                    <span className="text-xs uppercase tracking-widest block mb-1">
                      Address
                    </span>
                    Av. Martyrs, Résidence Nermine
                    <br />
                    El Mourouj 6, Tunisia
                  </p>
                  <p>
                    <span className="text-xs uppercase tracking-widest block mb-1">
                      Phone
                    </span>
                    +216 29 379 400
                  </p>
                  <p>
                    <span className="text-xs uppercase tracking-widest block mb-1">
                      Hours
                    </span>
                    Monday — Sunday
                    <br />
                    08:00 — 23:00
                  </p>
                </div>

                {/* FAQ */}
                <div className="mt-12 pt-12 border-t border-cocoa/10">
                  <h4 className="font-heading text-2xl text-cocoa mb-6">
                    Good to know
                  </h4>
                  <div className="space-y-3">
                    {faqs.map((f, i) => (
                      <div
                        key={i}
                        className="border-b border-cocoa/10 pb-3"
                      >
                        <button
                          onClick={() =>
                            setOpenFaq(openFaq === i ? null : i)
                          }
                          className="w-full text-left flex items-center justify-between py-2 text-cocoa"
                        >
                          <span className="font-heading text-lg pr-4">
                            {f.q}
                          </span>
                          {openFaq === i ? (
                            <Minus size={16} strokeWidth={1.25} className="flex-shrink-0" />
                          ) : (
                            <Plus size={16} strokeWidth={1.25} className="flex-shrink-0" />
                          )}
                        </button>
                        <AnimatePresence>
                          {openFaq === i && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                              className="overflow-hidden"
                            >
                              <p className="text-bark text-sm leading-loose pb-3 pr-8">
                                {f.a}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>
    </>
  );
}
