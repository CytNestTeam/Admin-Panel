// src/context/PermissionsContext.js
'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const PermissionsContext = createContext({ permissions: [], loading: true });

export const PermissionsProvider = ({ children }) => {
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPermissions = async () => {
      try {
        const res = await fetch("/api/auth/permissions");
        const data = await res.json();
        if (res.ok) {
          setPermissions(data.permissions || []);
        }
      } catch (error) {
        console.error("Failed to fetch permissions", error);
      } finally {
        setLoading(false);
      }
    };

    getPermissions();
  }, []);

  return (
    <PermissionsContext.Provider value={{ permissions, loading }}>
      {children}
    </PermissionsContext.Provider>
  );
};

export const usePermissions = () => useContext(PermissionsContext);
