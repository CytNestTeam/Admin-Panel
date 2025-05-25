// File: src/app/registration/page.js
"use client";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { usePermissions } from "@/context/PermissionsContext";
import { useMenus } from "@/context/MenusContext";

export default function Dashboard() {
  const { permissions, loading } = usePermissions();
  const { menus, loadingMenu } = useMenus();
  if (loading || loadingMenu) return <div>Loading permissions or menu...</div>;
  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };

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
        <h1>Permissions</h1>
        <ul>
          {permissions.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
        <br />
        <h1>Menu</h1>

        <aside className="sidebar">
          {menus.map((menu) => (
            <div key={menu.menu} className="menu-section">
              <h4>{menu.menu}</h4>
              <ul>
                {menu.pages.map((page) => (
                  <li
                    key={page.route}
                    className="pl-5 "
                    style={{ color: "blue" }}
                  >
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
