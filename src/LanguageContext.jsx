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
  // Load from localStorage if available, otherwise default to 'sr'
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('portfolio-language');
    return savedLanguage || 'sr';
  });

  /**
   * Toggles the active language between Serbian ('sr') and English ('en').
   * Also persists the selection to localStorage.
   */
  const toggleLanguage = () => {
    setLanguage(prev => {
      const newLang = prev === 'sr' ? 'en' : 'sr';
      localStorage.setItem('portfolio-language', newLang);
      return newLang;
    });
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
