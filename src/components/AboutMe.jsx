export default function AboutMe() {
  return (
    <section className="section section-lg" id="about-me">
      <div className="container">
        <h2 className="headline-quiet reveal">
          I like building things that feel good to use. The kind of stuff where you can tell someone actually thought about the small parts.
        </h2>

        <span className="eyebrow reveal" data-reveal-delay="60">_01.&nbsp; About me</span>

        <div style={{ display: 'grid', gridTemplateColumns: '5fr 7fr', gap: 32 }}>
          <p className="reveal" data-reveal-delay="120" style={{ fontSize: 36, fontFamily: 'var(--font-body)', fontWeight: 300, margin: 0, lineHeight: 1.1 }}>
            Hi, I'm Ishan.
          </p>
          <div style={{ maxWidth: 480, color: 'var(--fg-soft)', fontSize: 17, lineHeight: 1.6 }}>
            <p className="reveal" data-reveal-delay="180" style={{ margin: 0 }}>
              I study computer science at UVA. I started messing around with code in middle school and basically never stopped. Most of my projects come from random ideas I want to try out for myself.
            </p>
            <p className="reveal" data-reveal-delay="240" style={{ marginTop: 14, marginBottom: 0 }}>
              These days I spend most of my time on web stuff and a bit of machine learning on the side. I like making things that I'd actually want to use, and that other people can pick up without thinking too hard about it.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
