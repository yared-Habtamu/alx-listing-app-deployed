import { useState } from "react";
import { useRouter } from "next/router";

export default function NewListingPage() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(100);
  const router = useRouter();

  const submit = async (e: any) => {
    e.preventDefault();
    const res = await fetch("/api/listings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, price }),
    });
    if (res.ok) router.push("/host/dashboard");
    else alert("Failed");
  };

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-4">Create Listing</h1>
      <form onSubmit={submit} className="max-w-md">
        <label className="block mb-2">
          Title{" "}
          <input
            name="title"
            className="w-full border p-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label className="block mb-4">
          Price{" "}
          <input
            name="price"
            type="number"
            className="w-full border p-2"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </label>
        <button className="px-4 py-2 bg-green-600 text-white rounded">
          Create
        </button>
      </form>
    </div>
  );
}
