import { useEffect, useState } from "react";
import { fetchCurrentUser } from "../lib/clientAuth";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetchCurrentUser().then((u) => setUser(u));
  }, []);

  if (!user)
    return <div className="container py-8">You are not logged in.</div>;

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <div className="bg-white p-4 border rounded max-w-md">
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Role:</strong> {user.role}
        </p>
      </div>
    </div>
  );
}
