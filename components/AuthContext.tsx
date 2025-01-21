// context/AuthContext.tsx
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// Define types for the context
type AuthContextType = {
  user: { email: string; name: string; image: string } | null;

  logout: () => void;
  loading: boolean;
  error: string | null;
};

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create the provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<{
    email: string;
    name: string;
    image: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  //   const login = async (email: string, password: string) => {
  //     setLoading(true);
  //     setError(null);
  //     try {
  //       const response = await fetch("/api/users/login", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ email, password }),
  //       });

  //       if (response.ok) {
  //         const data = await response.json();
  //         setUser(data.user); // Store user data
  //         localStorage.setItem("user", JSON.stringify(data.user)); // Save to localStorage (optional)
  //         alert("Login successful!");
  //       } else {
  //         const errorData = await response.json();
  //         setError(errorData.error || "Something went wrong.");
  //       }
  //     } catch (error) {
  //       console.error("Error during login:", error);
  //       setError("An error occurred while trying to log in.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    alert("Logged out successfully!");
  };

  return (
    <AuthContext.Provider value={{ user, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
