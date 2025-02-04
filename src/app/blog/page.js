"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import PostContainer from '@/components/postContainer/postContainer';
import { marked } from 'marked';
import { useUser } from '../api/middleware/userContext';

const Blog = () => {
  const imagelessRenderer = new marked.Renderer();

  const [posts, setPosts] = useState([]);
  const { user } = useUser();

  const fetchPosts = async () => {
    const res = await fetch('/api/posts');
    const data = await res.json();
    setPosts(data);
  }
  useEffect(() => {
    fetchPosts()
  }, [])

  imagelessRenderer.image = (href, title, text) => {
    return `<p>${text || 'Alt Text'}</p>`;
  }

  imagelessRenderer.hr = () => {
    return `<p>- - -<p>`;
  }

  return (
    <div className='page'>
      <h1>Blog</h1>

      <br></br>

      <h2>Search Bar</h2>

      <br></br>
            
      <div className='flexbox'>
        {posts.map((post, index) => 
          <PostContainer 
            key={index} 
            url={`/${post.author}/${post.slug}`} 
            thumbnail={post.thumbnail} 
            title={post.title} 
            author={post.author} 
            authorPFP={post.authorPFP ?? "./default-avatar.jpg"}
            content={marked(post.content, {renderer: imagelessRenderer})} 
            likes={post.likes}
            dislikes={post.dislikes}
          />
        )}
      </div>

      <h1>Table View</h1>

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

      <br></br>


    </div>
  )
}

export default Blog