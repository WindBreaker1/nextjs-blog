import db from "@/app/api/lib/db";

export async function GET(req, { params }) {
  const { author, slug } = params;

  const [rows] = await db.query(
    "SELECT * FROM posts WHERE author = ? AND slug = ? LIMIT 1",
    [author, slug]
  );

  const post = rows[0];

  if (!post) {
    return new Response(JSON.stringify({ error: "Post not found" }), { status: 404 });
  }

  return new Response(JSON.stringify(post), { status: 200 });
}
