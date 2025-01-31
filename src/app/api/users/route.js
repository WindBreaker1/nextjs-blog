import db from '@/app/api/lib/db.js';
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
  try {
    const authHeader = req.headers.get("authorization");

    // Check if the Authorization header exists
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return new Response(
        JSON.stringify({ error: "Unauthorized: Token not provided" }),
        { status: 401 }
      );
    }

    // Extract and verify the token
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    const userId = decoded.userId;
    const { field, value } = await req.json();

    // Validate the field being updated
    if (!["username", "profile_picture", "description"].includes(field)) {
      return new Response(JSON.stringify({ error: "Invalid field" }), {
        status: 400,
      });
    }

    // Fetch the old username before updating
    const [userResult] = await db.query("SELECT username FROM users WHERE id = ?", [userId]);
    if (userResult.length === 0) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }
    
    const oldUsername = userResult[0].username;

    // Update the user data in the database
    await db.query(`UPDATE users SET ${field} = ? WHERE id = ?`, [value, userId]);

    // If the user updated their username, update all posts with the new username
    if (field === "username") {
      await db.query("UPDATE posts SET author = ? WHERE author = ?", [value, oldUsername]);
    }

    return new Response(
      JSON.stringify({ field, message: `${field} updated successfully!` }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    const authHeader = req.headers.get("authorization");

    // Check if the Authorization header exists
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return new Response(
        JSON.stringify({ error: "Unauthorized: Token not provided" }),
        { status: 401 }
      );
    }

    // Extract and verify the token
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    const userId = decoded.userId;

    await db.query('DELETE FROM users WHERE id = ?', [userId])

    return new Response(JSON.stringify('User deleted succesfully!'), { status: 200 })
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500 }
    );
  }
}