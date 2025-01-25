"use client";

import { useEffect, useState } from "react";

function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Retrieve the token from cookies
    const token = getCookie("token");

    console.log("Token from cookies:", token); // Debugging: Check the token value

    if (token) {
      try {
        // Check if the token is in the correct format (has 3 parts: header, payload, signature)
        const tokenParts = token.split(".");
        
        if (tokenParts.length === 3) {
          // Decode the payload (the second part of the token)
          const decodedToken = JSON.parse(atob(tokenParts[1]));
          
          console.log("Decoded token:", decodedToken); // Debugging: Check the decoded token
          
          // Ensure the decoded token has the 'username' property (or whatever user info is in the payload)
          if (decodedToken && decodedToken.username) {
            setUser(decodedToken);
          } else {
            console.error("Invalid token payload: Missing 'username'");
          }
        } else {
          console.error("Invalid token format: Token should have 3 parts");
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  // Function to get the cookie by name
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  };

  const handleLogout = () => {
    // Remove the token from cookies
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
    window.location.href = "/login";
  };

  return (
    <div className="page">
      {user ? (
        <div>
          <h1>Hello, {user.username}!</h1>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <p>Please log in to access your dashboard.</p>
      )}
    </div>
  );
}

export default Dashboard;
