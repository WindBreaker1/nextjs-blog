"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const fetchPosts = async () => {
    const res = await fetch('/api/posts');
    const data = await res.json();
    setPosts(data);
  }
  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <div className='page'>
      <h1>Blog</h1>

      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/blog/${post.id}`}>{post.title}</Link>

          </li>
        ))}
      </ul>

      <Link href="/">Back to Home</Link>
      
      <Link href="/blog/create-post">Create New Post</Link>
    </div>
  )
}

export default Blog