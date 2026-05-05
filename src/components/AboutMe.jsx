export default function AboutMe() {
  return (
    <section className="section section-lg" id="about-me">
      <div className="container">
        <h2 className="headline-quiet reveal">
          I like building things that feel good to use. The kind of stuff where you can tell someone actually thought about the small parts.
        </h2>

        <span className="eyebrow reveal" data-reveal-delay="60">_01.&nbsp; About me</span>

        <div className="about-grid">
          <p className="reveal about-greeting" data-reveal-delay="120">
            Hi, I'm Ishan.
          </p>
          <div className="about-copy">
            <p className="reveal about-copy-p" data-reveal-delay="180">
              I study computer science at UVA. I started messing around with code in middle school and basically never stopped. Most of my projects come from random ideas I want to try out for myself.
            </p>
            <p className="reveal about-copy-p about-copy-p--gap" data-reveal-delay="240">
              These days I spend most of my time on web stuff and a bit of machine learning on the side. I like making things that I'd actually want to use, and that other people can pick up without thinking too hard about it.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
