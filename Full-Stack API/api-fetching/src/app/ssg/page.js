export const revalidate = false; // build-time only, no re-fetch

async function getData() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    cache: "force-cache", // ✅ ensures static build
  });
  return res.json();
}

export default async function SSGPage() {
  const data = await getData();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Static Site Generation (SSG)</h1>
      <div className="space-y-4">
        {data.slice(0, 5).map(post => (
          <div key={post.id} className="bg-white shadow p-4 rounded">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
