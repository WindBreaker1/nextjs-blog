import db from "@/app/api/lib/db";
import { verifyToken } from "@/app/api/middleware/auth";

export async function GET(req, { params }) {
  const { author, slug } = await params;

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

export async function DELETE(req, { params }) {
  const { author, slug } = await params;

  // Authenticate user
  const user = verifyToken(req);
  if (!user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  // Check if the post exists and belongs to the user
  const [posts] = await db.query(
    `SELECT * FROM posts WHERE author = ? AND slug = ? LIMIT 1`,
    [author, slug]
  );

  if (posts.length === 0) {
    return new Response(JSON.stringify({ error: "Post not found" }), { status: 404 });
  }

  const post = posts[0];

  if (post.author !== user.username) {
    return new Response(JSON.stringify({ error: "You can only delete your own posts" }), { status: 403 });
  }

  // Delete the post
  await db.query(`DELETE FROM posts WHERE author = ? AND slug = ?`, [author, slug]);

  return new Response(JSON.stringify({ success: "Post deleted" }), { status: 200 });
}