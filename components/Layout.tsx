// components/Layout.tsx

import React from 'react';
import DarkModeToggle from './DarkModeToggle';
import useDarkMode from '../hooks/useDarkMode';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [darkMode, toggleDarkMode] = useDarkMode();

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
