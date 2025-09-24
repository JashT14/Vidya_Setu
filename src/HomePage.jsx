import React from 'react'
import academicLogo from './assets/academic.png';
import certificationsLogo from './assets/certifications.png';
import analyticsLogo from './assets/analytics.png';
import otherLogo from './assets/other.png';
import facultyLogo from './assets/faculty.png';
import portfolioLogo from './assets/portfolio.png';
import servicesLogo from './assets/services.png';
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Section from './components/Section.jsx'
import ServiceBox from './components/ServiceBox.jsx'
import Footer from './components/Footer.jsx'
import { studentServices, facultyServices } from './data/services.js'

const HomePage = () => {
  return (
    <>
          <Navbar />
          <Hero />

          <Section
              id="students"
              title="Student Related Services"
              subtitle="All-in-one platform to record certificates, events, and internships—verified and stored digitally for easy access."
          >
              <div className="grid">
                  {studentServices.map((s) => (
                      <ServiceBox
                          key={s.title}
                          title={s.title}
                          desc={s.desc}
                          boxColor={s.box}
                          iconBg={s.iconBg}
                          iconText={s.iconText}
                          logoUrl={
                              s.title === 'Academic Records' ? academicLogo
                                  : s.title === 'Certifications & Courses' ? certificationsLogo
                                      : s.title === 'Activities & Events' ? analyticsLogo
                                          : s.title === 'Other Student Services' ? otherLogo
                                              : ''
                          }
                          serviceType="student"
                      />
                  ))}
              </div>
          </Section>

          <Section
              id="faculty"
              title="Institution / Faculty Related Services"
              subtitle="Services that help faculty and institutions verify student records, generate digital portfolios, create reports for accreditation, and integrate with existing academic systems."
              bg="#f8fafc"
          >
              <div className="grid">
                  {facultyServices.map((s) => (
                      <ServiceBox
                          key={s.title}
                          title={s.title}
                          desc={s.desc}
                          boxColor={s.box}
                          iconBg={s.iconBg}
                          iconText={s.iconText}
                          logoUrl={
                              s.title === 'Faculty Approval Panel' ? facultyLogo
                                  : s.title === 'Digital Portfolio Generator' ? portfolioLogo
                                      : s.title === 'Analytics & Reporting' ? analyticsLogo
                                          : s.title === 'Other Institutional Services' ? servicesLogo
                                              : ''
                          }
                          serviceType="faculty"
                      />
                  ))}
              </div>
          </Section>

          <Footer />
    </>
  )
}

export default HomePage
