import { useEffect } from 'react';

export function useReveal() {
  useEffect(() => {
    let raf = 0;
    let dirty = true;

    const recompute = () => {
      const els = document.querySelectorAll('.reveal');
      const vh = window.innerHeight;
      const leaveAt = vh * 0.12;
      for (const el of els) {
        const r = el.getBoundingClientRect();
        const top = r.top;
        const bottom = r.bottom;
        if (bottom < leaveAt) {
          if (!el.classList.contains('is-leaving')) {
            el.classList.add('is-leaving');
            el.classList.remove('is-visible');
          }
        } else if (top < vh && bottom > 0) {
          if (!el.classList.contains('is-visible')) {
            el.classList.add('is-visible');
            el.classList.remove('is-leaving');
          }
        } else {
          if (el.classList.contains('is-visible') || el.classList.contains('is-leaving')) {
            el.classList.remove('is-visible');
            el.classList.remove('is-leaving');
          }
        }
      }
    };

    const tick = () => {
      raf = 0;
      if (dirty) {
        dirty = false;
        recompute();
      }
    };
    const schedule = () => {
      dirty = true;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    document.querySelectorAll('.reveal').forEach((el) => {
      const d = el.getAttribute('data-reveal-delay');
      if (d) el.style.setProperty('--reveal-delay', d + 'ms');
    });

    schedule();
    setTimeout(schedule, 60);
    setTimeout(schedule, 200);

    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);

    const mo = new MutationObserver(schedule);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      mo.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
}
