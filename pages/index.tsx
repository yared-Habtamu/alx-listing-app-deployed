import Header from "../components/Header";
import Link from "next/link";

const sampleListings = [
  {
    id: "1",
    title: "Cozy apartment in city center",
    price: 80,
    img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
  },
  {
    id: "2",
    title: "Modern loft near park",
    price: 120,
    img: "https://images.unsplash.com/photo-1505691723518-36a6b40819e2",
  },
];

export default function Home() {
  return (
    <div>
      <Header />
      <main className="container py-8">
        <h1 className="text-3xl font-bold mb-6">Listings</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sampleListings.map((l) => (
            <Link
              key={l.id}
              href={`/properties/${l.id}`}
              className="block border rounded-lg overflow-hidden"
            >
              <img src={l.img} alt="" className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="font-semibold">{l.title}</h2>
                <p className="text-sm text-gray-600">${l.price} / night</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
