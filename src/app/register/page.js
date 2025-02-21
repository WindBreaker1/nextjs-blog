"use client"

import { useState } from 'react';
import { useRouter } from "next/navigation";
import styles from './register.module.css'          
import { useNotification } from '../api/middleware/notificationContext';

const RegisterPage = () => {
  const router = useRouter();
  const { showNotification } = useNotification();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({ username: "", email: "", password: "" })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleRegister = async (event) => {
    event.preventDefault();

    const { username, email, password } = formData;

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {'Content-Type': 'application/json' },
      body: JSON.stringify({username, email, password})
    })

    const data = await res.json();

    if (res.ok) {
      showNotification("Registration successful!", "success");
      setTimeout(() => {router.push("/login")}, 2000);
    } else {
      showNotification(data.error || "Registration failed", "error");
    }
  }
  
  return (
    <div className={styles.registerPage}>
      <h1>Register</h1>
      <form className={styles.registerForm} onSubmit={handleRegister}>
        <input type='text' name='username' onChange={handleChange} placeholder='Username' />
        <input type='email' name='email' onChange={handleChange} placeholder='Email' />
        <div className={styles.passwordInput}>
          <input type={showPassword ? "text" : "password"} name='password' onChange={handleChange} placeholder='Password' />
          <button type='button' onClick={() => setShowPassword(!showPassword)}>{showPassword ? "Hide": "Show"} Password</button>
        </div>
        <div>All fields are required.</div>
        <button type='submit'>Register</button>
      </form>
    </div>
  )
}

export default RegisterPage