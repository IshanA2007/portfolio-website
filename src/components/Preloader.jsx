import { useEffect, useState } from 'react';

const NAME = 'ISHAN';

export default function Preloader({ onDone }) {
  // 0 = initial (letters below, bars covering)
  // 1 = letters slide in
  // 2 = letters fade out + bars slide down
  // 3 = unmount
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const ts = [
      setTimeout(() => setStage(1), 60),
      setTimeout(() => setStage(2), 1400),
      setTimeout(() => setStage(3), 2700),
      setTimeout(() => onDone?.(), 2900),
    ];
    return () => ts.forEach(clearTimeout);
  }, [onDone]);

  if (stage === 3) return null;

  return (
    <div className="preloader" aria-hidden>
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="preloader-item"
          style={{
            transform: stage >= 2 ? 'translateY(100%)' : 'translateY(0)',
            transitionDelay: stage >= 2 ? `${i * 90}ms` : '0ms',
          }}
        />
      ))}
      <p className="name-text">
        {NAME.split('').map((ch, i) => (
          <span
            key={i}
            style={{
              transform:
                stage >= 2
                  ? 'translateY(110%)'
                  : stage >= 1
                  ? 'translateY(0%)'
                  : 'translateY(110%)',
              opacity: stage >= 2 ? 0 : 1,
              transitionDelay: stage >= 2 ? `${i * 40}ms` : `${i * 60}ms`,
            }}
          >
            {ch}
          </span>
        ))}
      </p>
    </div>
  );
}
