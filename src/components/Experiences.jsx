import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import SectionTitle from './SectionTitle.jsx';

const EXPERIENCES = [
  {
    title: 'App Developer Intern',
    company: 'Sorcea',
    duration: 'Jan 2026 to now',
    bullets: [
      'Building the product comparison feature, one of the five main pages in the app, and shipping it as a real release on the App Store.',
      'Wrote the comparison UI as a set of reusable Flutter components so similar pages after it took about 40% less time to put together.',
    ],
  },
  {
    title: 'Software Developer and UI/UX',
    company: 'theCourseForum',
    duration: 'Sep 2025 to now',
    bullets: [
      'Built an AI-powered search using RAG on top of Django and AWS Bedrock. Finding courses got around twice as fast for students.',
      'Shipped the Q&A page end-to-end so people can post and answer course-specific questions. Django, Postgres, AWS.',
    ],
  },
  {
    title: 'Software Developer Intern',
    company: 'PCCW Global',
    duration: 'Jun 2023 to Aug 2025',
    bullets: [
      'Wrote a Python CLI for router management with 20+ REST API commands. Cut a recurring manual task from around two hours to under one.',
      'Wired up OpenTelemetry, Prometheus, Grafana, and Jaeger across a few production services so we could actually find where things were breaking.',
      'Containerized the observability stack on GKE and set up CI/CD with SonarQube checks, which caught a handful of bad deploys before they shipped.',
    ],
  },
  {
    title: 'Co-President',
    company: 'Claude Builders Club at UVA',
    duration: 'Feb 2026 to now',
    bullets: [
      'Helping run a club focused on building stuff with Claude and Claude Code.',
      'Got membership up to 50+ by running workshops and live build sessions on real codebases.',
    ],
  },
  {
    title: 'Executive',
    company: 'Machine Learning at UVA',
    duration: 'Jan 2026 to now',
    bullets: [
      'On the exec team. Helping bring hands-on ML to 40+ students through a technical consulting initiative.',
      'Pulled in over $1K in sponsor funding through outreach and some internal tooling I built for the team.',
    ],
  },
  {
    title: 'President',
    company: 'TJ Mobile Apps Club',
    duration: 'Jun 2024 to Jun 2025',
    bullets: [
      'Grew the club from 7 members to 50+ by writing a 17-week mobile dev curriculum and partnering with a small LLC for real project work.',
      'Built a Django engagement platform so we could actually tell who was showing up and what they were working on.',
    ],
  },
];

export default function Experiences() {
  const [active, setActive] = useState(0);
  const [stackY, setStackY] = useState(0);
  const rowRefs = useRef([]);
  const cardRefs = useRef([]);
  const listRef = useRef(null);

  const recomputeStackY = () => {
    const list = listRef.current;
    const activeCard = cardRefs.current[active];
    const activeRow = rowRefs.current[active];
    if (!list || !activeCard || !activeRow) return;
    const rowOffsetTop =
      activeRow.getBoundingClientRect().top - list.getBoundingClientRect().top;
    const cardOffsetTop = activeCard.offsetTop;
    setStackY(rowOffsetTop - cardOffsetTop);
  };

  useLayoutEffect(() => {
    recomputeStackY();
  });

  useEffect(() => {
    window.addEventListener('resize', recomputeStackY);
    return () => window.removeEventListener('resize', recomputeStackY);
  });

  useEffect(() => {
    const pickActive = () => {
      const focal = window.innerHeight * 0.4;
      let bestI = 0;
      let bestDist = Infinity;
      rowRefs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const center = r.top + r.height / 2;
        const dist = Math.abs(center - focal);
        if (dist < bestDist) {
          bestDist = dist;
          bestI = i;
        }
      });
      setActive(bestI);
    };
    pickActive();
    window.addEventListener('scroll', pickActive, { passive: true });
    window.addEventListener('resize', pickActive);
    return () => {
      window.removeEventListener('scroll', pickActive);
      window.removeEventListener('resize', pickActive);
    };
  }, []);

  return (
    <section className="section section-lg" id="my-experience">
      <div className="container">
        <SectionTitle title="My Experience" />

        <div className="exp-grid">
          <div className="exp-list" ref={listRef}>
            {EXPERIENCES.map((item, i) => (
              <div
                key={item.company + item.title}
                ref={(el) => { rowRefs.current[i] = el; }}
                className={'exp exp-row reveal' + (i === active ? ' is-active' : '')}
                data-reveal-delay={i * 60}
                aria-current={i === active ? 'true' : undefined}
              >
                <div className="exp-row-bar" aria-hidden />
                <div className="exp-row-text">
                  <div className="company">{item.company}</div>
                  <div className="title">{item.title}</div>
                  <div className="duration">{item.duration}</div>
                  <ul className="exp-row-bullets">
                    {item.bullets.map((b, j) => (
                      <li key={j}>{b}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <aside className="exp-details" aria-live="polite">
            <span className="exp-details-line" aria-hidden />
            <div
              className="exp-card-stack"
              style={{ transform: `translateY(${stackY}px)` }}
            >
              {EXPERIENCES.map((item, i) => (
                <div
                  key={i}
                  ref={(el) => { cardRefs.current[i] = el; }}
                  className={'exp-card ' + (i === active ? 'is-active' : 'is-faint')}
                  aria-hidden={i !== active}
                >
                  <div className="exp-card-eyebrow">{item.company}</div>
                  <div className="exp-card-duration">{item.duration}</div>
                  <ul className="exp-card-bullets">
                    {item.bullets.map((b, j) => (
                      <li key={j}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
