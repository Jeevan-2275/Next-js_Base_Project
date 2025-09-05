// app/ssr-posts/page.js
export default async function SSRPostsPage() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    cache: "no-store", // disable caching → always fresh
  });
  const posts = await res.json();

  return (
    <main className="p-6">
      <h1 className="text-xl font-bold mb-4">SSR Example (App Router)</h1>
      <ul className="space-y-2">
        {posts.slice(0, 5).map((p) => (
          <li key={p.id}>{p.title}</li>
        ))}
      </ul>
    </main>
  );
}
