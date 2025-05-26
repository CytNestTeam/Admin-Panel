import { createContext, useContext, useEffect, useState } from 'react';
const PermissionsContext = createContext([]);
export const usePermissions = () => useContext(PermissionsContext);
const usePermissions = () => {
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPermissions = async () => {
      const res = await fetch("/api/auth/permissions");
      const data = await res.json();
      if (res.ok) {
        setPermissions(data.permissions || []);
      }
      setLoading(false);
    }; 
    getPermissions();
  }, []);

  return { permissions, loading };
};

export default usePermissions;
