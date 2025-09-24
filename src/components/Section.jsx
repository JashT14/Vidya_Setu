export default function Section({ id, title, subtitle, children, bg }) {
  const sectionStyle = {
    background: bg || '#fff',
    padding: '38px 0',
    width: '100vw',
    position: 'relative',
    left: '50%',
    right: '50%',
    marginLeft: '-50vw',
    marginRight: '-50vw'
  }

  const wrapperStyle = {
    maxWidth: 1400,
    padding: '0 32px',
    margin: '0 auto'
  }

  const headingStyle = {
    fontSize: 28,
    color: '#222',
    fontWeight: 700,
    marginBottom: 6
  }

  const subtitleStyle = {
    color: '#444',
    fontSize: 16,
    marginBottom: 22
  }

  return (
    <section id={id} className="section" style={sectionStyle}>
      <div className="container" style={wrapperStyle}>
        <h2 style={headingStyle}>{title}</h2>
        {subtitle && <div className="sub" style={subtitleStyle}>{subtitle}</div>}
        {children}
      </div>
    </section>
  )
}
