"use client"

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { marked } from 'marked';

export default function PostPage({ params: paramsPromise }) {
  const [post, setPost] = useState(null);
  const [tags, setTags] = useState([]);
  const params = use(paramsPromise);
  let { postId } = params;

  const fetchPost = async (id) => {
    const res = await fetch(`/api/posts/${id}`);
    const data = await res.json();
    setPost(data);
  }
  const fetchTags = async (id) => {
    const res = await fetch(`/api/posts/${id}/tags`);
    const data = await res.json();
    setTags(data);
  };
  useEffect(() => {
    if (postId) {
      fetchPost(postId);
      fetchTags(postId)
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
    <div className='blog-post'>
      <h1>{post.title}</h1>
      <p>Author: {post.author}</p>
      <p>Created at: {post.created_at}</p>
      <ul>
        {tags.length > 0 ? (
          tags.map((tag, index) => <li key={index}>{tag.name}</li>)
        ) : (
          <li>No tags found for this post.</li>
        )}
      </ul>
      <div
        className="post-content"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
      <hr></hr>
      <p>Likes: {post.likes}</p>
      <p>Dislikes: {post.dislikes}</p>
      <hr></hr>
      <Link href="/blog">Back to Blog</Link>
    </div>
  );
}
