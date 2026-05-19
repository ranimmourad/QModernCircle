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
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Wifi, Leaf, Coffee, Heart, Minus, Plus } from 'lucide-react';
import Image from 'next/image';

// ---------- DATA ----------
const drinks = [
  { name: "Espresso", desc: "Single origin, slow extraction.", price: "6 TND", img: "/lattes.jpg" },
  { name: "Chocolat Chaud", desc: "Rich hot chocolate, Belgian cocoa.", price: "9 TND", img: "/chocolatchaud.jpg" },
  { name: "Iced Tea", desc: "House-made iced tea, fresh mint.", price: "7 TND", img: "/icedtea.jpg" },
  { name: "Flat White", desc: "Velvety milk, double ristretto.", price: "8 TND", img: "/lattes.jpg" },
  { name: "Granola Bowl", desc: "Yogurt, honey, seasonal fruit.", price: "18 TND", img: "/bol.jpg" },
  { name: "Granola", desc: "House-made granola, golden & crunchy.", price: "12 TND", img: "/granola.jpg" },
  { name: "Carrot Cake", desc: "Spiced, cream cheese frosting.", price: "14 TND", img: "/carrotcake.jpg" },
  { name: "Carrot Cake Mini", desc: "Individual portion, spiced & moist.", price: "10 TND", img: "/carrotcake1.jpg" },
  { name: "Pistachier", desc: "Roasted pistachio, soft sponge.", price: "16 TND", img: "/gateaupistache.jpg" },
  { name: "Pistache", desc: "Pistachio cream, delicate layers.", price: "15 TND", img: "/pistache.jpg" },
  { name: "Cheesecake", desc: "Vanilla bean, biscuit crumble.", price: "15 TND", img: "/cheesecake.jpg" },
  { name: "Cheesecake Fruits", desc: "Fresh berries on vanilla cheesecake.", price: "17 TND", img: "/cheesecake2.jpg" },
  { name: "Gateau Fraisé", desc: "Fresh strawberry cream cake.", price: "16 TND", img: "/gateaufraise.jpg" },
  { name: "Gateau Citron", desc: "Lemon curd, light sponge.", price: "14 TND", img: "/gateaucitron.jpg" },
  { name: "Gateau Berry", desc: "Mixed berries, whipped cream.", price: "16 TND", img: "/gateauberry.jpg" },
  { name: "Gateau Chocolat", desc: "Dark chocolate, ganache.", price: "15 TND", img: "/gateau.jpg" },
  { name: "Gateau Noisette", desc: "Hazelnut praline, chocolate layers.", price: "16 TND", img: "/gateau1.jpg" },
  { name: "Gateau Café", desc: "Coffee-infused, mocha cream.", price: "15 TND", img: "/gateau3.jpg" },
  { name: "Zgougou", desc: "Traditional pine nut dessert.", price: "13 TND", img: "/zgougou.jpg" },
  { name: "Bouza", desc: "Traditional Tunisian dessert.", price: "12 TND", img: "/bouza.jpg" },
];

const reviews = [
  { text: "Une expérience exceptionnelle au Modern Circle ! Le lieu est magnifiquement décoré, lumineux, apaisant — un vrai havre de paix en plein El Mourouj. Les détails comptent ici : la vaisselle, la musique, le service attentionné.", name: "Yassine H" },
  { text: "J'aime beaucoup cet endroit qui est propice au travail. L'ambiance est détendue, le wifi est solide, et le café est excellent. C'est devenu mon bureau préféré.", name: "Lina Aouadi" },
  { text: "Un endroit superbe pour un brunch ou petit déjeuner ! Le cadre est vraiment magnifique, les plats faits maison sont délicieux, et l'équipe est adorable. Je recommande sans hésiter.", name: "Khadidja Djeb" },
];

const faqs = [
  { q: "Is Modern Circle really non-smoking?", a: "Yes — entirely. The space is fully non-smoking, indoors and on the terrace, to keep the air clean and the atmosphere calm." },
  { q: "Can I work from here for a few hours?", a: "Absolutely. Strong WiFi, plenty of outlets, comfortable seating, and a soft soundtrack. We just ask that you order from time to time so we can keep the lights on." },
  { q: "Do you take reservations?", a: "Yes — for groups of 4 or more, especially for weekend brunch, we recommend booking in advance through the form above." },
  { q: "Is the concept store open the same hours?", a: "Yes. The boutique is open whenever the café is — from 08:00 until 23:00, every day of the week." },
];

// ---------- COUNTER ----------
function AnimatedCounter({ to, suffix = "", duration = 2 }: { to: number; suffix?: string; duration?: number; }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
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

  return <span ref={ref}>{value}{suffix}</span>;
}

// ---------- FADE-UP WRAPPER ----------
function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string; }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
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
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      {/* ========== HERO ========== */}
      <section ref={heroRef} className="relative w-full min-h-[100dvh] h-screen overflow-hidden bg-[#3E2723]">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/hero.jpg')" }} />
              </motion.div>
      </section>

      {/* ========== ABOUT ========== */}
      <section id="about" className="py-32 px-6 md:px-10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 md:gap-24 items-center">
          <FadeUp>
            <div className="relative h-[500px] md:h-[600px] overflow-hidden">
              <div className="w-full h-full bg-cover" style={{ backgroundImage: "url('/facade.jpg')", backgroundPosition: "left center" }} />
            </div>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p className="text-xs uppercase tracking-widest text-bark mb-6">Our Story</p>
            <h2 className="font-display text-5xl md:text-6xl tracking-wider leading-tight text-cocoa">
              A quieter<br />way to gather.
            </h2>
            <p className="font-heading italic text-2xl text-bark mt-6">Coffee, craft, and conversation — without the noise.</p>
            <p className="mt-8 text-bark leading-loose">
              Modern Circle began as a small idea: a calm, non-smoking space in El Mourouj where mornings feel unhurried, work feels possible, and every object on the shelf has been chosen with care. Six years on, it remains exactly that — a sanctuary for slow days and handmade things.
            </p>

            <div className="grid grid-cols-3 gap-6 mt-12 pt-12 border-t border-cocoa/10">
              <div>
                <p className="font-display text-4xl md:text-5xl text-cocoa"><AnimatedCounter to={6} suffix="+" /></p>
                <p className="text-xs uppercase tracking-widest text-bark mt-2">Years Open</p>
              </div>
              <div>
                <p className="font-display text-4xl md:text-5xl text-cocoa"><AnimatedCounter to={32} /></p>
                <p className="text-xs uppercase tracking-widest text-bark mt-2">Artisans</p>
              </div>
              <div>
                <p className="font-display text-4xl md:text-5xl text-cocoa"><AnimatedCounter to={100} suffix="%" /></p>
                <p className="text-xs uppercase tracking-widest text-bark mt-2">Handmade</p>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ========== FEATURED DRINKS & DESSERTS ========== */}
      <section className="py-32 px-6 md:px-10 bg-cream">
        <div className="max-w-7xl mx-auto">
          <FadeUp className="text-center mb-20">
            <p className="text-xs uppercase tracking-widest text-bark mb-4">Our Menu</p>
            <h2 className="font-display text-5xl md:text-6xl tracking-wider text-cocoa">Drinks & Desserts</h2>
            <p className="font-heading italic text-xl text-bark mt-4">Small batch, made fresh each morning.</p>
          </FadeUp>

          <FadeUp delay={0.1}>
            <Swiper
              modules={[Autoplay, Pagination, Navigation]}
              slidesPerView={1.2}
              spaceBetween={24}
              centeredSlides={false}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              navigation={true}
              breakpoints={{ 640: { slidesPerView: 2.2, spaceBetween: 24 }, 1024: { slidesPerView: 3.2, spaceBetween: 32 } }}
              className="pb-16"
            >
              {drinks.map((d) => (
                <SwiperSlide key={d.name}>
                  <div className="group">
                    <div className="aspect-[4/5] overflow-hidden mb-5 bg-cocoa/10">
                      <Image src={d.img} alt={d.name} width={800} height={1000} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.02]" />
                    </div>
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-heading text-2xl text-cocoa">{d.name}</h3>
                      <span className="font-heading text-lg text-terracotta">{d.price}</span>
                    </div>
                    <p className="text-sm text-bark mt-1 italic-accent">{d.desc}</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </FadeUp>
        </div>
      </section>

      {/* ========== WORK-FRIENDLY PARALLAX ========== */}
      <section className="relative h-[70vh] overflow-hidden bg-[#3E2723]">
        <div className="parallax-bg absolute inset-0" style={{ backgroundImage: "url('/workspace.jpg')" }} />
            <div className="relative z-10 h-full flex items-center justify-center px-6">
          <FadeUp className="text-center max-w-3xl">
            <p className="text-xs uppercase tracking-widest text-cream/70 mb-6">A Space For Quiet Work</p>
            <h2 className="font-display text-5xl md:text-7xl tracking-wider text-cream leading-tight">
              Bring your laptop.<br />
              <span className="italic-accent text-terracotta">Stay a while.</span>
            </h2>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 mt-14 text-cream/90">
              <div className="flex flex-col items-center"><Wifi size={28} strokeWidth={1.25} /><span className="mt-3 text-xs uppercase tracking-widest">Strong WiFi</span></div>
              <div className="flex flex-col items-center"><Leaf size={28} strokeWidth={1.25} /><span className="mt-3 text-xs uppercase tracking-widest">Non-Smoking</span></div>
              <div className="flex flex-col items-center"><Coffee size={28} strokeWidth={1.25} /><span className="mt-3 text-xs uppercase tracking-widest">Bottomless Coffee</span></div>
              <div className="flex flex-col items-center"><Heart size={28} strokeWidth={1.25} /><span className="mt-3 text-xs uppercase tracking-widest">Soft Music</span></div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ========== REVIEWS ========== */}
      <section className="py-32 px-6 md:px-10 bg-cream">
        <div className="max-w-4xl mx-auto">
          <FadeUp className="text-center mb-16">
            <p className="text-xs uppercase tracking-widest text-bark mb-4">Kind Words</p>
            <h2 className="font-display text-5xl md:text-6xl tracking-wider text-cocoa">From Our Guests</h2>
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
                    <p className="font-display text-6xl text-terracotta leading-none mb-6">"</p>
                    <p className="font-heading italic text-xl md:text-2xl text-cocoa leading-relaxed">{r.text}</p>
                    <p className="mt-10 text-xs uppercase tracking-widest text-bark">— {r.name}</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </FadeUp>
        </div>
      </section>

      {/* ========== RESERVATION ========== */}
      <section id="reserve" className="py-32 px-6 md:px-10 bg-[#3E2723] text-cream">
        <div className="max-w-3xl mx-auto">
          <FadeUp className="text-center mb-16">
            <p className="text-xs uppercase tracking-widest text-cream/60 mb-4">Save A Table</p>
            <h2 className="font-display text-5xl md:text-6xl tracking-wider">Reserve</h2>
            <p className="font-heading italic text-xl text-cream/70 mt-4">Weekend brunch fills early — book ahead.</p>
          </FadeUp>

          <FadeUp delay={0.1}>
            <form onSubmit={(e) => { e.preventDefault(); alert("Thank you. We will confirm your booking shortly."); }} className="grid md:grid-cols-2 gap-8">
              <div>
                <label className="block text-xs uppercase tracking-widest text-cream/60 mb-3">Date</label>
                <input type="date" required className="w-full bg-transparent border-b border-cream/30 py-3 text-cream focus:border-terracotta focus:outline-none transition-colors" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-cream/60 mb-3">Time</label>
                <input type="time" required className="w-full bg-transparent border-b border-cream/30 py-3 text-cream focus:border-terracotta focus:outline-none transition-colors" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-cream/60 mb-3">Guests</label>
                <select required className="w-full bg-transparent border-b border-cream/30 py-3 text-cream focus:border-terracotta focus:outline-none transition-colors">
                  <option className="text-[#3E2723]">1 guest</option>
                  <option className="text-[#3E2723]">2 guests</option>
                  <option className="text-[#3E2723]">3 guests</option>
                  <option className="text-[#3E2723]">4 guests</option>
                  <option className="text-[#3E2723]">5 guests</option>
                  <option className="text-[#3E2723]">6+ guests</option>
                </select>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-cream/60 mb-3">Phone</label>
                <input type="tel" required placeholder="+216 ..." className="w-full bg-transparent border-b border-cream/30 py-3 text-cream placeholder-cream/30 focus:border-terracotta focus:outline-none transition-colors" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs uppercase tracking-widest text-cream/60 mb-3">Special Requests</label>
                <textarea rows={3} placeholder="Birthday, dietary notes, seat by the window..." className="w-full bg-transparent border-b border-cream/30 py-3 text-cream placeholder-cream/30 focus:border-terracotta focus:outline-none transition-colors resize-none" />
              </div>
              <div className="md:col-span-2 mt-6">
                <button type="submit" className="w-full md:w-auto px-12 py-4 border border-cream text-cream text-xs uppercase tracking-widest hover:bg-cream hover:text-cocoa transition-colors duration-500">
                  Request Reservation
                </button>
              </div>
            </form>
          </FadeUp>
        </div>
      </section>

      {/* ========== CONTACT & FAQ ========== */}
      <section className="py-32 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <FadeUp className="text-center mb-16">
            <p className="text-xs uppercase tracking-widest text-bark mb-4">Find Us</p>
            <h2 className="font-display text-5xl md:text-6xl tracking-wider text-cocoa">Come Visit</h2>
          </FadeUp>

          <div className="grid md:grid-cols-2 gap-12">
            <FadeUp>
              <div className="border border-cocoa/15 aspect-[4/3] overflow-hidden">
                <iframe
                  src="https://www.google.com/maps?q=El+Mourouj+6+Tunisia&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "grayscale(0.4)" }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </FadeUp>

            <FadeUp delay={0.1}>
              <div>
                <h3 className="font-heading text-3xl text-cocoa mb-6">Modern Circle</h3>
                <div className="space-y-4 text-bark">
                  <p>
                    <span className="text-xs uppercase tracking-widest block mb-1">Address</span>
                    Av. Martyrs, Résidence Nermine<br />El Mourouj 6, Tunisia
                  </p>
                  <p>
                    <span className="text-xs uppercase tracking-widest block mb-1">Phone</span>
                    +216 29 379 400
                  </p>
                  <p>
                    <span className="text-xs uppercase tracking-widest block mb-1">Hours</span>
                    Monday — Sunday<br />08:00 — 23:00
                  </p>
                </div>

                <div className="mt-12 pt-12 border-t border-cocoa/10">
                  <h4 className="font-heading text-2xl text-cocoa mb-6">Good to know</h4>
                  <div className="space-y-3">
                    {faqs.map((f, i) => (
                      <div key={i} className="border-b border-cocoa/10 pb-3">
                        <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full text-left flex items-center justify-between py-2 text-cocoa">
                          <span className="font-heading text-lg pr-4">{f.q}</span>
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
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                              className="overflow-hidden"
                            >
                              <p className="text-bark text-sm leading-loose pb-3 pr-8">{f.a}</p>
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