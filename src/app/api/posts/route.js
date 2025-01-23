import db from '@/app/lib/db.js';

export async function GET(req, res) {
  const [results] = await db.query('SELECT * FROM posts');
  return new Response(JSON.stringify(results));
}

export async function POST(req, res) {
  const { title, slug, content } = await req.json();
  const [results] = await db.query('INSERT INTO posts (title, slug, content) VALUES (?, ?, ?)', [title, slug, content]);
  return new Response(JSON.stringify(JSON.stringify(results)));
}
