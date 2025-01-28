import db from '@/app/api/lib/db.js';
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const JWT_SECRET = process.env.MY_JWT_SECRET;

export async function GET(req) {
  try {
    // Extract token from the Authorization header
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return new Response(
        JSON.stringify({ error: "Unauthorized: Token not provided" }),
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    const username = decoded.username; // Extract userId from the token

    // Query to fetch posts by the user
    const [results] = await db.query(
      "SELECT * FROM posts WHERE author = ?",
      [username]
    );

    return new Response(JSON.stringify(results), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500 }
    );
  }
}
