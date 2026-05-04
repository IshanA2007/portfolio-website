import { useEffect, useRef, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigationType } from 'react-router-dom';
import { useReveal } from './hooks/useReveal.js';
import Cursor from './components/Cursor.jsx';
import Particles from './components/Particles.jsx';
import Navbar from './components/Navbar.jsx';
import ScrollBar from './components/ScrollBar.jsx';
import Hero from './components/Hero.jsx';
import AboutMe from './components/AboutMe.jsx';
import Skills from './components/Skills.jsx';
import Experiences from './components/Experiences.jsx';
import Projects from './components/Projects.jsx';
import Footer from './components/Footer.jsx';
import Preloader from './components/Preloader.jsx';
import PageTransition from './components/PageTransition.jsx';
import ProjectDetails from './components/ProjectDetails.jsx';
import { Analytics } from '@vercel/analytics/react';

function StickyEmail() {
  return (
    <a className="sticky-email" href="mailto:ishan.ajwani.7@gmail.com">ishan.ajwani.7@gmail.com</a>
  );
}

function HomePage() {
  const onNav = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  return (
    <>
      <Navbar onNav={onNav} />
      <ScrollBar />
      <main>
        <Hero />
        <AboutMe />
        <Skills />
        <Experiences />
        <Projects />
        <Footer />
      </main>
    </>
  );
}

function ProjectPage() {
  return (
    <>
      <Navbar onNav={() => {}} />
      <main>
        <ProjectDetails />
      </main>
    </>
  );
}

function Shell() {
  useReveal();
  const location = useLocation();
  const navType = useNavigationType();
  const scrollMap = useRef(new Map());
  const lastPath = useRef(location.pathname);

  useEffect(() => {
    const onScroll = () => {
      scrollMap.current.set(lastPath.current, window.scrollY);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (navType === 'POP') {
      const saved = scrollMap.current.get(location.pathname) ?? 0;
      // Defer until paint so the destination's layout is in place.
      requestAnimationFrame(() => {
        window.scrollTo(0, saved);
        // Re-scroll after the page-transition curtain finishes (~900ms),
        // since intervening style changes can otherwise nudge the document height.
        setTimeout(() => window.scrollTo(0, saved), 950);
      });
    } else {
      window.scrollTo(0, 0);
    }
    lastPath.current = location.pathname;
  }, [location.pathname, navType]);

  return (
    <>
      <PageTransition />
      <Cursor />
      <Particles />
      <StickyEmail />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects/:slug" element={<ProjectPage />} />
      </Routes>
    </>
  );
}

export default function App() {
  const [showPreloader, setShowPreloader] = useState(true);

  return (
    <BrowserRouter>
      {showPreloader && <Preloader onDone={() => setShowPreloader(false)} />}
      <Shell />
      <Analytics />
    </BrowserRouter>
  );
}
