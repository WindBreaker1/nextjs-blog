"use client"

import { useState } from 'react';
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';
import styles from './login.module.css'
import { useNotification } from '../api/middleware/notificationContext';

const LoginPage = () => {
  const router = useRouter();
  const { showNotification } = useNotification();
  
  const [formData, setFormData] = useState({ username: "",  password: "" });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleLogin = async (event) => {
    event.preventDefault();

    const { username, password } = formData;

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({username, password}),
      credentials: "include",
    })

    const data = await res.json();

    if (res.ok) {
      Cookies.set('token', data.token, { expires: 7, path: '/' });

      showNotification("Registration successful!", "success");
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 2000);
    } else {
      showNotification(data.error || "Login failed", "error");
    }
  }
  
  return (
    <div className={styles.loginPage}>
      <h1>Login</h1>
      <form className={styles.loginForm} onSubmit={handleLogin}>
        <input type='text' name='username' onChange={handleChange} placeholder='Username' />
        <div className={styles.passwordInput}>
          <input type={showPassword ? "text" : "password"} name='password' onChange={handleChange} placeholder='Password' />
          <button type='button' onClick={() => setShowPassword(!showPassword)}>{showPassword ? "Hide": "Show"} Password</button>
        </div>
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default LoginPage