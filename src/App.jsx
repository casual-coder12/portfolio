import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'
import ThemeSwitcher from './components/ThemeSwitcher'
import { useLanguage } from './LanguageContext';
import { t } from './translations';
import './App.css'

/**
 * Main application component that assembles the page layout.
 * Renders the Navigation, Hero, About, Projects, Contact sections, and Footer.
 */
function App() {
  const { language } = useLanguage();
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
      <ThemeSwitcher />
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Vladan Simić. {t[language].footer}</p>
      </footer>
    </>
  )
}

export default App
