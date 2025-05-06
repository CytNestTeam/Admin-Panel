"use client"

import {usePermissions} from "@/context/PermissionsContext";
import Link from 'next/link';
export default function Home() {
  const { permissions, loading } = usePermissions();


  return (
    <div>
      {permissions.includes("view_dashboard") && <div>Dashboard Content</div>}
      {!permissions.includes("view_dashboard") && <div>Access Denied</div>}
      <Link href="/roles">Role</Link>
     
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