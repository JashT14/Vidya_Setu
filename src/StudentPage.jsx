import React from 'react';
import NavbarSection from './components/NavbarSection';
import SidebarSection from './components/SidebarSection';
import CertificatesSection from './components/CertificatesSection';
import TestRecordsSection from './components/TestRecordsSection';

const StudentPage = () => {
  return (
    <>
      <NavbarSection />
      <div style={{ display: 'flex', background: '#f5f8fa', minHeight: '100vh', padding: '2rem' }}>
        <div style={{ minWidth: '260px', marginRight: '2rem' }}>
          <SidebarSection />
        </div>
        <div style={{ flex: 1, maxWidth: '1100px', background: '#fff', borderRadius: '12px', padding: '2rem', boxShadow: '0 2px 8px rgba(60,100,180,0.07)' }}>
          <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ flex: 2 }}>
              <h2 style={{ fontWeight: 'bold', fontSize: '1.25rem', marginBottom: '0.7rem' }}>Contribute – Be Part of a National Mission!</h2>
              <p style={{ marginBottom: '1rem', color: '#222', fontSize: '1rem' }}>
                Go beyond academics! Participate in national initiatives like NSS, NCC, Fit India, and Swachh Bharat. Contribute to society, earn credits, and build your leadership profile recognized by the Government of India.
              </p>
              <button style={{ background: '#1a2e4f', color: '#fff', border: 'none', borderRadius: '6px', padding: '0.7rem 1.5rem', fontWeight: 'bold', cursor: 'pointer', marginBottom: '1.2rem' }}>Explore Opportunities →</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1.2rem' }}>
              <img src="/src/assets/nsslogo.jpg" alt="NSS Logo" style={{ width: '90px', height: '90px', objectFit: 'cover', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }} />
              <img src="/src/assets/pmnarendramodi.jpg.png" alt="Narendra Modi" style={{ width: '90px', height: '90px', objectFit: 'contain', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', background: '#fff' }} />
            </div>
          </div>
          <CertificatesSection />
          <div style={{ marginTop: '2.5rem' }}>
            <TestRecordsSection />
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentPage;
