"use client";

import { useEffect, useState } from "react";
import { useUser } from "../api/middleware/userContext";
import Link from "next/link";
import Modal from "@/components/modal/modal";
import styles from './dashboard.module.css'

function Dashboard() {
  const { user, refreshUser, logout, remove } = useUser();
  const [ posts, setPosts ] = useState([])
  const [editingField, setEditingField] = useState(null);
  const [inputValue, setInputValue] = useState("");

  async function fetchPosts() {
    if (!user?.username) return; // Wait until user data is available

    const response = await fetch(`/api/posts/by-author?author=${user.username}`);
    if (response.ok) {
      const data = await response.json();
      setPosts(data);
    }
  }
  
  useEffect(() => {
    fetchPosts();
  }, [user?.username]) // Refetch posts when/if the username changes

  const handleUpdate = async () => {
    const token = document.cookie.split("token=")[1];
  
    const res = await fetch("/api/users", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ field: editingField, value: inputValue }),
    });
  
    if (res.ok) {
      alert(`${editingField} updated successfully!`);
      setEditingField(null);
      await refreshUser(); // Fetch the updated user data dynamically
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
          
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Status</th>
                <th>Likes</th>
                <th>Dislikes</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post, index) => (
                <tr key={index}>
                  <td><Link href={`/blog/${post.id}`}>{post.title}</Link></td>
                  <td>{post.status}</td>
                  <td>{post.likes}</td>
                  <td>{post.dislikes}</td>
                </tr>
              ))}
            </tbody>
          </table>

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
