import React from 'react'
import Link from 'next/link'
import styles from './header.module.css'

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.siteName}>NextJs Blog</div>
      <nav className={styles.nav}>
        <Link href='/'>Home</Link>
        <Link href='/blog'>Blog</Link>
        <Link href='/blog/create-post'>Create Post</Link>
        <Link href='/login'>Login</Link>
        <Link href='/register'>Register</Link>
        <Link href='/dashboard'>Dashboard</Link>
      </nav>
    </header>
  )
}

export default Header