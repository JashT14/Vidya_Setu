
import React from 'react';
import '../styles/HeaderSection.css';

const calendarRows = [
  [null, 1, 2, 3, 4, 5, 6],
  [7, 8, 9, 10, 11, 12, 13],
  [14, 15, 16, 17, 18, 19, 20],
  [21, 22, 23, 24, 25, 26, 27],
  [28, 29, 30, null, null, null, null],
];

const HeaderSection = () => (
  <header className="header-section" aria-label="Header section">
    <div className="header-main">
      <h2 className="header-title">Contribute – Be Part of a National Mission!</h2>
      <p className="header-desc">
        Go beyond academics! Participate in national initiatives like NSS, NCC, Fit India, and
        Swachh Bharat. Contribute to society, earn credits, and build your leadership profile
        recognized by the Government of India.
      </p>
      <button className="header-btn" aria-label="Explore Opportunities">
        Explore Opportunities →
      </button>
    </div>

    <div className="header-logo">
      <img
        src="/src/assets/logovidyasetu.jpg"
        alt="Vidyasetu Logo"
        className="header-logo-img"
      />
      <div className="header-semester">Semester 3 of 8</div>
    </div>
      <div className="header-images">
        <img src="/src/assets/nsslogo.jpg" alt="NSS Logo" className="header-side-img" />
        <img src="/src/assets/pmnarendramodi.jpg.png" alt="Narendra Modi" className="header-side-img" />
      </div>
  </header>
);

export default HeaderSection;
