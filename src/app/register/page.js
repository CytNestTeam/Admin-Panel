// File: src/app/registration/page.js
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [formData, setFormData] = useState({ email: "", password: "", roleId: "" });
  const [roles, setRoles] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchRoles() {
      const res = await fetch("/api/roles");
      const data = await res.json();
      setRoles(data.roles || []);
    }
    fetchRoles();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const payload = {
      email: formData.get("email"),
      password: formData.get("password"),
      roleId: parseInt(formData.get("roleId"), 10),
    };

    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (res.ok) {
      alert("Registration successful!");
      router.push("/login");
    } else {
      alert(data.error || "Registration failed.");
    }
  };


  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
      <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="w-full border p-2 rounded"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          className="w-full border p-2 rounded"
        />
        <select
          name="roleId"
          required
          className="w-full border p-2 rounded"
        >
          <option value="">Select Role</option>
          {roles.map((role) => (
            <option key={role.id} value={role.id}>
              {role.name}
            </option>
          ))}
        </select>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
}
