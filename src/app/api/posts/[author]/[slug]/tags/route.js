import db from '@/app/api/lib/db';

export async function GET(req, { params }) {
  const { author, slug } = await params;

  try {
    const [tags] = await db.query(
      `SELECT t.name FROM tags t
       JOIN post_tags pt ON t.id = pt.tag_id
       JOIN posts p ON pt.post_id = p.id
       WHERE p.author = ? AND p.slug = ?`,
      [author, slug]
    );

    return new Response(JSON.stringify(tags), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}
