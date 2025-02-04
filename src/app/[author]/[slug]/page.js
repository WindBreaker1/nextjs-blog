"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { marked } from "marked";
import styles from "./post.module.css";

export default function PostPage({ params: paramsPromise }) {
  const params = use(paramsPromise); // ✅ Unwrap params correctly
  let { author, slug } = params;

  const [post, setPost] = useState(null);
  const [tags, setTags] = useState([]);

  const fetchPost = async () => {
    try {
      const res = await fetch(`/api/posts/${author}/${slug}`);
      if (!res.ok) throw new Error("Post not found");
      const data = await res.json();
      setPost(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTags = async () => {
    try {
      const res = await fetch(`/api/posts/${author}/${slug}/tags`);
      const data = await res.json();
      setTags(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (author, slug) {
      fetchPost();
      fetchTags();
    }
  }, [author, slug]);

  if (!post) {
    return <div>Loading...</div>;
  }

  if (!post.content) {
    return (
      <div>
        <h1>Post not found</h1>
        <p>The post you're looking for does not exist.</p>
      </div>
    );
  }

  // Format the date
  const formatDate = (isoString) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(isoString));
  };

  // Convert Markdown to HTML
  const contentHtml = marked(post.content);

  return (
    <div className={styles.post}>
      <h1>{post.title}</h1>
      <div className={styles.metadata}>
        <p>Author: {post.author}</p>
        <hr className={styles.divider} />
        <p>Created at: {formatDate(post.created_at)}</p>
        <hr className={styles.divider} />
        <div className={styles.tagsContainer}>
          Tags:
          {tags.length > 0 ? (
            tags.map((tag, index) => <div key={index} className={styles.tag}>{tag.name}</div>)
          ) : (
            <div>No tags found for this post.</div>
          )}
        </div>
      </div>
      <div className="post-content" dangerouslySetInnerHTML={{ __html: contentHtml }} />
      <div className={styles.metadata}>
        <p>Likes: {post.likes}</p>
        <hr className={styles.divider} />
        <p>Dislikes: {post.dislikes}</p>
        <hr className={styles.divider} />
        <Link href="/blog">
          <button className={styles.returnButton}>Back to Blog</button>
        </Link>
      </div>
    </div>
  );
}
