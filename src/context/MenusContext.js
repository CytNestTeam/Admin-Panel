// src/context/MenusContext.js
'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const MenusContext = createContext({ menus: [], loadingMenu: true });

export const MenusProvider = ({ children }) => {
  const [menus, setMenus] = useState([]);
  const [loadingMenu, setLoadingMenu] = useState(true);

  useEffect(() => {
    const getMenus = async () => {
      try {
        const res = await fetch("/api/auth/menus");
        const data = await res.json();
        if (res.ok) {
          setMenus(data || []);
        }
      } catch (error) {
        console.error("Failed to fetch menus", error);
      } finally {
        setLoadingMenu(false);
      }
    };

    getMenus();
  }, []);

  return (
    <MenusContext.Provider value={{ menus, loadingMenu }}>
      {children}
    </MenusContext.Provider>
  );
};

export const useMenus = () => useContext(MenusContext);