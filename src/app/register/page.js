"use client"

import { useState } from 'react'

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleRegister = async (event) => {
    event.preventDefault();

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username, email, password})
    })

    const data = await res.json();

    if (res.ok) {
      console.log('Registration successful!', data)
      setUsername('')
      setEmail('')
      setPassword('')
    } else {
      console.log('Registration unsuccessful!', data)
    }
  }
  
  return (
    <div className='page'>
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <input type='text' id='username' value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username' />
        <input type='text' id='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
        <input type='text' id='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
        <button type='submit'>Register</button>
      </form>
    </div>
  )
}

export default RegisterPage