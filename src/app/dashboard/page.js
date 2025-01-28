"use client";

import { useEffect, useState } from "react";
import { useUser } from "../api/middleware/userContext";
import Link from "next/link";
import Modal from "@/components/modal/modal";
import styles from './dashboard.module.css'

function Dashboard() {
  const { user, logout, remove } = useUser();
  const [ posts, setPosts ] = useState([])
  const [editingField, setEditingField] = useState(null);
  const [inputValue, setInputValue] = useState("");

  async function fetchUserPosts() {
    const token = document.cookie.split("token=")[1]; // Retrieve token from cookies
  
    const response = await fetch("/api/posts/user", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (response.ok) {
      const results = await response.json();
      setPosts(results)
    } else {
      console.error("Failed to fetch posts:", await response.json());
    }
  }
  
  useEffect(() => {
    fetchUserPosts();
  }, [])

  const handleUpdate = async () => {
    const token = document.cookie.split("token=")[1]; // Get token from cookies

    const body = JSON.stringify({
      field: editingField,
      value: inputValue,
    });

    const res = await fetch("/api/users", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Send token
      },
      body,
    });

    console.log("Token sent to backend:", token);

    if (res.ok) {
      const data = await res.json();
      alert(`${data.field} updated successfully!`);
      setEditingField(null); // Close edit mode
      window.location.reload(); // Refresh the page to fetch updated data
    } else {
      alert("Failed to update. Please try again.");
    }
  };

  const handleOpenModal = (field) => {
    setEditingField(field);
    setInputValue(user[field] || "");
  };

  const handleCloseModal = () => {
    setEditingField(null);
    setInputValue("");
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="page">
      {user ? (
        <div className={styles.dashboard}>
          <h1>{user.username}'s Dashboard</h1>

          <div className={styles.section}>
            <p>Name: {user.username}</p>
            <button onClick={() => handleOpenModal("username")} className={styles.sectionButton}>Change Username</button>
          </div>
          <hr className={styles.divider}></hr>

          <div className={styles.section}>
            <img className={styles.profilePicture} src={user.profile_picture}></img>
            <button onClick={() => handleOpenModal("profile_picture")} className={styles.sectionButton}>Change Profile Picture</button>
          </div>
          <hr className={styles.divider}></hr>

          <div className={styles.section}>
            <p>Description: {user.description}</p>
            <button onClick={() => handleOpenModal("description")} className={styles.sectionButton}>Change Description</button>
          </div>
          <hr className={styles.divider}></hr>

          <div className={styles.section}>
            <p>Logout</p>
            <button className={styles.sectionButton} id={styles.logout} onClick={logout}>Logout</button>
          </div>
          <hr className={styles.divider}></hr>

          <div className={styles.section}>
            <p>Delete Account</p>
            <button className={styles.sectionButton} id={styles.delete} onClick={remove}>Delete Account</button>
          </div>
          <hr className={styles.divider}></hr>

          {/* Render Modal */}
          {editingField && (
            <Modal
              field={editingField}
              value={inputValue}
              onClose={handleCloseModal}
              onSave={handleUpdate}
              onInputChange={handleInputChange}
            />
          )}
          
          <h2>Posts</h2>
          <ul>
            {posts.map((post) => (
              <li key={post.id}>
                <Link href={`/blog/${post.id}`}>{post.title}</Link>
              </li>
            ))}
      </ul>

        </div>
      ) : (
        <div className="page">
          <p>Please log in to access your dashboard.</p>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
