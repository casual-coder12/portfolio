import { useLanguage } from '../LanguageContext';
import { t } from '../translations';
import './About.css';

/**
 * About component displays a brief professional biography and a list of technical skills.
 * The textual content automatically adjusts based on the selected language.
 */
export default function About() {
  const { language } = useLanguage();
  const content = t[language].about;

  const skills = [
    "Python (Flask, NumPy, Pandas)", "Machine Learning (scikit-learn)", 
    "Mathematics & Physics", "MATLAB", "Mathematica", 
    "SQL (MySQL, PostgreSQL)", "React / Node.js", "C++", "Java", "Git"
  ];

  return (
    <section id="about" className="about-section container">
      <div className="section-header">
        <h2>{content.title}</h2>
        <div className="underline"></div>
      </div>
      
      <div className="about-content glass-panel">
        <div className="about-text">
          <h3>{content.subtitle}</h3>
          <p dangerouslySetInnerHTML={{ __html: content.p1 }}></p>
          <p dangerouslySetInnerHTML={{ __html: content.p2 }}></p>
        </div>
        
        <div className="skills-container">
          <h3>{language === 'sr' ? 'Tehničke veštine' : 'Technical Skills'}</h3>
          <div className="skills-grid">
            {skills.map((skill, index) => (
              <div key={index} className="skill-badge" style={{animationDelay: `${index * 0.1}s`}}>
                {skill}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
