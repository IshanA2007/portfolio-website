import { useEffect, useRef } from 'react';

const COUNT = 180;

export default function Particles() {
  const rootRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const els = particlesRef.current.filter(Boolean);
    if (!els.length) return;
    const animations = [];

    const layout = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      animations.forEach((a) => a.cancel());
      animations.length = 0;

      els.forEach((el) => {
        const size = Math.random() * 3 + 1;
        const startOpacity = Math.random();
        const startLeft = Math.random() * vw;
        const startTop = Math.random() * (vh + 1);

        el.style.width = `${size}px`;
        el.style.height = `${size}px`;
        el.style.left = `${startLeft}px`;
        el.style.top = `${startTop}px`;
        el.style.opacity = String(startOpacity);

        const duration = (Math.random() * 10 + 10) * 1000;
        const anim = el.animate(
          [
            { transform: 'translateY(0)', opacity: startOpacity },
            { transform: `translateY(${vh}px)`, opacity: 0 },
          ],
          { duration, iterations: Infinity, easing: 'linear' },
        );
        animations.push(anim);
      });
    };

    layout();
    window.addEventListener('resize', layout);
    return () => {
      window.removeEventListener('resize', layout);
      animations.forEach((a) => a.cancel());
    };
  }, []);

  return (
    <div ref={rootRef} className="particles-bg" aria-hidden>
      {Array.from({ length: COUNT }).map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            particlesRef.current[i] = el;
          }}
          className="particle"
        />
      ))}
    </div>
  );
}
