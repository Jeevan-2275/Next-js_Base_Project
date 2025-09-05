export const revalidate = 10; // Regenerate every 10 seconds

async function getData() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  return res.json();
}

export default async function ISRPage() {
  const data = await getData();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Incremental Static Regeneration (ISR)</h1>
      <div className="space-y-4">
        {data.slice(0, 5).map(post => (
          <div key={post.id} className="bg-white shadow p-4 rounded">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
      <p className="text-sm text-gray-500 mt-4">
        (This page regenerates every 10 seconds on the server.)
      </p>
    </div>
  );
}
