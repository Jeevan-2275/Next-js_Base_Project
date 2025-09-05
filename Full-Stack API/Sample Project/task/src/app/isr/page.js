// app/blogs/page.js
export default async function BlogsPage() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    next: { revalidate: 30 }, // regenerate at most every 30s
  });
  const posts = await res.json();

  return (
    <main className="p-6">
      <h1 className="text-xl font-bold mb-2">ISR Example (App Router)</h1>
      <p className="text-sm text-gray-600">Revalidates every 30 seconds</p>
      <ul className="space-y-2 mt-4">
        {posts.slice(0, 5).map((p) => (
          <li key={p.id}>{p.title}</li>
        ))}
      </ul>
    </main>
  );
}
