import { Route, Routes } from 'react-router-dom';
import FacultyPage from './FacultyPage.jsx';
import HomePage from './HomePage.jsx';
import StudentPage from './StudentPage.jsx';
import AdminPage from './AdminPage.jsx';
import StudentLogin from './StudentLogin.jsx';
import FacultyLogin from './FacultyLogin.jsx';
import StudentProfile from './StudentProfile.jsx';
import UploadDocs from './components/UploadDocs.jsx';
import Preloader from './components/Preloader.jsx';
import FacultyDashboard from './FacultyDashboard.jsx';
import FacultySettings from './FacultySettings.jsx';
import FacultyProfile from './FacultyProfile.jsx';
import AdminLogin from './AdminLogin.jsx';
import WorkExperiences from './components/WorkExperiences.jsx';
import Competitions from './components/Competitions.jsx';
import { useState, useEffect } from 'react';
import AdminDashboard from './AdminDashboard.jsx';
import FacultyApprovalPage from './FacultyApprovalPage.jsx';

export default function App() {
 const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setLoading(false);
        localStorage.setItem('preloaderShown', 'true');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  if (loading) {
    return <Preloader />;
  }

  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/faculty' element={<FacultyPage />} />
      <Route path='/faculty-login' element={<FacultyLogin />} />
      <Route path='/student' element={<StudentPage />} />
      <Route path='/admin' element={<AdminPage />} />
      <Route path='/student-login' element={<StudentLogin />} />
      <Route path='/student-profile' element={<StudentProfile />} />
      <Route path='/upload-documents' element={<UploadDocs />} />
      <Route path='/faculty-dashboard' element={<FacultyDashboard />} />
      <Route path='/faculty-settings' element={<FacultySettings />} />
      <Route path='/faculty-profile' element={<FacultyProfile />} />
      <Route path='/admin-login' element={<AdminLogin />} />
      <Route path='/admin-dashboard' element={<AdminDashboard />} />
      <Route path='/work-experiences' element={<WorkExperiences />} />
      <Route path='/competitions' element={<Competitions />} />
      <Route path='/faculty-approval' element={<FacultyApprovalPage />} />
    </Routes>
  );
}
