import { useRouter } from "next/router";
import Header from "../../components/Header";

export default function PropertyPage() {
  const router = useRouter();
  const { id } = router.query;

  const handleBook = async () => {
    const res = await fetch("/api/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ propertyId: id }),
    });
    const data = await res.json();
    alert(JSON.stringify(data));
  };

  return (
    <div>
      <Header />
      <main className="container py-8">
        <h1 className="text-2xl font-bold mb-4">Property {id}</h1>
        <p className="mb-6">
          Example property detail. Booking is simulated via /api/book.
        </p>
        <button
          onClick={handleBook}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Book
        </button>
      </main>
    </div>
  );
}
