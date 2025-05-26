// File: src/app/dashboard/users/add/page.js
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "@/app/ui/dashboard/users/addUser/addUser.module.css";

const AddUserPage = () => {
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
      router.push("/dashboard/users"); 
    } else {
      alert(data.error || "Registration failed.");
    }
  };
  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input type="email" placeholder="email" name="email" required />
        <input
          type="password"
          placeholder="password"
          name="password"
          required
        />
        <select name="roleId" id="isAdmin">
          <option value="">Select Role</option>
          {roles.map((role) => (
            <option key={role.id} value={role.id}>
              {role.name}
            </option>
          ))}
        </select>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddUserPage;
