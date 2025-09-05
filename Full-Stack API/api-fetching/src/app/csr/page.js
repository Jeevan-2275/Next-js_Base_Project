"use client";

import { useEffect, useState } from "react";

export default function CSRPage() {
  const [data, setData] = useState([]); // ✅ no types in JS

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(res => res.json())
      .then(json => setData(json.slice(0, 5))); // show only 5 posts
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Client-Side Rendering (CSR)</h1>
      {data.length > 0 ? (
        <div className="space-y-4">
          {data.map(post => (
            <div key={post.id} className="bg-white shadow p-4 rounded">
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p>{post.body}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading data on client...</p>
      )}
    </div>
  );
}
