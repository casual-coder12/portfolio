import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('midnight-purple'); // default theme

  const themes = [
    { id: 'dark', name: 'Dark Blue', color: '#0f172a' },
    { id: 'midnight-purple', name: 'Midnight Purple', color: '#1a1025' },
    { id: 'emerald-dark', name: 'Emerald Dark', color: '#062e24' },
    { id: 'monochrome-light', name: 'Light Mode', color: '#fafafa' }
  ];

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, themes, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
