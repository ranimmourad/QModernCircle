export default function MenuPage() {
  return (
    <main className="min-h-screen bg-cream pt-28 pb-20 px-6 md:px-10">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-widest text-bark mb-4">Fresh Daily</p>
          <h1 className="font-display text-5xl md:text-6xl tracking-wider text-cocoa mb-4">Brunch Menu</h1>
          <p className="font-heading italic text-xl text-bark mt-4">Small batch, made fresh each morning.</p>
        </div>

        <div className="space-y-16">
          {[
            {
              section: "Mornings",
              items: [
                { name: "Avocado & Poached Egg on Sourdough", price: "22 TND" },
                { name: "Granola, Yogurt & Honey", price: "18 TND" },
                { name: "French Toast, Vanilla & Berries", price: "20 TND" },
                { name: "Shakshuka, Fresh Herbs", price: "24 TND" },
              ],
            },
            {
              section: "Plates",
              items: [
                { name: "Smoked Salmon Bagel", price: "28 TND" },
                { name: "Halloumi Salad, Lemon Dressing", price: "26 TND" },
                { name: "Truffle Mushroom Toast", price: "25 TND" },
                { name: "Chicken Pesto Sandwich", price: "24 TND" },
              ],
            },
            {
              section: "Sweet",
              items: [
                { name: "Carrot Cake", price: "14 TND" },
                { name: "Pistachier", price: "16 TND" },
                { name: "Vanilla Cheesecake", price: "15 TND" },
                { name: "Lemon Tart", price: "14 TND" },
              ],
            },
            {
              section: "Coffee & Tea",
              items: [
                { name: "Espresso", price: "6 TND" },
                { name: "Flat White", price: "8 TND" },
                { name: "Cappuccino", price: "8 TND" },
                { name: "Matcha Latte", price: "12 TND" },
                { name: "House Tea Selection", price: "7 TND" },
              ],
            },
          ].map((section) => (
            <div key={section.section}>
              <h3 className="font-display text-3xl tracking-widest text-terracotta mb-8 text-center">
                — {section.section} —
              </h3>
              <ul className="space-y-6 max-w-2xl mx-auto">
                {section.items.map((item) => (
                  <li key={item.name} className="flex items-baseline border-b border-cocoa/10 pb-4">
                    <span className="font-heading text-lg text-cocoa flex-1">{item.name}</span>
                    <span className="font-heading text-lg text-terracotta ml-4">{item.price}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
