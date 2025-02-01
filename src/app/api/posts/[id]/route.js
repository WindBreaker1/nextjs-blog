import db from "@/app/api/lib/db";

export async function GET(req, { params }) {
  const { id } = await params;
  const [rows] = await db.query("SELECT * FROM posts WHERE id = ?", [id]);
  const post = rows[0];
  return new Response(JSON.stringify(post), { status: 200 });
}

export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    const { title, content } = await req.json();

    await db.query("UPDATE posts SET title = ?, content = ? WHERE id = ?", [
      title,
      content,
      id,
    ]);

    return new Response(
      JSON.stringify({ message: "Post updated successfully" }),
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

export async function DELETE(req, { params }) {
  try {
    const { id } = await params;

    await db.query("DELETE FROM posts WHERE id = ?", [id]);

    return new Response(
      JSON.stringify({ message: "Post deleted successfully" }),
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
