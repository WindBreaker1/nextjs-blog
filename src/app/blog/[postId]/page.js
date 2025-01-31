"use client"

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { marked } from 'marked';
import styles from './post.module.css';

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

  // format date
  const formatDate = (isoString) => {
    return new Intl.DateTimeFormat("en-US", { year: "numeric", month: "long", day: "numeric" }).format(new Date(isoString));
  };

  // Convert the Markdown content to HTML
  const contentHtml = marked(post.content);

  return (
    <div className={styles.post}>
      <h1>{post.title}</h1>
      <div className={styles.metadata}>
        <p>Author: {post.author}</p>
        <hr className={styles.divider}></hr>
        <p>Created at: {formatDate(post.created_at)}</p>
        <hr className={styles.divider}></hr>
        <div className={styles.tagsContainer}>
          Tags: 
          {tags.length > 0 ? (
            tags.map((tag, index) => <div key={index} className={styles.tag}>{tag.name}</div>)
          ) : (
            <div>No tags found for this post.</div>
          )}
        </div>
      </div>
      <div
        className="post-content"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
      <div className={styles.metadata}>
        <p>Likes: {post.likes}</p>
        <hr className={styles.divider}></hr>
        <p>Dislikes: {post.dislikes}</p>
        <hr className={styles.divider}></hr>
        <Link href="/blog">
          <button className={styles.returnButton}>Back to Blog</button>
        </Link>
      </div>
    </div>
  );
}
