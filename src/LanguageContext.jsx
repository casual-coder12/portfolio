import { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

/**
 * Custom hook to access the language context.
 * @returns {{ language: string, toggleLanguage: function }} The current language and a function to toggle it.
 */
export const useLanguage = () => useContext(LanguageContext);

/**
 * LanguageProvider wraps the application and provides global state for internationalization.
 * Supports switching between predefined languages (e.g., Serbian and English).
 */
export const LanguageProvider = ({ children }) => {
  // State for the currently selected language
  const [language, setLanguage] = useState('sr'); // 'sr' ili 'en'

  /**
   * Toggles the active language between Serbian ('sr') and English ('en').
   */
  const toggleLanguage = () => {
    setLanguage(prev => prev === 'sr' ? 'en' : 'sr');
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
