"use client"

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { marked } from 'marked';

export default function PostPage({ params: paramsPromise }) {
  const [post, setPost] = useState(null);
  const params = use(paramsPromise);
  let { postId } = params;
  console.log(postId);

  const fetchPost = async (id) => {
    const res = await fetch(`/api/posts/${id}`);
    const data = await res.json();
    setPost(data);
  }
  useEffect(() => {
    if (postId) {
      fetchPost(postId);
    }
  }, [postId]);

  if (!postId) {
    return <div>No post id was provided.</div>
  }

  if (!post) {
    return <div>Loading...</div>;
  }

  // If the post does not exist or has no content
  if (!post.content) {
    return (
      <div>
        <h1>Post not found</h1>
        <p>The post you're looking for does not exist.</p>
      </div>
    );
  }

  // Convert the Markdown content to HTML
  const contentHtml = marked(post.content);

  return (
    <div>
      <h1>{post.title}</h1>
      <div
        className="post-content"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
      <Link href="/blog">Back to Blog</Link>
    </div>
  );
}
