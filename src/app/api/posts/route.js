import db from '@/app/api/lib/db.js';

// Get public posts.
export async function GET() {
  const [results] = await db.query(`
    SELECT posts.*, COALESCE(users.profile_picture, './default-avatar.jpg') AS authorPFP 
      FROM posts 
      LEFT JOIN users ON posts.author = users.username
      WHERE posts.status = "public" 
      ORDER BY posts.id DESC
  `);
  return new Response(JSON.stringify(results));
}

// Add a post to the database.
export async function POST(req) {
  const { title, slug, author, thumbnail, status, tags, content } = await req.json();
  const [results] = await db.query('INSERT INTO posts (title, slug, author, thumbnail, status, content) VALUES (?, ?, ?, ?, ?, ?)', [title, slug, author, thumbnail, status, content]);

  // tags

  const postId = results.insertId;

  const tagIDs = [];
  for (let tag of tags) {
    // Check if the tag already exists in the tags table
    const [existingTag] = await db.query(
      'SELECT id FROM tags WHERE name = ?',
      [tag]
    );
    let tagId;
    if (existingTag.length > 0) {
      // Tag already exists, get the tag ID
      tagId = existingTag[0].id;
    } else {
      // Tag doesn't exist, insert it into the `tags` table
      const [tagResult] = await db.query(
        'INSERT INTO tags (name) VALUES (?)',
        [tag]
      );
      tagId = tagResult.insertId;
    }

    // Collect the tag IDs to associate with the post
    tagIDs.push(tagId);
  }

  // 3. Insert into `post_tags` to associate the tags with the new post
  const postTagPromises = tagIDs.map((tagId) =>
    db.query('INSERT INTO post_tags (post_id, tag_id) VALUES (?, ?)', [
      postId,
      tagId,
    ])
  );

  // Wait for all the tag associations to be created
  await Promise.all(postTagPromises);

  return new Response(JSON.stringify(results));
}
