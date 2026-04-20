import { useState, useRef } from 'react';
import { useLanguage } from '../LanguageContext';
import { useTheme } from '../ThemeContext';
import { t } from '../translations';
import './Contact.css';
import emailjs from '@emailjs/browser';
import ReCAPTCHA from 'react-google-recaptcha';

/**
 * Contact component handles user inquiries using EmailJS and reCAPTCHA for spam prevention.
 * It provides a form for users to send messages directly to the configured email address.
 */
export default function Contact() {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const content = t[language].contact;

  // References to form elements and third-party components
  const form = useRef();
  const recaptchaRef = useRef();
  const submitTimeRef = useRef();

  // State variables for tracking form submission progress and outcome
  const [isSending, setIsSending] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const [recaptchaError, setRecaptchaError] = useState(false);

  /**
   * Handles the form submission event.
   * Validates reCAPTCHA, records submission time, and dispatches the email via EmailJS.
   */
  const sendEmail = (e) => {
    // 1. Prevent the default browser behavior of refreshing the page upon form submission
    e.preventDefault();

    // 2. Extract the current value/token from the reCAPTCHA widget
    const recaptchaValue = recaptchaRef.current.getValue();
    
    // 3. Verify if the user has successfully solved the reCAPTCHA challenge
    if (!recaptchaValue) {
      // If no token exists, display the reCAPTCHA error message and abort the submission
      setRecaptchaError(true);
      return;
    }
    // Clear any previous reCAPTCHA errors if the challenge was successful
    setRecaptchaError(false);

    // 4. Capture the exact local time of submission as a hidden form field 
    // Format is tailored to Serbian locale ('sr-RS')
    if (submitTimeRef.current) {
      submitTimeRef.current.value = new Date().toLocaleString('sr-RS');
    }

    // 5. Update UI state to reflect the network request is in progress
    // This disables the submit button to prevent duplicate submissions
    setIsSending(true);
    setSubmitStatus(null); // Clear any previous submission status

    // 6. Retrieve EmailJS credentials securely stored in environment variables (Vite requires VITE_ prefix)
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';

    // 7. Dispatch the actual email payload to EmailJS servers
    // We pass the referenced 'form.current' rather than raw state variables,
    // allowing EmailJS to automatically map 'name' attributes from HTML inputs to the email template
    emailjs.sendForm(serviceId, templateId, form.current, publicKey)
      .then(() => {
        // --- Success Handler ---
        setIsSending(false);
        setSubmitStatus('success'); // Triggers the success UI banner
        
        // Reset the form inputs and reCAPTCHA widget for potential future submissions
        form.current.reset();
        recaptchaRef.current.reset();
        
        // Automatically hide the success banner after 5 seconds
        setTimeout(() => setSubmitStatus(null), 5000);
      }, (error) => {
        // --- Error Handler ---
        setIsSending(false);
        setSubmitStatus('error'); // Triggers the error UI banner
        console.error('EmailJS Error:', error); // Log exact API failure for technical debugging
        
        // Automatically hide the error banner after 5 seconds
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

          <div className="form-group recaptcha-group">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY || "YOUR_RECAPTCHA_SITE_KEY_HERE"}
              theme={theme === 'light' ? 'light' : 'dark'}
              onChange={() => setRecaptchaError(false)}
            />
            {recaptchaError && (
              <span className="error-text">
                {content.labels.recaptchaError}
              </span>
            )}
          </div>

          <button type="submit" className="btn-primary w-100" disabled={isSending}>
            {isSending ? content.labels.btnSending : content.labels.btnSubmit}
          </button>

          {submitStatus === 'success' && (
            <div className="form-success">
              {content.labels.success}
            </div>
          )}
          {submitStatus === 'error' && (
            <div className="form-error">
              {content.labels.error}
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
