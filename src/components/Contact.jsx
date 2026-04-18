import { useLanguage } from '../LanguageContext';
import { t } from '../translations';
import './Contact.css';

export default function Contact() {
  const { language } = useLanguage();
  const content = t[language].contact;

  return (
    <section id="contact" className="contact-section container">
      <div className="contact-container glass-panel">
        <div className="contact-info">
          <h2>{content.title}</h2>
          <p>{content.text}</p>
          <div className="contact-details">
            <div className="contact-item">
              <span className="icon">📧</span>
              <a href="mailto:87vladan@gmail.com">87vladan@gmail.com</a>
            </div>
            <div className="contact-item">
              <span className="icon">💼</span>
              <a href="#" target="_blank" rel="noreferrer">LinkedIn Profil</a>
            </div>
            <div className="contact-item">
              <span className="icon">🐙</span>
              <a href="#" target="_blank" rel="noreferrer">GitHub Profil</a>
            </div>
          </div>
        </div>
        
        <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <label htmlFor="name">{content.labels.name}</label>
            <input type="text" id="name" placeholder={content.labels.namePh} />
          </div>
          <div className="form-group">
            <label htmlFor="email">{content.labels.email}</label>
            <input type="email" id="email" placeholder={content.labels.emailPh} />
          </div>
          <div className="form-group">
            <label htmlFor="message">{content.labels.message}</label>
            <textarea id="message" rows="5" placeholder={content.labels.messagePh}></textarea>
          </div>
          <button type="submit" className="btn-primary w-100">{content.labels.btnSubmit}</button>
        </form>
      </div>
    </section>
  );
}
