"use client"

import { useState } from 'react'
import Cookies from 'js-cookie';
import styles from './login.module.css'

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const handleLogin = async (event) => {
    event.preventDefault();

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({username, password}),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })

    const data = await res.json();

    if (res.ok) {
      console.log('Login Successful!')
      Cookies.set('token', data.token, { expires: 7, path: '/' });
      console.log(Cookies.get('token'));
      window.location.href = "/dashboard";
      setUsername('')
      setPassword('')
    } else {
      console.error('Login failed: ', data.error);
    }
  }
  
  return (
    <div className={styles.loginPage}>
      <h1>Login</h1>
      <form className={styles.loginForm} onSubmit={handleLogin}>
        <input type='text' id='username' value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username' />
        <input type='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default LoginPage