"use client"

import Link from 'next/link';
import { useState, useEffect } from 'react'
import { useRouter } from "next/navigation";
import { useUser } from '@/app/api/middleware/userContext';
import { useNotification } from '@/app/api/middleware/notificationContext';

const CreatePost = () => {
  const router = useRouter();
  const { showNotification } = useNotification();

  const { user } = useUser();
  const [post, setPost] = useState(null);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [author, setAuthor] = useState('');
  const [status, setStatus] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [tags, setTags] = useState([]);
  const [content, setContent] = useState('');

  useEffect(() => {
    if (user && user.username) {
      setAuthor(user.username);
    }
  }, [user])

  const handleFileImport = (e) => {
    // Get the first selected file
    const file = e.target.files[0];
    if (!file) return;

    // Create a new FileReader instance
    const reader = new FileReader();

    // Define what happens when reading is successful
    reader.onload = (event) => {
      // Update the state with the file contents
      setContent(event.target.result);
    };

    // Read the file as text (assuming it's a text-based Markdown file)
    reader.readAsText(file);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formattedTags = tagsInput
      .split(',')
      .map((tag) => tag.trim()) // Remove extra whitespace
      .filter((tag) => tag.length > 0); // Ignore empty strings

    const res = await fetch('/api/posts', {
      method: 'POST', 
      body: JSON.stringify({ title, slug, author, status, tags: formattedTags, content }),
    })

    if (res.ok) {
      setTitle('')
      setSlug('')
      setAuthor('')
      setStatus('')
      setTagsInput('')
      setTags([])
      setContent('')
      
      showNotification("Post created successfully!", "success");
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 2000);
    }
  }

  return (
    <div className='page'>
      <h1>Create Your Post!</h1>

      <br></br>

      <form onSubmit={handleSubmit}>
        <input type='text' id='title' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title' />
        <input type='text' id='slug' value={slug} onChange={(e) => setSlug(e.target.value)} placeholder='Slug' />
        <input type='text' id='author' value={author} disabled placeholder='Author' />
        <select id='status' value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="" disabled defaultValue=''>Select an option</option>
          <option value='public'>Public</option>
          <option value='private'>Private</option>
        </select>
        <input type='text' id='tags' value={tagsInput} onChange={(e) => setTagsInput(e.target.value)} placeholder='Tags' />
        <input type="file" accept=".md" className='file-input' onChange={handleFileImport}/>
        <textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} placeholder='Content' />
        <button type='submit'>Add Post</button>
      </form>

    </div>
  )
}

export default CreatePost