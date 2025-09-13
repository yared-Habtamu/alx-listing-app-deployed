import { useEffect, useState } from "react";

export default function HostDashboard() {
  const [listings, setListings] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/listings")
      .then((r) => r.json())
      .then(setListings);
  }, []);

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-4">Host Dashboard</h1>
      <p className="mb-4">Manage your listings</p>
      <div className="grid gap-4">
        {listings.map((l) => (
          <div key={l._id} className="border p-4 rounded">
            <h2 className="font-semibold">{l.title}</h2>
            <p>${l.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
