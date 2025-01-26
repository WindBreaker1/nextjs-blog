import db from '@/app/lib/db.js';
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config({ path: ".env.local"});

const JWT_SECRET = process.env.MY_JWT_SECRET;

export async function GET(req, res) {
  const [results] = await db.query('SELECT * FROM users');
  return new Response(JSON.stringify(results));
}

export async function POST(req, res) {
  const { id, name, email } = await req.json();
  const [results] = await db.query('INSERT INTO users (id, name, email) VALUES (?, ?, ?)',[id, name, email]);
  return new Response(JSON.stringify(results));
}

export async function PUT(req) {
  const token = req.headers.authorization?.split(" ")[1];

  const decoded = jwt.verify(token, JWT_SECRET);
  const userId = decoded.userId;
  const { field, value } = await req.json();

  if (!["username", "description", "profile_picture"].includes(field)) {
    return new Response(JSON.stringify({ error: "Invalid field" }), { status: 400 });
  }
  if (!value || value.trim() === "") {
    return new Response(JSON.stringify({ error: "Invalid value" }), { status: 400 });
  }

  // Update the user in the database
  await db.query(`UPDATE users SET ${field} = ? WHERE id = ?`, [value, userId]);

  return new Response(JSON.stringify({ success: true, field, value }), { status: 200 });

}

