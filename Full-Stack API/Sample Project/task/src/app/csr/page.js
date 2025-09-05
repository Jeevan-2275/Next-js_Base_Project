// app/csr-posts/page.js
"use client";

import { useEffect, useState } from "react";

export default function CSRPostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      const data = await res.json();
      setPosts(data.slice(0, 10));
      setLoading(false);
    }
    load();
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-xl font-bold mb-4">CSR Example (App Router)</h1>
      {loading ? (
        <p>Loading…</p>
      ) : (
        <ul className="space-y-2">
          {posts.map((p) => (
            <li key={p.id}>{p.title}</li>
          ))}
        </ul>
      )}
    </main>
  );
}
