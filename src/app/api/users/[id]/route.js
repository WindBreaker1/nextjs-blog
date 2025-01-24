import db from "@/app/lib/db";

export async function PUT(req, {params}) {
  const { id } = await params;
  const { name, email } = await req.json();
  const [results] = await db.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, id]);
  return new Response(JSON.stringify(results));
}

export async function DELETE(req, {params}) {
  const { id } = await params;
  const [results] = await db.query('DELETE FROM users WHERE id = ?', [id]);
  return new Response(JSON.stringify(results));
}