"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';

const Blog = () => {
  const [posts, setPosts] = useState([]);

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

      <br></br>

      <h2>Search Bar</h2>

      <br></br>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Author</th>
            <th>Likes</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post, index) => (
            <tr key={index}>
              <td><Link href={`/blog/${post.id}`}>{post.title}</Link></td>
              <td>{post.author}</td>
              <td>{post.likes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Blog