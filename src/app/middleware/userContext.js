"use client";

import { createContext, useContext, useEffect, useState } from "react";

// Create the UserContext
const UserContext = createContext();

// Helper to decode token
const decodeToken = (token) => {
  try {
    const tokenParts = token.split(".");
    if (tokenParts.length === 3) {
      const decodedPayload = JSON.parse(atob(tokenParts[1]));
      return decodedPayload;
    }
    console.error("Invalid token format.");
    return null;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

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

  useEffect(() => {
    const token = getCookie("token");
    if (token) {
      const decodedUser = decodeToken(token);
      if (decodedUser) {
        setUser(decodedUser);
      }
    }
  }, []);

  // Provide user and logout function
  const logout = () => {
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <UserContext.Provider value={{ user, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to access UserContext
export const useUser = () => {
  return useContext(UserContext);
};
