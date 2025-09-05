"use client";
import { useEffect, useState } from "react";

export default function UsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/api/users")
      .then(res => res.json())
      .then(setUsers);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Users</h1>
      <ul className="space-y-4">
        {users.map(u => (
          <li key={u.id} className="bg-white shadow p-4 rounded">
            <p><b>{u.name.firstname} {u.name.lastname}</b></p>
            <p>Email: {u.email}</p>
            <p>Username: {u.username}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
