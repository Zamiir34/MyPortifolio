import { Routes, Route } from 'react-router-dom';
import LoadingScreen from './components/common/LoadingScreen';
import ProtectedRoute from './components/common/ProtectedRoute';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import AdminLogin from './pages/admin/AdminLogin';
import Dashboard from './pages/admin/Dashboard';
import ManageProjects from './pages/admin/ManageProjects';
import ManageSkills from './pages/admin/ManageSkills';
import ManageExperience from './pages/admin/ManageExperience';
import ManageEducation from './pages/admin/ManageEducation';
import ManageTestimonials from './pages/admin/ManageTestimonials';
import ManageMessages from './pages/admin/ManageMessages';
import ProfileSettings from './pages/admin/ProfileSettings';
import { useState, useEffect } from 'react';

function App() {
  const [appLoading, setAppLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setAppLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (appLoading) return <LoadingScreen />;

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/admin/projects" element={<ProtectedRoute><ManageProjects /></ProtectedRoute>} />
      <Route path="/admin/skills" element={<ProtectedRoute><ManageSkills /></ProtectedRoute>} />
      <Route path="/admin/experience" element={<ProtectedRoute><ManageExperience /></ProtectedRoute>} />
      <Route path="/admin/education" element={<ProtectedRoute><ManageEducation /></ProtectedRoute>} />
      <Route path="/admin/testimonials" element={<ProtectedRoute><ManageTestimonials /></ProtectedRoute>} />
      <Route path="/admin/messages" element={<ProtectedRoute><ManageMessages /></ProtectedRoute>} />
      <Route path="/admin/settings" element={<ProtectedRoute><ProfileSettings /></ProtectedRoute>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
