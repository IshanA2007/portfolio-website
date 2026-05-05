import { useEffect, useState } from 'react';

const HERO_ROLES = [
  { lead: 'SOFTWARE', tail: 'ENGINEER' },
  { lead: 'AI / ML', tail: 'ENTHUSIAST' },
  { lead: 'STUDENT', tail: 'BUILDER' },
];

export default function Hero() {
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState('in');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('out'), 3000);
    const t2 = setTimeout(() => {
      setIdx((i) => (i + 1) % HERO_ROLES.length);
      setPhase('in');
    }, 3400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [idx]);

  const role = HERO_ROLES[idx];

  return (
    <section className="hero" id="banner">
      <div className="container hero-grid">
        <div style={{ maxWidth: 600 }} className="hero-inner">
          <h1 className="reveal" data-reveal-delay="0" style={{ overflow: 'hidden' }}>
            <span className={`role-line role-top role-${phase}`} key={`a-${idx}`}>
              <span className="accent">{role.lead}</span>
            </span>
            <br />
            <span className={`role-line role-bottom role-${phase}`} key={`b-${idx}`} style={{ display: 'inline-block', animationDelay: '40ms' }}>
              {role.tail}
            </span>
          </h1>
          <p className="lead reveal" data-reveal-delay="80">
            Hi, I'm <b style={{ fontWeight: 500, color: 'var(--fg)' }}>Ishan</b>. I study CS at UVA and spend a lot of my free time building stuff. Mostly websites, sometimes little machine learning things when I get curious. Always happy to chat.
          </p>
          <div className="hero-cta reveal" data-reveal-delay="160">
            <a href="mailto:ishan.ajwani.7@gmail.com" className="btn btn-primary">
              <span>Let's Talk</span>
            </a>
            <div className="hero-socials">
              <a
                href="https://github.com/IshanA2007"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="GitHub"
                className="hero-social"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/ishan-ajwani"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="LinkedIn"
                className="hero-social"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>
          </div>
        </div>

      </div>

      <div className="stats">
        <div className="reveal" data-reveal-delay="120">
          <div className="stat-num">5+</div>
          <div className="stat-lbl">Years writing code</div>
        </div>
        <div className="reveal" data-reveal-delay="180">
          <div className="stat-num">10+</div>
          <div className="stat-lbl">Projects I've finished</div>
        </div>
        <div className="reveal" data-reveal-delay="240">
          <div className="stat-num">2029</div>
          <div className="stat-lbl">Graduating from UVA</div>
        </div>
      </div>

      <svg className="arrow-anim hero-arrow" width="280" height="80" viewBox="0 0 376 111" fill="none">
        <path d="M1 1V39.9286L188 110V70.6822L1 1Z" stroke="#3F7D3A" strokeWidth="1.5" />
        <path d="M375 1V39.9286L188 110V70.6822L375 1Z" stroke="#3F7D3A" strokeWidth="1.5" />
      </svg>
    </section>
  );
}
