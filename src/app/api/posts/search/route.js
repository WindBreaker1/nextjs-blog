import { NextResponse } from "next/server";
import db from "../../lib/db";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json({ error: "Query parameter is missing" }, { status: 400 });
  }

  try {
    const [rows] = await db.query(
      `SELECT * FROM posts WHERE title LIKE ? OR content LIKE ? ORDER BY created_at DESC`,
      [`%${query}%`, `%${query}%`]
    );

    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    console.error("Search query error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
