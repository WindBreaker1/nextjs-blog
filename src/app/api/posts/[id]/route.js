import db from "@/app/lib/db";

export async function GET(req, {params}) {
  const { id } =await params;
  const [rows] = await db.query('SELECT * FROM posts WHERE id = ?', [id]);
  const post = rows[0];
  return new Response(JSON.stringify(post), { status: 200 });
}

export async function PUT(req, {params}) {
  const { id } = params;
  const { title, slug, content } = await req.json();
  const [results] = await db.query('UPDATE posts SET title = ?, slug = ?, content = ? WHERE id = ?', [title, slug, content, id]);
  return new Response(JSON.stringify(results));
}

export async function DELETE(req, {params}) {
  const { id } = params;
  const [results] = await db.query('DELETE FROM posts WHERE id = ?', [id]);
  return new Response(JSON.stringify(results))
}