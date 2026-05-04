import { useEffect, useRef } from 'react';
import SectionTitle from './SectionTitle.jsx';

const STACK = {
  frontend: [
    { name: 'React', icon: '/assets/logos/react.png' },
    { name: 'Next.js', icon: '/assets/logos/next.png' },
    { name: 'TypeScript', icon: '/assets/logos/ts.png' },
    { name: 'JavaScript', icon: '/assets/logos/js.png' },
    { name: 'Tailwind', icon: '/assets/logos/tailwind.png' },
    { name: 'Sass', icon: '/assets/logos/sass.png' },
  ],
  backend: [
    { name: 'Node.js', icon: '/assets/logos/node.png' },
    { name: 'Express', icon: '/assets/logos/express.png' },
    { name: 'Postgres', icon: '/assets/logos/postgreSQL.png' },
    { name: 'MongoDB', icon: '/assets/logos/mongodb.svg' },
  ],
  'ai / ml': [
    { name: 'Python', icon: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg' },
    { name: 'PyTorch', icon: 'https://upload.wikimedia.org/wikipedia/commons/1/10/PyTorch_logo_icon.svg' },
    { name: 'OpenCV', icon: 'https://upload.wikimedia.org/wikipedia/commons/3/32/OpenCV_Logo_with_text_svg_version.svg' },
  ],
  tools: [
    { name: 'Git', icon: '/assets/logos/git.png' },
    { name: 'Docker', icon: '/assets/logos/docker.svg' },
    { name: 'AWS', icon: '/assets/logos/aws.png' },
  ],
};

const clamp = (v, lo = 0, hi = 1) => Math.max(lo, Math.min(hi, v));

export default function Skills() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const items = Array.from(section.querySelectorAll('.slide-up'));
    if (!items.length) return;

    items.forEach((el) => {
      el.style.willChange = 'transform, opacity';
      el.style.transform = 'translateY(40px)';
      el.style.opacity = '0';
    });

    // Mirrors the reference's GSAP timeline:
    //   ScrollTrigger { start: 'top 80%', end: 'bottom 80%', scrub: 0.5 }
    //   tl.from('.slide-up', { y: 40, opacity: 0, ease: 'none', stagger: 0.4 })
    // With duration 0.5 + stagger 0.4 across N items, the total timeline length is
    //   T = (N - 1) * 0.4 + 0.5
    // Each item i runs from t = i*0.4 to t = i*0.4 + 0.5; we map t → scroll progress.
    const N = items.length;
    const stagger = 0.4;
    const dur = 0.5;
    const total = (N - 1) * stagger + dur;

    const update = () => {
      const r = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const startY = vh * 0.8;
      const endY = vh * 0.8;
      const startScroll = r.top - startY;
      const endScroll = r.bottom - endY;
      const progress = clamp(-startScroll / (endScroll === startScroll ? 1 : (-startScroll + (r.bottom - r.top) - (vh - startY) + (vh - endY))), 0, 1);

      // Robust progress: 0 when section.top hits 80%vh, 1 when section.bottom hits 80%vh.
      const span = (r.bottom - r.top) - (startY - endY); // = section height
      const traveled = startY - r.top;
      const p = clamp(traveled / span, 0, 1);

      items.forEach((el, i) => {
        const tStart = i * stagger;
        const tEnd = tStart + dur;
        const local = clamp((p * total - tStart) / dur, 0, 1);
        const y = (1 - local) * 40;
        el.style.transform = `translateY(${y}px)`;
        el.style.opacity = String(local);
      });
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <section className="section" id="my-stack" ref={sectionRef}>
      <div className="container">
        <SectionTitle title="My Stack" />
        <div className="stack-list">
          {Object.entries(STACK).map(([key, items]) => (
            <div className="stack-row" key={key}>
              <div className="stack-key">
                <p className="slide-up">{key}</p>
              </div>
              <div className="stack-items">
                {items.map((item) => (
                  <div className="slide-up stack-item" key={item.name}>
                    <img src={item.icon} alt={item.name} />
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
