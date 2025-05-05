// File: src/app/registration/page.js
"use client";
import Link from 'next/link';
import { signOut } from "next-auth/react";
export default function Dashboard() {
    const handleLogout = () => {
        signOut({ callbackUrl: "/" });
      };

      const menuData = [
        {
          "menu": "User Management",
          "pages": [
            {
              "name": "User List",
              "route": "/users",
              "actions": ["view"]
            },
            {
              "name": "Roles",
              "route": "/roles",
              "actions": ["view"]
            }
          ]
        }
      ];
  return (
    <>
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-xl font-bold mb-4">On Admin Dashboard!!</h2>
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Logout
      </button>

      
    </div>
    
    <div className="max-w-md mx-auto p-6 bg-[#b2dbff] shadow-md rounded-lg mt-10 ">

        {/*  Sidebar */}
        <aside className="sidebar">
          {menuData.map((menu) => (
            <div key={menu.menu} className="menu-section">
              <h4>{menu.menu}</h4>
              <ul>
                {menu.pages.map((page) => (
                  <li key={page.route}>
                    <Link href={page.route}>{page.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </aside>
      </div>
    
    </>
  );
}

