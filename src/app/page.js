"use client"

import {usePermissions} from "@/context/PermissionsContext";
import Link from 'next/link';
export default function Home() {
  const { permissions, loading } = usePermissions();

  if (loading) return <div>Loading permissions...</div>;

  return (
    <div>
      {permissions.includes("view_dashboard") && <div>Dashboard Content</div>}
      {!permissions.includes("view_dashboard") && <div>Access Denied</div>}
      <Link href="/roles">root</Link>
      <h1>Permissions</h1>
      <ul>
        {permissions.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>
    </div>
  );
}



// view_users
// create_users
// edit_users 
// delete_users 
// view_roles 
// edit_roles
// access_admin