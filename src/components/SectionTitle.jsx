export default function SectionTitle({ title }) {
  return (
    <div className="reveal" style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 36 }}>
      <img src="/assets/section-flower.svg" width="22" height="22" className="flower-spin" alt="" />
      <h2 style={{
        fontFamily: 'var(--font-body)',
        fontSize: 18,
        textTransform: 'uppercase',
        letterSpacing: '0.16em',
        margin: 0,
        color: 'var(--fg-soft)',
        fontWeight: 400,
        whiteSpace: 'nowrap',
      }}>{title}</h2>
    </div>
  );
}
