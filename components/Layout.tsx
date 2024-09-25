// components/Layout.tsx

import React, { useEffect, useState } from 'react';
import DarkModeToggle from './DarkModeToggle';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check for saved user preference
    const savedMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedMode);
    document.documentElement.classList.toggle('dark', savedMode);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark', !darkMode);
    localStorage.setItem('darkMode', String(!darkMode));
  };

  return (
    <>
      <header className="flex items-center justify-between py-4 px-6 bg-gray-100 dark:bg-gray-800">
        <h1 className="text-2xl font-bold">Debrid Migration Tool</h1>
        <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      </header>
      <main className="p-6">{children}</main>
    </>
  );
};

export default Layout;
