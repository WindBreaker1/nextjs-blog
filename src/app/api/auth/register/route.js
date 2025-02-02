import bcrypt from 'bcrypt'
import db from '@/app/api/lib/db'

export async function POST(req, res) {
  const { username, email, password } = await req.json();

  // Backend validation
  const usernameRegex = /^[a-zA-Z0-9_]{6,}$/;

  if (!usernameRegex.test(username)) {
    return new Response(JSON.stringify({ error: "Username must be at least 6 characters and contain only letters, numbers, or underscores." }), { status: 400 });
  }
  if (!email.includes("@")) {
    return new Response(JSON.stringify({ error: "Invalid email format." }), { status: 400 });
  }
  if (password.length < 6) {
    return new Response(JSON.stringify({ error: "Password must be at least 6 characters long." }), { status: 400 });
  }

  // Check if user already exists
  const [existingUser] = await db.query('SELECT id FROM users WHERE username = ? OR email = ?', [username, email]);

  if (existingUser.length > 0) {
    return new Response(JSON.stringify({ error: "Email or password is already in use." }), { status: 400 });
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  await db.query('INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)', [username, email, hashedPassword]);

  return new Response(JSON.stringify({ message: "User registered successfully!" }), { status: 201 });
}