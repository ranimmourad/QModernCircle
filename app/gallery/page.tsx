import Image from 'next/image';

const galleryImages = [
  "/corner4.jpg",
  "/corner5.jpg",
  "/corner3.jpg",
  "/corner6.jpg",
  "/corner1.jpg",
  "/corner2.jpg",
  "/daizy.jpg",
  "/flowers.jpg",
  "/flowers1.jpg",
  "/facade1.jpg",
];

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-cream py-24 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-widest text-bark mb-4">The Space</p>
          <h1 className="font-display text-5xl md:text-6xl tracking-wider text-cocoa mb-4">A Visual Diary</h1>
          <p className="font-heading italic text-xl text-bark mt-2">Moments from our quiet corner of El Mourouj.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages.map((src, i) => (
            <div key={i} className="group cursor-pointer overflow-hidden rounded-sm">
              <Image
                src={src}
                alt={`Gallery ${i + 1}`}
                width={800}
                height={800}
                className="w-full aspect-square object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}