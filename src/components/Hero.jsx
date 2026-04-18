import { useLanguage } from '../LanguageContext';
import { t } from '../translations';
import './Hero.css';

export default function Hero() {
  const { language } = useLanguage();
  const content = t[language].hero;

  return (
    <section id="home" className="hero-section">
      <div className="hero-content container">
        <div className="hero-text animate-on-load">
          <p className="greeting">{content.greeting}</p>
          <h1 className="name">Vladan Simić</h1>
          <h2 className="role" dangerouslySetInnerHTML={{ __html: content.role }}></h2>
          <p className="description" dangerouslySetInnerHTML={{ __html: content.description }}></p>
          <div className="hero-cta">
            <a href="#projects" className="btn-primary">{content.btnProjects}</a>
            <a href="#contact" className="btn-secondary">{content.btnContact}</a>
          </div>
        </div>
        
        <div className="hero-visual animate-on-load" style={{ animationDelay: '0.2s' }}>
          <div className="blob-shape">
            <div className="profile-placeholder">
              <span>VS</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
