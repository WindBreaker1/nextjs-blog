import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import db from '@/app/api/lib/db'
import { NextResponse } from 'next/server';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const JWT_SECRET = process.env.MY_JWT_SECRET;

export async function POST(req) {
  const response = new NextResponse();
  response.headers.set('Access-Control-Allow-Origin', 'http://localhost:3000');  // Frontend URL
  response.headers.set('Access-Control-Allow-Credentials', 'true'); // Allow cookies

  const { username, password } = await req.json();

  if (!username) {
    return new Response(JSON.stringify({ error: "Username is required." }), { status: 400 });
  }
  if (!password) {
    return new Response(JSON.stringify({ error: "Password is required." }), { status: 400 });
  }

  const [users] = await db.query('SELECT * FROM users WHERE username = ?', [username]);

  const user = users[0];

  const isPasswordValid = await bcrypt.compare(password, user.password_hash);

  if (!isPasswordValid) {
    return new Response(JSON.stringify({ error: "Password is wrong." }), { status: 400 });
  }

  const token = jwt.sign({
    userId: user.id,
    username: user.username,
    email: user.email,
    profile_picture: user.profile_picture,
    banner_picture: user.banner_picture,
    description: user.description,
    }, JWT_SECRET, {expiresIn: '7d'});

  return new Response(JSON.stringify({ token }), { status: 200 });
}