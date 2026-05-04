import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const EASE = 'cubic-bezier(.25,.1,.25,1)';

export default function PageTransition() {
  const outerRef = useRef(null);
  const innerRef = useRef(null);
  const location = useLocation();
  const first = useRef(true);

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    if (first.current) {
      first.current = false;
      outer.style.transform = 'translateY(-100%)';
      inner.style.transform = 'translateY(-100%)';
      return;
    }

    inner.style.transition = 'none';
    inner.style.transform = 'translateY(100%)';
    outer.style.transition = 'none';
    outer.style.transform = 'translateY(0%)';
    void outer.offsetHeight;

    requestAnimationFrame(() => {
      // 1) inner panel slides up to cover (200ms)
      inner.style.transition = `transform 200ms ${EASE}`;
      inner.style.transform = 'translateY(0%)';

      // 2) inner panel exits to top (200ms)
      setTimeout(() => {
        inner.style.transition = `transform 200ms ${EASE}`;
        inner.style.transform = 'translateY(-100%)';
      }, 200);

      // 3) outer panel exits to top (500ms)
      setTimeout(() => {
        outer.style.transition = `transform 500ms ${EASE}`;
        outer.style.transform = 'translateY(-100%)';
      }, 400);
    });
  }, [location.pathname]);

  return (
    <>
      <div ref={outerRef} className="page-transition" />
      <div ref={innerRef} className="page-transition-inner" />
    </>
  );
}
