"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { marked } from "marked";
import DOMPurify from 'dompurify';
import styles from "./post.module.css";

export default function PostPage({ params: paramsPromise }) {
  const renderer = new marked.Renderer();

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

  // markdown settings

  renderer.image = (href, title, text) => {
    if (typeof href === 'object' && href !== null) {
      ({ href, text, title } = href); // Extract `href`, `text`, `title`, and `raw` from the object
    }

    // Default behavior: Render the image as usual
    let imageHTML = `<img src="${href}" alt="${text}"`;
  
    // Check if size is included in the image alt text (like image|200)
    const regex = /(.+)\|(\d+)/; // Regex to match `image|200`
    const match = text.match(regex);
  
    if (match) {
      // Extract width from the alt text
      const width = match[2];
      // Add width style to the image
      imageHTML += ` style="width: ${width}px;"`;
    }
  
    imageHTML += '>';
    return imageHTML;
  };

  renderer.blockquote = (quote, raw, text) => {
    // Check for specific syntax in the blockquote
    let colorClass = 'normal'; // Default color class

    console.log(quote);
    console.log(raw);
    console.log(text);

    if (typeof quote === "object" && quote !== null) {
      ({ text: quote, raw } = quote); // Extract `text` (quote) and `raw` content
    } 
  
    if (quote.startsWith('[!NOTE]')) {
      colorClass = 'note';
      // Remove the [!NOTE] syntax from the blockquote text
      quote = quote.replace('[!NOTE]', '').trim();
    } else if (quote.startsWith('[!IMPORTANT]')) {
      colorClass = 'important';
      // Remove the [!IMPORTANT] syntax from the blockquote text
      quote = quote.replace('[!IMPORTANT]', '').trim();
    } else if (quote.startsWith('[!WARNING]')) {
      colorClass = 'warning';
      // Remove the [!WARNING] syntax from the blockquote text
      quote = quote.replace('[!WARNING]', '').trim();
    }
  
    // Return the blockquote with a dynamic class based on the title
    return `<blockquote class="${colorClass}">${quote}</blockquote>`;
  };

  renderer.link = (href, title, text) => {

    console.log("Href:", href); // Debugging
    console.log("Title:", title);
    console.log("Text:", text); // Debugging
  
    if (typeof href === "object" && href !== null) {
      ({ href, title, text } = href); // Extract properties
    }
  
    if (!href || typeof href !== "string") return text || "";
    
    if (href && (href.endsWith('.mp3') || href.endsWith('.ogg') || href.endsWith('.wav'))) {
      return `<audio controls>
                <source src="${href}" type="audio/mp3">
                Your browser does not support the audio element.
              </audio>`;
    }
  
    // Check if it's a SoundCloud link
    if (text.includes("soundcloud")) {
      return `<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay"
          src="https://w.soundcloud.com/player/?url=${encodeURIComponent(href)}">
        </iframe>`;
    }

    if (text.includes("youtube")) {
      const videoId = href.split("v=")[1]?.split("&")[0] || href.split("/").pop();
      if (videoId) {
        return `<iframe width="100%" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
      }
    }

    return `<a href="${encodeURI(href)}" target="_blank" rel="noopener noreferrer">${text || href}</a>`;
  }; 

  // dom purify

  const cleanContent = (inputHtml) => {
    return DOMPurify.sanitize(inputHtml, {
      ALLOWED_TAGS: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'code', 'a', 'b', 'i', 'em', 'strong', 'ul', 'li', 'ol', 'p', 'img', 'iframe', 'audio', 'video', 'br', 'hr', 'table', 'tr', 'td', 'th', 'blockquote'],
      ALLOWED_ATTR: ['href', 'src', 'title', 'alt', 'width', 'height', 'frameborder', 'allow'], // Allow necessary iframe attributes
    });
  };

  marked.setOptions({
    renderer: renderer,
    gfm: true, // Enable GitHub Flavored Markdown (GFM)
    breaks: true, // Breaks on new lines
  });

  // Convert Markdown to HTML
  const contentHtml = cleanContent(marked(post.content));

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
