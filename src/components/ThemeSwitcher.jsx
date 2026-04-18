import { useTheme } from '../ThemeContext';
import { useLanguage } from '../LanguageContext';
import { t } from '../translations';
import './ThemeSwitcher.css';

export default function ThemeSwitcher() {
  const { theme, themes, changeTheme } = useTheme();
  const { language } = useLanguage();
  const content = t[language].nav;

  return (
    <div className="bottom-theme-switcher container">
      <div className="theme-toggle-box glass-panel">
        <span className="theme-label">🎨 {content.theme}:</span>
        <div className="theme-buttons">
          {themes.map((th) => (
            <button 
              key={th.id} 
              className={`theme-option-btn ${theme === th.id ? 'active' : ''}`}
              title={th.name}
              onClick={() => changeTheme(th.id)}
            >
              <span className="color-dot" style={{ backgroundColor: th.color }}></span>
              {th.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
