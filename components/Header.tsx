import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchCurrentUser, clearToken } from "../lib/clientAuth";

export default function Header() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    let mounted = true;
    fetchCurrentUser().then((u) => {
      if (mounted) setUser(u);
    });
    return () => {
      mounted = false;
    };
  }, []);

  const logout = () => {
    clearToken();
    setUser(null);
    // full reload to reset client state
    window.location.href = "/";
  };

  return (
    <header className="py-6 border-b">
      <div className="container flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          ALX Listings
        </Link>
        <nav className="space-x-4">
          <Link href="/">Home</Link>
          {!user && (
            <>
              <Link href="/register">Register</Link>
              <Link href="/login">Login</Link>
            </>
          )}
          {user && (
            <>
              <Link href="/profile">{user.name}</Link>
              <button onClick={logout} className="ml-2">
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
