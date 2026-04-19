import { useState } from 'react';
import { useLanguage } from '../LanguageContext';
import { t } from '../translations';
import './Projects.css';

export default function Projects() {
  const { language } = useLanguage();
  const [activePosters, setActivePosters] = useState(null);
  const content = t[language].projects;
  const projects = content.items;

  return (
    <section id="projects" className="projects-section container">
      <div className="section-header">
        <h2>{content.title}</h2>
        <div className="underline"></div>
      </div>
      
      <div className="projects-grid">
        {projects.map((project, index) => (
          <div className="project-card glass-panel" key={index}>
            <div className="project-content">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-tags">
                {project.tags.map((tag, i) => (
                  <span key={i} className="tag">{tag}</span>
                ))}
              </div>
            </div>
            <div className="project-actions">
              {project.posters && (
                <button 
                  className="btn-primary" 
                  onClick={() => setActivePosters(project.posters)}
                >
                  {content.btnDetails}
                </button>
              )}
              {/* 
              !project.posters && (
                <a 
                  href={project.link} 
                  className="btn-primary"
                  target={project.link !== "#" ? "_blank" : "_self"} 
                  rel="noopener noreferrer"
                >
                  {content.btnDetails}
                </a>
              )
              */}
            </div>
          </div>
        ))}
      </div>

      {activePosters && (
        <div className="posters-modal" onClick={() => setActivePosters(null)}>
          <div className="posters-modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-modal-btn" onClick={() => setActivePosters(null)}>✖ Zatvori</button>
            <div className="posters-container">
              {activePosters.map((poster, index) => (
                poster.toLowerCase().endsWith('.jpg') || poster.toLowerCase().endsWith('.png') ? (
                  <img key={index} src={poster} alt={`Poster ${index + 1}`} className="poster-img" />
                ) : (
                  <iframe key={index} src={poster} title={`Poster ${index + 1}`} className="poster-iframe" />
                )
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
