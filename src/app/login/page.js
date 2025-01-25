"use client"

import { useState } from 'react'
import Cookies from 'js-cookie';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const handleLogin = async (event) => {
    event.preventDefault();

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({username, password})
    })

    const data = await res.json();

    if (res.ok) {
      console.log('Login Successful!')
      Cookies.set('token', data.token, { expires: 7, path: '/' });
      console.log(Cookies.get('token'));
      setUsername('')
      setPassword('')
    } else {
      console.error('Login failed: ', data.error);
    }
  }
  
  return (
    <div className='page'>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input type='text' id='username' value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username' />
        <input type='text' id='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default LoginPage