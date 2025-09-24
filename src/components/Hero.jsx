import logoVS from '../assets/logovidyasetu.jpg'
import classroomImg from '../assets/classroom.jpg'

export default function Hero() {
  const backgroundStyle = {
    position: 'relative',
    minHeight: 320,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '48px 0 24px 0',
    width: '100%',
    background: `linear-gradient(rgba(255,255,255,0.85), rgba(255,255,255,0.85)), url(${classroomImg}) center/cover no-repeat`
  }

  const containerStyle = {
    textAlign: 'center',
    width: '100%'
  }

  const logoStyle = {
    height: 110,
    marginBottom: -18,
    marginTop: 10
  }

  const headingStyle = {
    fontSize: 'clamp(48px, 7vw, 80px)',
    color: '#003366',
    fontWeight: 800,
    margin: 0,
    letterSpacing: '-2px'
  }

  const subtitleStyle = {
    fontSize: '2.1rem',
    fontWeight: 700,
    color: '#222',
    marginTop: 28,
    textAlign: 'center',
    width: '100%'
  }

  const innerWrapStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 0
  }

  return (
    <section className="hero" style={backgroundStyle}>
      <div className="container" style={containerStyle}>
        <div style={innerWrapStyle}>
          <img src={logoVS} alt="Vidya Setu Logo" style={logoStyle} />
          <h1 style={headingStyle}>Vidya Setu</h1>
        </div>
        <div style={subtitleStyle}>
          Showcase Every Achievement &nbsp; &bull; &nbsp; Empower Every Student &nbsp; &bull; &nbsp; Simplify Every Accreditation
        </div>
      </div>
    </section>
  )
}
