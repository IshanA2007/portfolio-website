import { Fragment, useEffect, useRef, useState } from 'react';
import SectionTitle from './SectionTitle.jsx';
import TransitionLink from './TransitionLink.jsx';
import { PROJECTS } from '../data/projects.js';

export default function Projects() {
  const [hovered, setHovered] = useState(null);
  const previewRef = useRef(null);
  const containerRef = useRef(null);
  const followRef = useRef({ targetY: 0, currentY: 0, raf: 0, clientY: null });

  const pickHoveredFromCursor = () => {
    if (window.innerWidth < 768) return;
    const y = followRef.current.clientY;
    if (y == null || !containerRef.current) return;
    const cRect = containerRef.current.getBoundingClientRect();
    if (y < cRect.top || y > cRect.bottom) {
      setHovered((h) => (h === null ? h : null));
      return;
    }
    const rows = containerRef.current.querySelectorAll('.project-row');
    let foundIdx = null;
    for (let i = 0; i < rows.length; i++) {
      const r = rows[i].getBoundingClientRect();
      if (y >= r.top && y <= r.bottom) { foundIdx = i; break; }
    }
    setHovered((h) => (h === foundIdx ? h : foundIdx));
  };

  useEffect(() => {
    const onScroll = () => pickHoveredFromCursor();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const recomputeTarget = () => {
    if (!containerRef.current || !previewRef.current) return;
    if (followRef.current.clientY == null) return;
    const rect = containerRef.current.getBoundingClientRect();
    const previewH = previewRef.current.offsetHeight || 360;
    followRef.current.targetY = (followRef.current.clientY - rect.top) - previewH / 2;
  };

  useEffect(() => {
    const tick = () => {
      const s = followRef.current;
      recomputeTarget();
      s.currentY += (s.targetY - s.currentY) * 0.18;
      if (previewRef.current) {
        previewRef.current.style.transform = `translateY(${s.currentY}px)`;
      }
      s.raf = requestAnimationFrame(tick);
    };
    followRef.current.raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(followRef.current.raf);
  }, []);

  const onMove = (e) => {
    if (window.innerWidth < 768) return;
    followRef.current.clientY = e.clientY;
    recomputeTarget();
  };

  useEffect(() => {
    document.querySelectorAll('.ext-link-svg path').forEach((p) => {
      const len = Math.ceil(p.getTotalLength());
      p.style.setProperty('--len', String(len));
      p.style.strokeDasharray = String(len);
      p.style.strokeDashoffset = String(len);
    });
  }, []);

  return (
    <section className="section" id="selected-projects">
      <div className="container">
        <SectionTitle title="Selected Projects" />

        <div
          ref={containerRef}
          className={'project-list' + (hovered !== null ? ' is-tracking' : '')}
          style={{ position: 'relative' }}
          onMouseMove={onMove}
          onMouseLeave={() => setHovered(null)}
        >
          <div
            ref={previewRef}
            className={'proj-preview ' + (hovered !== null ? 'show' : '')}
          >
            <div className="ph">{hovered !== null ? (PROJECTS[hovered].tagline || PROJECTS[hovered].title) : ''}</div>
          </div>

          {PROJECTS.map((p, i) => (
            <TransitionLink
              key={p.slug}
              to={`/projects/${p.slug}`}
              className={'project-row reveal' + (hovered === i ? ' is-row-hover' : '')}
              data-reveal-delay={i * 50}
              data-sweep={i % 2 === 0 ? 'ltr' : 'rtl'}
              onMouseEnter={() => setHovered(i)}
              onMouseMove={(e) => {
                followRef.current.clientY = e.clientY;
                setHovered((h) => (h === i ? h : i));
              }}
            >
              <span className="num">_{String(i + 1).padStart(2, '0')}.</span>
              <div className="row-body">
                <h3 className="title">
                  <span className="title-text">{p.title}</span>
                  <span className="ext-link" aria-hidden>
                    <svg
                      className="ext-link-svg"
                      xmlns="http://www.w3.org/2000/svg"
                      width="36"
                      height="36"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path id="box" d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <path id="arrow-line" d="M10 14 21 3" />
                      <path id="arrow-curb" d="M15 3h6v6" />
                    </svg>
                  </span>
                </h3>
                <div className="stack">
                  {p.techStack.slice(0, 3).map((s, idx) => (
                    <Fragment key={s}>
                      <span>{s}</span>
                      {idx < Math.min(p.techStack.length, 3) - 1 && <span className="dot"></span>}
                    </Fragment>
                  ))}
                </div>
              </div>
            </TransitionLink>
          ))}
        </div>
      </div>
    </section>
  );
}
