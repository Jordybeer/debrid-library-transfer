// components/Layout.tsx

import React from 'react';
import DarkModeToggle from './DarkModeToggle';
import useDarkMode from '../hooks/useDarkMode';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [darkMode, toggleDarkMode] = useDarkMode();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex items-center justify-between py-4 px-6 bg-white bg-opacity-10 backdrop-blur-md">
        <h1 className="text-2xl font-bold">Debrid Migration Tool</h1>
        <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      </header>
      <main className="flex-grow flex items-center justify-center">
        {children}
      </main>
    </div>
  );
};

export default Layout;
