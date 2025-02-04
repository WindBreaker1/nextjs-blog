import React from 'react'
import styles from './postContainer.module.css'
import Link from 'next/link'
import { useNotification } from '@/app/api/middleware/notificationContext'

const PostContainer = ({ url, thumbnail, title, author, authorPFP, content, likes, dislikes }) => {
  const { showNotification } = useNotification();

  function sharePost(chosenUrl) {
    const fullUrl = `${window.location.origin}${chosenUrl}`
    navigator.clipboard.writeText(fullUrl);
    showNotification("Copied the link!", "success");
  }

  return (
    <Link href={`${url}`} className={styles.container}>
      {thumbnail && <img src={thumbnail} alt='img-alt' className={styles.thumbnail} />}
      <div className={styles.contentContainer}>
        {title && <h2 className={styles.title}>{title}</h2>}
        {author && 
          <h3 className={styles.authorContainer}>
            <img src={authorPFP} alt='author-pfp' className='profile-picture-small' /> 
            {author}
          </h3>}
        {content && <div className={styles.content} dangerouslySetInnerHTML={{ __html: content }}></div>}
        <div className={styles.postFooter}>
          <div className={styles.footerContent}>
            <img src='./thumbs-up-solid.svg' className='svg' />
            {likes}
          </div>
          <div className={styles.footerContent}>
            <img src='./thumbs-down-solid.svg' className='svg' />
            {dislikes}
          </div>
          <button 
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              sharePost(url)
            }} 
            className={styles.footerContent}
          >
            <img src='./share-solid.svg' className='svg' />
            Share
          </button>
        </div>
      </div>
    </Link>
  )
}

export default PostContainer