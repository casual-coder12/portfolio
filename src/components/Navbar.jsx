import { useTheme } from '../ThemeContext';
import { useLanguage } from '../LanguageContext';
import { t } from '../translations';
import './Navbar.css';

/**
 * Navbar component provides primary page navigation.
 * Includes anchor links to specific page sections and a global language toggle control.
 */
export default function Navbar() {
  const { theme, themes, changeTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();
  
  const content = t[language].nav;

  return (
    <nav className="glass-panel navbar">
      <div className="nav-brand">VS.</div>
      
      <div className="nav-controls">
        <ul className="nav-links">
          <li><a href="#about">{content.about}</a></li>
          <li><a href="#projects">{content.projects}</a></li>
          <li><a href="#contact">{content.contact}</a></li>
        </ul>
        
        <div className="theme-switcher">
          <button className="theme-btn" onClick={toggleLanguage}>
            🌐 {language === 'sr' ? 'EN' : 'SR'}
          </button>
        </div>
      </div>
    </nav>
  );
}
