import { useNavigate } from 'react-router-dom';

export default function ServiceBox({ title, desc, boxColor, logoUrl, serviceType = 'student' }) {
  const navigate = useNavigate();

  const handleKnowMore = () => {
    if (serviceType === 'faculty') {
      navigate('/faculty-login');
    } else {
      navigate('/student-login');
    }
  };

  const cardStyle = {
    background: boxColor,
    borderRadius: 18,
    boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
    padding: '24px 32px',
    minWidth: 320,
    maxWidth: 370,
    minHeight: 160,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 0
  }

  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8
  }

  const iconStyle = {
    width: 38,
    height: 38,
    borderRadius: 8,
    objectFit: 'contain',
    marginRight: 6
  }

  const titleStyle = {
    margin: 0,
    fontSize: 18,
    color: '#2176c7',
    fontWeight: 700,
    lineHeight: 1.2
  }

  const descStyle = {
    margin: '8px 0 0 0',
    color: '#2176c7',
    fontSize: 15,
    fontWeight: 400,
    lineHeight: 1.5
  }

  const buttonStyle = {
    marginTop: 16,
    background: '#116530',
    color: '#fff',
    borderRadius: 6,
    padding: '7px 18px',
    fontWeight: 600,
    fontSize: 15,
    border: 0,
    alignSelf: 'flex-end',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
  }

  return (
    <article className="card" style={cardStyle}>
      <div style={headerStyle}>
        <img src={logoUrl} alt={`${title} logo`} style={iconStyle} />
        <h3 style={titleStyle}>{title}</h3>
      </div>
      <p style={descStyle}>{desc}</p>
      <button className="cta" style={buttonStyle} onClick={handleKnowMore}>
        Know More &nbsp; <span className="text-[18px]">&rarr;</span>
      </button>
    </article>
  )
}
