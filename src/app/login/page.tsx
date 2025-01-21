"use client";
import React, { useState } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Form Data Submitted:", formData);

    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login successful:", data);
        localStorage.setItem("user", JSON.stringify(data.user));
        // Show alert on success
        alert("Login successful!");
        setError("");
        // Redirect user to home page after successful login
        redirect("/");
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-80"
      >
        <h2 className="text-2xl font-bold mb-4">Login</h2>

        {error && <div className="text-red-500 mb-4">{error}</div>}

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-semibold">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="input input-bordered w-full mt-2"
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-semibold">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="input input-bordered w-full mt-2"
            placeholder="Enter your password"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-full mt-4">
          Login
        </button>

        <div className="mt-4 text-center">
          <span className="text-sm">
            Don't have an account?{" "}
            <Link href="/signup" className="text-blue-500 hover:underline">
              Register
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
