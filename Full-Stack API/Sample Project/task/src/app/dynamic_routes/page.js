// app/products/[id]/page.js
import { Suspense } from "react";
import React from "react";

// Client reviews widget (CSR)
function Reviews({ productId }) {
  "use client";
  const [items, setItems] = React.useState([]);
  React.useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${productId}/reviews`)
      .then(async (r) => {
        try {
          return await r.json();
        } catch {
          return []; // fallback if no JSON
        }
      })
      .then(setItems)
      .catch(() => setItems([]));
  }, [productId]);
  return (
    <section>
      <h3 className="font-semibold mt-6 mb-2">Reviews</h3>
      {items.length ? (
        items.map((r, i) => <p key={i}>{r.comment || "No comment"} </p>)
      ) : (
        <p>No reviews found</p>
      )}
    </section>
  );
}

export default async function ProductPage({ params }) {
  // ISR for product details
  const res = await fetch(`https://fakestoreapi.com/products/${params.id}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    // Fail gracefully
    return (
      <main className="p-6">
        <h1 className="text-2xl font-bold">Product not found</h1>
      </main>
    );
  }

  let product;
  try {
    product = await res.json();
  } catch {
    product = null;
  }

  if (!product) {
    return (
      <main className="p-6">
        <h1 className="text-2xl font-bold">Invalid product data</h1>
      </main>
    );
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">{product.title}</h1>
      <p className="mt-2">{product.description}</p>
      <Suspense fallback={<p>Loading reviews…</p>}>
        <Reviews productId={params.id} />
      </Suspense>
    </main>
  );
}

// Pre-generate a subset (SSG); similar spirit to getStaticPaths
export async function generateStaticParams() {
  const res = await fetch("https://fakestoreapi.com/products");
  const products = await res.json();
  return products.slice(0, 20).map((p) => ({ id: String(p.id) }));
}
