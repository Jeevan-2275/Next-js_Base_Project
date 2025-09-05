export async function DELETE(req, { params }) {
  const { id } = params;
  const res = await fetch(`https://fakestoreapi.com/carts/${id}`, {
    method: "DELETE",
  });
  const data = await res.json();

  return Response.json({ message: "Cart deleted", data });
}
