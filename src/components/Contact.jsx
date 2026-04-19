import { useState, useRef } from 'react';
import { useLanguage } from '../LanguageContext';
import { useTheme } from '../ThemeContext';
import { t } from '../translations';
import './Contact.css';
import emailjs from '@emailjs/browser';
import ReCAPTCHA from 'react-google-recaptcha';

export default function Contact() {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const content = t[language].contact;
  const form = useRef();
  const recaptchaRef = useRef();
  const submitTimeRef = useRef();

  const [isSending, setIsSending] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const [recaptchaError, setRecaptchaError] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    const recaptchaValue = recaptchaRef.current.getValue();
    if (!recaptchaValue) {
      setRecaptchaError(true);
      return;
    }
    setRecaptchaError(false);

    if (submitTimeRef.current) {
      submitTimeRef.current.value = new Date().toLocaleString('sr-RS');
    }

    setIsSending(true);
    setSubmitStatus(null);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';

    emailjs.sendForm(serviceId, templateId, form.current, publicKey)
      .then(() => {
        setIsSending(false);
        setSubmitStatus('success');
        form.current.reset();
        recaptchaRef.current.reset();
        setTimeout(() => setSubmitStatus(null), 5000);
      }, (error) => {
        setIsSending(false);
        setSubmitStatus('error');
        console.error('EmailJS Error:', error);
        setTimeout(() => setSubmitStatus(null), 5000);
      });
  };

  return (
    <section id="contact" className="contact-section container">
      <div className="contact-container glass-panel">
        <div className="contact-info">
          <h2>{content.title}</h2>
          <p>{content.text}</p>
          <div className="contact-details">
            <div className="contact-item">
              <span className="icon">💼</span>
              <a href="https://www.linkedin.com/in/vladan-simi%C4%87-0b5b17268/" target="_blank" rel="noreferrer">LinkedIn Profil</a>
            </div>
            <div className="contact-item">
              <span className="icon">🐙</span>
              <a href="https://github.com/casual-coder12" target="_blank" rel="noreferrer">GitHub Profil</a>
            </div>
          </div>
        </div>

        <form ref={form} className="contact-form" onSubmit={sendEmail}>
          <input type="hidden" name="submit_time" ref={submitTimeRef} />

          <div className="form-group">
            <label htmlFor="name">{content.labels.name}</label>
            <input type="text" name="user_name" id="name" placeholder={content.labels.namePh} required />
          </div>
          <div className="form-group">
            <label htmlFor="email">{content.labels.email}</label>
            <input type="email" name="user_email" id="email" placeholder={content.labels.emailPh} required />
          </div>
          <div className="form-group">
            <label htmlFor="message">{content.labels.message}</label>
            <textarea id="message" name="message" rows="5" placeholder={content.labels.messagePh} required></textarea>
          </div>

          <div className="form-group recaptcha-group" style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY || "YOUR_RECAPTCHA_SITE_KEY_HERE"}
              theme={theme === 'light' ? 'light' : 'dark'}
              onChange={() => setRecaptchaError(false)}
            />
            {recaptchaError && (
              <span className="error-text" style={{ color: '#ff6b6b', fontSize: '0.85rem', marginTop: '0.5rem' }}>
                {content.labels.recaptchaError}
              </span>
            )}
          </div>

          <button type="submit" className="btn-primary w-100" disabled={isSending}>
            {isSending ? content.labels.btnSending : content.labels.btnSubmit}
          </button>

          {submitStatus === 'success' && (
            <div className="form-success" style={{ color: '#4CAF50', marginTop: '1rem', textAlign: 'center', fontWeight: '500' }}>
              {content.labels.success}
            </div>
          )}
          {submitStatus === 'error' && (
            <div className="form-error" style={{ color: '#ff6b6b', marginTop: '1rem', textAlign: 'center', fontWeight: '500' }}>
              {content.labels.error}
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
