export async function GET() {
  const res = await fetch("https://fakestoreapi.com/carts");
  const data = await res.json();

  return Response.json(data);
}
