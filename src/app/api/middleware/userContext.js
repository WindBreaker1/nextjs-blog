"use client";

import { createContext, useContext, useEffect, useState } from "react";

// Create the UserContext
const UserContext = createContext();

// Helper to get cookies by name
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
};

// UserProvider to wrap your app
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  async function fetchUser() {
    const token = getCookie("token");
    if (token) {
      try {
        const response = await fetch("/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData); // Set the latest user data
        } else {
          console.error("Failed to fetch user");
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser(null);
      }
    }
  }


  useEffect(() => {
    fetchUser();
  }, []);

  const refreshUser = async () => {
    const token = getCookie("token");
    if (token) {
      const response = await fetch("/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
      }
    }
  };

  // Provide user and logout function
  const logout = () => {
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
    setUser(null);
    window.location.href = "/login";
  };

  async function remove() {
    const token = getCookie("token"); // Retrieve the token from cookies
  
    if (!token) {
      console.error("No token found");
      return;
    }
  
    const response = await fetch(`/api/users`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    });
  
    if (response.ok) {
      document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
      setUser(null);
      window.location.href = "/register";
    } else {
      const errorData = await response.json();
      console.error("Failed to delete user:", errorData.error || "Unknown error");
    }
  }

  return (
    <UserContext.Provider value={{ user, setUser, refreshUser, logout, remove }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to access UserContext
export const useUser = () => {
  return useContext(UserContext);
};
