import db from '@/app/api/lib/db.js';

export async function GET(req, {params}) {
  const { id } = await params;
  const [tags] = await db.query(
    `
    SELECT t.name 
    FROM tags t
    JOIN post_tags pt ON t.id = pt.tag_id
    WHERE pt.post_id = ?
    `,
    [id] // Parameterized query to avoid SQL injection
  );
  return new Response(JSON.stringify(tags));
}
