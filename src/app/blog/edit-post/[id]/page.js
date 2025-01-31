"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

function EditPost() {
  const router = useRouter();
  const { id } = router.query; // Get post ID from URL

  const [post, setPost] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (!id) return; // Wait for ID to load

    async function fetchPost() {
      const res = await fetch(`/api/posts/${id}`);
      if (res.ok) {
        const data = await res.json();
        setPost(data);
        setTitle(data.title);
        setContent(data.content);
      }
    }
    fetchPost();
  }, [id]);

  async function handleUpdate() {
    const token = document.cookie.split("token=")[1];

    const res = await fetch(`/api/posts/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content }),
    });

    if (res.ok) {
      alert("Post updated successfully!");
      router.push("/dashboard"); // Redirect back
    } else {
      alert("Failed to update.");
    }
  }

  return (
    <div>
      <h1>Edit Post</h1>
      {post ? (
        <div>
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
          <textarea value={content} onChange={(e) => setContent(e.target.value)} />
          <button onClick={handleUpdate}>Save Changes</button>
        </div>
      ) : (
        <p>Loading post...</p>
      )}
    </div>
  );
}

export default EditPost;
