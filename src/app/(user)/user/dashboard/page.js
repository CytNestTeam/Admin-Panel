// File: src/app/registration/page.js
"use client";
import { signOut } from "next-auth/react";
export default function Dashboard() {
    const handleLogout = () => {
        signOut({ callbackUrl: "/" });
      };
  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-xl font-bold mb-4">On Dashboard!!</h2>
      <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
    </div>
  );
}
