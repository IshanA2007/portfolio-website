import { useEffect, useRef } from 'react';

export default function Cursor() {
  const ref = useRef(null);
  useEffect(() => {
    if (window.innerWidth < 720) return;
    let raf;
    let tx = 0, ty = 0, x = 0, y = 0;
    const move = (e) => { tx = e.clientX; ty = e.clientY; };
    const tick = () => {
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
      if (ref.current) ref.current.style.transform = `translate(${x}px, ${y}px)`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener('mousemove', move);
    raf = requestAnimationFrame(tick);
    return () => { window.removeEventListener('mousemove', move); cancelAnimationFrame(raf); };
  }, []);
  return (
    <svg ref={ref} className="cursor-svg" width="27" height="30" viewBox="0 0 27 30" fill="none">
      <path d="M20.0995 11.0797L3.72518 1.13204C2.28687 0.258253 0.478228 1.44326 0.704999 3.11083L3.28667 22.0953C3.58333 24.2768 7.33319 24.6415 8.3792 22.7043C9.5038 20.6215 10.8639 18.7382 12.43 17.7122C13.996 16.6861 16.2658 16.1911 18.6244 15.9918C20.8181 15.8063 21.9811 12.2227 20.0995 11.0797Z"
        fill="#1B2118" stroke="#F7F6F1" strokeWidth="1.5"/>
    </svg>
  );
}
