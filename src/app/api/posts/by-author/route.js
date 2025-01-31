import db from "@/app/api/lib/db.js";

export async function GET(req) {
  try {
    // Get the author's username from query parameters
    const { searchParams } = new URL(req.url);
    const author = searchParams.get("author");

    if (!author) {
      return new Response(JSON.stringify({ error: "Author is required" }), {
        status: 400,
      });
    }

    // Fetch posts by the author's username
    const [results] = await db.query("SELECT * FROM posts WHERE author = ?", [author]);

    return new Response(JSON.stringify(results), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
