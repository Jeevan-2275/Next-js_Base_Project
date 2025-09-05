export async function GET(req, { params }) {
  const { id } = params;
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  const data = await res.json();

  return Response.json(data);
}
