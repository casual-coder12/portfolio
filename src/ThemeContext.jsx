import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

/**
 * Custom hook to access the theme context.
 * @returns {{ theme: string, themes: Array, changeTheme: function }} The current theme state and theme utilities.
 */
export const useTheme = () => useContext(ThemeContext);

/**
 * ThemeProvider manages the global application theme.
 * Re-applies a data attribute to the HTML root when the theme changes, 
 * which drives CSS variable updates for different color schemes.
 */
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('midnight-purple'); // default theme

  // Define available theme palettes
  const themes = [
    { id: 'dark', name: 'Dark Blue', color: '#0f172a' },
    { id: 'midnight-purple', name: 'Midnight Purple', color: '#1a1025' },
    { id: 'emerald-dark', name: 'Emerald Dark', color: '#062e24' },
    { id: 'monochrome-light', name: 'Light Mode', color: '#fafafa' }
  ];

  // Update the data-theme attribute on the root element whenever the theme changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  /**
   * Changes the active theme to the given theme ID.
   * @param {string} newTheme - The ID of the theme to switch to.
   */
  const changeTheme = (newTheme) => {
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, themes, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
