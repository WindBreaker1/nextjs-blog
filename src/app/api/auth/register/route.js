import bcrypt from 'bcrypt'
import db from '@/app/lib/db'

export async function POST(req, res) {
  const { username, email, password } = await req.json();

  const [existingUser] = await db.query('SELECT id FROM users WHERE username = ? OR email = ?', [username, email]);

  if (existingUser.length > 0) {
    return new Response('User already exists.')
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log('Hashed password:', hashedPassword);
  } catch (error) {
    console.error('Error hashing password:', error);
    throw new Error('Password hashing failed');
  }

  const [result] = await db.query('INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)', [username, email, hashedPassword]);

  return new Response('User registered successfully.', result)
}