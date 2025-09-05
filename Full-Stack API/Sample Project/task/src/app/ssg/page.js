// app/posts/page.js
export default async function PostsPage() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();

  return (
    <main className="p-6">
      <h1 className="text-xl font-bold mb-4">SSG Example (App Router)</h1>
      <ul className="space-y-2">
        {posts.slice(0, 10).map((p) => (
          <li key={p.id}>{p.title}</li>
        ))}
      </ul>
    </main>
  );
}
