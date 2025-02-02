import db from "@/app/api/lib/db.js";
import { verifyToken } from "../../middleware/auth";

export async function GET(req) {
  try {
    const decoded = verifyToken(req);

    if (!decoded) {
      return new Response(JSON.stringify({ error: "Unauthorized: Invalid or expired token" }), { status: 401 });
    }

    const userId = decoded.userId;

    // Fetch user from the database
    const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [userId]);
    if (rows.length === 0) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(rows[0]), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500 }
    );
  }
}
