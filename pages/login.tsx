import { useState } from "react";
import { saveToken } from "../lib/clientAuth";
import { useRouter } from "next/router";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const submit = async (e: any) => {
    e.preventDefault();
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (res.ok && data.token) {
      saveToken(data.token);
      router.push("/profile");
    } else {
      alert(data.error || "Login failed");
    }
  };

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={submit} className="max-w-md">
        <label className="block mb-2">
          Email{" "}
          <input
            name="email"
            placeholder="Email"
            className="w-full border p-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="block mb-4">
          Password{" "}
          <input
            name="password"
            placeholder="Password"
            type="password"
            className="w-full border p-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button className="px-4 py-2 bg-blue-600 text-white rounded">
          Sign in
        </button>
      </form>
    </div>
  );
}
