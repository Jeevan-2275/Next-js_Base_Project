"use client";
import { useEffect, useState } from "react";

export default function CartsPage() {
  const [carts, setCarts] = useState([]);

  useEffect(() => {
    fetch("/api/carts")
      .then(res => res.json())
      .then(setCarts);
  }, []);

  const deleteCart = async (id) => {
    await fetch(`/api/carts/${id}`, { method: "DELETE" });
    setCarts(carts.filter(c => c.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Carts</h1>
      {carts.map(c => (
        <div key={c.id} className="bg-white shadow p-4 mb-4 rounded">
          <p><b>Cart ID:</b> {c.id}</p>
          <p><b>User ID:</b> {c.userId}</p>
          <button
            onClick={() => deleteCart(c.id)}
            className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete Cart
          </button>
        </div>
      ))}
    </div>
  );
}
