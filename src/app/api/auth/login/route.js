import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import db from '@/app/lib/db'
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const JWT_SECRET = process.env.MY_JWT_SECRET;

export async function POST(req, res) {
  const { username, password } = await req.json();

  const [users] = await db.query('SELECT * FROM users WHERE username = ?', [username]);

  const user = users[0];

  const isPasswordValid = await bcrypt.compare(password, user.password_hash);

  const token = jwt.sign({userId: user.id}, JWT_SECRET, {expiresIn: '7d'});

  return new Response(JSON.stringify(user))
}