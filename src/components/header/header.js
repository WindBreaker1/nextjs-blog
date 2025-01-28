"use client"

import React from 'react'
import Link from 'next/link'
import { useUser } from '@/app/api/middleware/userContext'
import styles from './header.module.css'

const Header = () => {
  const { user } = useUser();

  return (
    <header>
      {user ? (
        <div className={styles.header}>
          <div className={styles.siteName}>NextJs Blog</div>
          <nav className={styles.nav}>
            <Link href='/'>Home</Link>
            <Link href='/blog'>Blog</Link>
            <Link href='/blog/create-post'>Create Post</Link>
            <Link href='/dashboard'>
              <div className={styles.userSnippet}>
                <img className={styles.profilePicture} src={user.profile_picture}></img>
                {user.username}
              </div>
            </Link>
          </nav>
        </div>
      ) : (
        <div className={styles.header}>
          <div className={styles.siteName}>NextJs Blog</div>
          <nav className={styles.nav}>
            <Link href='/'>Home</Link>
            <Link href='/blog'>Blog</Link>
            <Link href='/login'>Login</Link>
            <Link href='/register'>Register</Link>
          </nav>
        </div>
      )}

      
    </header>
  )
}

export default Header