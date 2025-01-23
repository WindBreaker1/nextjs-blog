import db from '@/app/lib/db.js';

export async function GET(req, res) {
  const [results] = await db.query('SELECT * FROM users');
  return new Response(JSON.stringify(results));
}

export async function POST(req, res) {
  const { id, name, email } = await req.json();
  const [results] = await db.query('INSERT INTO users (id, name, email) VALUES (?, ?, ?)',[id, name, email]);
  return new Response(JSON.stringify(results));
}


