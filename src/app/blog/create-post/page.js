"use client"

import { redirect } from 'next/dist/server/api-utils';
import Link from 'next/link';
import { useState, useEffect } from 'react'

const CreatePost = () => {
  const [post, setPost] = useState(null);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [author, setAuthor] = useState('');
  const [status, setStatus] = useState('');
  const [tags, setTags] = useState([]);
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await fetch('/api/posts', {
      method: 'POST', 
      body: JSON.stringify({ title, slug, author, status, tags, content }),
    })

    if (res.ok) {
      setTitle('')
      setSlug('')
      setAuthor('')
      setStatus('')
      setTags([])
      setContent('')
      setMessage('Post added succsessfully!');
    }
  }

  return (
    <div className='page'>
      <h1>Create Your Post!</h1>
      {message && <p>{message}</p>}

      <Link href='/blog'>Go Back to Blog</Link>

      <form onSubmit={handleSubmit}>
        <input type='text' id='title' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title' />
        <input type='text' id='slug' value={slug} onChange={(e) => setSlug(e.target.value)} placeholder='Slug' />
        <input type='text' id='author' value={author} onChange={(e) => setAuthor(e.target.value)} placeholder='Author' />
        <select id='status' value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="" disabled defaultValue=''>Select an option</option>
          <option value='public'>Public</option>
          <option value='private'>Private</option>
        </select>
        <input type='text' id='tags' value={tags} onChange={(e) => setTags(e.target.value)} placeholder='Tags' />
        <textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} placeholder='Content' />
        <button type='submit'>Add Post</button>
      </form>

    </div>
  )
}

export default CreatePost