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
          <Link href='/' className='noUnderline'>
            <div className={styles.siteName}>📑blogly</div>
          </Link>
          <nav className={styles.nav}>
            <Link href='/blog' className='noUnderline'>
              <button className={styles.loginButton}>
                <img src="./blog-solid.svg" className='svg' />
                Blog
              </button>
            </Link>
            <Link href='/blog/create-post' className='noUnderline'>
              <button className={styles.loginButton}>
                <img src="./pen-nib-solid.svg" className='svg' />
                Create Post
              </button>
            </Link>
            <Link href='/dashboard' className='noUnderline'>
              <div className={styles.userSnippet}>
                <img className={styles.profilePicture} src={user.profile_picture}></img>
                {user.username}
              </div>
            </Link>
          </nav>
        </div>
      ) : (
        <div className={styles.header}>
          <Link href='/' className='noUnderline'>
            <div className={styles.siteName}>📑blogly</div>
          </Link>
          <nav className={styles.nav}>
            <Link href='/blog' className='noUnderline'>
              <button className={styles.loginButton}>
                <img src="./blog-solid.svg" className='svg' />
                Blog
              </button>
            </Link>
            <Link href='/login' className='noUnderline'>
              <button className={styles.loginButton}>
                <img src="./right-to-bracket-solid.svg" className='svg' />
                Login
              </button>
            </Link>
            <Link href='/register' className='noUnderline'>
              <button className={styles.registerButton}>
                <img src="./address-card-solid.svg" className='svg' />
                Register
              </button>
            </Link>
          </nav>
        </div>
      )}
      
    </header>
  )
}

export default Header