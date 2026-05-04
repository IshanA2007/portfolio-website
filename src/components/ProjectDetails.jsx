import { useEffect, useRef } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { PROJECTS } from '../data/projects.js';
import TransitionLink from './TransitionLink.jsx';

function ArrowLeftIcon(props) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

function ExternalLinkIcon({ size = 30 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

export default function ProjectDetails() {
  const { slug } = useParams();
  const project = PROJECTS.find((p) => p.slug === slug);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const items = containerRef.current.querySelectorAll('.fade-in-later');
    items.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 600ms cubic-bezier(.2,.7,.2,1), transform 600ms cubic-bezier(.2,.7,.2,1)';
      el.style.transitionDelay = 500 + i * 100 + 'ms';
    });
    const t = setTimeout(() => {
      items.forEach((el) => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      });
    }, 30);
    return () => clearTimeout(t);
  }, [slug]);

  if (!project) return <Navigate to="/" replace />;

  const imagesToShow = project.images.map((src) => ({ src, label: '' }));
  const hasImages = imagesToShow.length > 0;

  useEffect(() => {
    if (!hasImages) return;
    if (window.innerWidth < 992) return;
    const info = document.getElementById('info');
    const images = document.getElementById('images');
    if (!info || !images) return;
    const inner = info.querySelector('.proj-info-inner');
    if (!inner) return;

    let raf = 0;
    const apply = () => {
      const imgRect = images.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = Math.min(1, Math.max(0, (vh - imgRect.top) / vh));
      inner.style.filter = `blur(${progress * 3}px)`;
      inner.style.opacity = String(1 - progress);
      inner.style.transform = `scale(${1 - progress * 0.1})`;
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(apply);
    };
    apply();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
      inner.style.filter = '';
      inner.style.opacity = '';
      inner.style.transform = '';
    };
  }, [hasImages, slug]);

  return (
    <section className={'project-details' + (hasImages ? ' has-images' : '')}>
      <div className="container" ref={containerRef}>
        <TransitionLink to="/" back className="back-link group">
          <ArrowLeftIcon className="back-arrow" />
          Back
        </TransitionLink>

        <div className="proj-info" id="info">
          <div className="proj-info-inner">
            <div className="proj-header fade-in-later">
              <h1 className="proj-title">
                <span>{project.title}</span>
              </h1>
              <div className="proj-links fade-in-later">
                {project.sourceCode && (
                  <a href={project.sourceCode} target="_blank" rel="noreferrer noopener" aria-label="Source code">
                    <GithubIcon />
                  </a>
                )}
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noreferrer noopener" aria-label="Live site">
                    <ExternalLinkIcon />
                  </a>
                )}
              </div>
            </div>

            <div className="proj-body">
              <div className="fade-in-later proj-block">
                <p className="proj-label">Year</p>
                <div className="proj-value">{project.year}</div>
              </div>
              <div className="fade-in-later proj-block">
                <p className="proj-label">Tech &amp; Technique</p>
                <div className="proj-value">{project.techStack.join(', ')}</div>
              </div>
              <div className="fade-in-later proj-block">
                <p className="proj-label">Description</p>
                <div
                  className="proj-value markdown-text"
                  dangerouslySetInnerHTML={{ __html: project.description }}
                />
              </div>
              {project.role && (
                <div className="fade-in-later proj-block">
                  <p className="proj-label">My Role</p>
                  <div
                    className="proj-value markdown-text"
                    dangerouslySetInnerHTML={{ __html: project.role }}
                  />
                </div>
              )}
            </div>

            {hasImages && (
              <svg className="proj-arrow arrow-anim" width="220" height="64" viewBox="0 0 376 111" fill="none">
                <path d="M1 1V39.9286L188 110V70.6822L1 1Z" stroke="#3F7D3A" strokeWidth="1.5" />
                <path d="M375 1V39.9286L188 110V70.6822L375 1Z" stroke="#3F7D3A" strokeWidth="1.5" />
              </svg>
            )}
          </div>
        </div>

        {hasImages && (
          <div className="proj-images fade-in-later" id="images">
            {imagesToShow.map((img, i) => (
              <div key={i} className="proj-image has-image">
                <img src={img.src} alt="" className="proj-image-img" loading="lazy" />
                <a
                  href={img.src}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="proj-image-link"
                  aria-label="Open image"
                >
                  <ExternalLinkIcon size={22} />
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
