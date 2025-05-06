"use client"
import Link from 'next/link';
import { usePermissions } from '@/context/PermissionsContext';

export default function Roles() {
    const { permissions, loading } = usePermissions();
  
    if (loading) return <div>Loading permissions...</div>;
  
    return (
      <div>
        <h1>Permissions</h1>
      <ul>
        {permissions.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>
        {permissions.includes("view_dashboard") && <div>Dashboard Content</div>}
        {!permissions.includes("view_dashboard") && <div>Access Denied</div>}
        <Link href="/">root</Link>
      </div>
    );
  }