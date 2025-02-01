"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation"; // ✅ Correct imports

function EditPost() {
  const router = useRouter();
  const params = useParams(); // ✅ Use useParams to get the dynamic ID
  const id = params?.id; // ✅ Extract ID safely

  const [post, setPost] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (!id) return; // ✅ Ensure ID is available

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

  async function handleUpdate(event) {
    event.preventDefault();

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
      router.push("/dashboard"); // ✅ Redirect correctly
    } else {
      alert("Failed to update.");
    }
  }

  return (
    <div className="page">
      <h1>Edit Post</h1>
      {post ? (
        <form onSubmit={handleUpdate}>
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
          <textarea value={content} onChange={(e) => setContent(e.target.value)} />
          <button type="submit">Save Changes</button>
        </form>
      ) : (
        <p>Loading post...</p>
      )}
    </div>
  );
}

export default EditPost;
