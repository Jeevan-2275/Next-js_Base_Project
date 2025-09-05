"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useState } from "react";
import Image from "next/image";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/products")
      .then(res => res.json())
      .then(setProducts);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Products</h1>
      <ul className="grid grid-cols-2 gap-4">
        {products.map((p) => (
          <li key={p.id} className="bg-white shadow rounded p-4">
            <h2 className="font-semibold">{p.title}</h2>
            <p>${p.price}</p>
            <img src={p.image} alt={p.title} width="100" height="100" />

          </li>
        ))}
      </ul>
    </div>
  );
}
