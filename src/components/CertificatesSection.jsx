
import React from 'react';
import '../styles/CertificatesSection.css';

const certificates = [
  {
    title: 'Python Programming Essentials – CSE101',
    instructor: 'Dr. S. Kumar',
    schedule: 'Monday & Wednesday',
    time: '09:00 AM – 10:30 AM',
    provider: 'NPTEL',
    className: 'python',
    bg: '#e3eefd',
    ariaLabel: 'Python Programming Essentials certificate card',
  },
  {
    title: 'Full Stack Web Development – CSE202',
    instructor: 'Prof. R. Sharma',
    schedule: 'Tuesday & Thursday',
    time: '01:30 PM – 03:00 PM',
    provider: 'AICTE FDP',
    className: 'web',
    bg: '#ffe7b2',
    ariaLabel: 'Full Stack Web Development certificate card',
  },
  {
    title: 'Data Structures & Algorithms – CSE303',
    instructor: 'Dr. P. Mehta',
    schedule: 'Monday & Saturday',
    time: '11:00 AM – 12:30 PM',
    provider: 'SWAYAM',
    className: 'ds',
    bg: '#d6eafd',
    ariaLabel: 'Data Structures & Algorithms certificate card',
  },
  {
    title: 'Database Management Systems – CSE404',
    instructor: 'Dr. A. Gupta',
    schedule: 'Wednesday',
    time: '02:00 PM – 05:00 PM',
    provider: 'NPTEL',
    className: 'db',
    bg: '#d7f7d7',
    ariaLabel: 'Database Management Systems certificate card',
  },
];

const CertificatesSection = () => (
  <section className="certificates-section" aria-label="Certificates and Courses">
    <h3 className="certificates-title">Certificates and Courses</h3>
    <div className="cert-cards">
      {certificates.map((cert, idx) => (
        <article
          key={cert.title}
          className="cert-card"
          style={{ '--cert-card-bg': cert.bg }}
          aria-label={cert.ariaLabel}
        >
          <div className={`cert-card-title ${cert.className}`}>{cert.title}</div>
          <div>{cert.instructor}</div>
          <div>{cert.schedule}</div>
          <div>{cert.time}</div>
          <div>{cert.provider}</div>
        </article>
      ))}
    </div>
    <div className="cert-view-all" tabIndex={0} role="button" aria-label="View all certificates">
      View all →
    </div>
  </section>
);

export default CertificatesSection;
