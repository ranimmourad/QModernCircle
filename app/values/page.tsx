import {
  Laptop,
  Minimize2,
  Footprints,
  DoorOpen,
  Hand,
  BadgeDollarSign,
} from 'lucide-react';

const values = [
  {
    icon: Laptop,
    title: "Local First",
    text: "We source from Tunisian farms, roasters and artisans whose work we know by name.",
  },
  {
    icon: Minimize2,
    title: "Less, Better",
    text: "A short menu of considered things, made well, served slowly. Nothing wasted.",
  },
  {
    icon: Footprints,
    title: "Soft Footprint",
    text: "Compostable take-away, ceramic on the table, refillable everywhere we can.",
  },
  {
    icon: DoorOpen,
    title: "Open Doors",
    text: "A welcoming space for working alone, gathering quietly, or simply pausing.",
  },
  {
    icon: Hand,
    title: "Slow Hands",
    text: "Every cake, every loaf, every plate is made in-house each morning.",
  },
  {
    icon: BadgeDollarSign,
    title: "Honest Pricing",
    text: "Fair to the maker, fair to you. No surprises.",
  },
];

export default function ValuesPage() {
  return (
    <main className="min-h-screen bg-cream py-32 px-6 md:px-10">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-20">
          <p className="text-xs uppercase tracking-widest text-bark mb-4">What We Believe</p>
          <h1 className="font-display text-5xl md:text-6xl tracking-wider text-cocoa mb-4">Our Values</h1>
          <p className="font-heading italic text-xl text-bark mt-4">Handmade, heartmade.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-20">
          {values.map((v) => (
            <div
              key={v.title}
              className="border-t border-cocoa/15 pt-8"
            >
              <v.icon size={32} strokeWidth={1} className="text-terracotta mb-4" />
              <h3 className="font-heading text-2xl text-cocoa mb-3">{v.title}</h3>
              <p className="text-bark text-sm leading-loose">{v.text}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}