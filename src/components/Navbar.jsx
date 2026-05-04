import { useState } from 'react';

export default function Navbar({ onNav }) {
  const [open, setOpen] = useState(false);
  const links = [
    { name: 'Home', id: 'banner' },
    { name: 'About Me', id: 'about-me' },
    { name: 'Experience', id: 'my-experience' },
    { name: 'Projects', id: 'selected-projects' },
  ];
  const socials = [
    { name: 'github', url: 'https://github.com/IshanA2007' },
    { name: 'linkedin', url: '#' },
    { name: 'email', url: 'mailto:ishan.ajwani.7@gmail.com' },
  ];
  return (
    <>
      <div className="navbar">
        <span />
        <button
          className={'hamburger ' + (open ? 'open' : '')}
          onClick={() => setOpen((o) => !o)}
          aria-label="Menu"
        >
          <span></span><span></span>
        </button>
      </div>

      <div className={'overlay ' + (open ? 'open' : '')} onClick={() => setOpen(false)}></div>

      <aside className={'drawer ' + (open ? 'open' : '')}>
        <div style={{ marginTop: 32 }}>
          <div className="drawer-section-label">Menu</div>
          <ul>
            {links.map((l) => (
              <li key={l.id}>
                <button className="menu-item" onClick={() => { onNav?.(l.id); setOpen(false); }}>
                  <span className="swatch"></span>{l.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="drawer-section-label">Social</div>
          <ul>
            {socials.map((s) => (
              <li key={s.name}>
                <a href={s.url} className="menu-item" style={{ textTransform: 'capitalize' }}>{s.name}</a>
              </li>
            ))}
          </ul>
        </div>
        <div style={{ marginTop: 'auto' }}>
          <div className="drawer-section-label">Get in touch</div>
          <a href="mailto:ishan.ajwani.7@gmail.com" style={{ color: 'var(--fg)', fontSize: 16 }}>ishan.ajwani.7@gmail.com</a>
        </div>
      </aside>
    </>
  );
}
