import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaProjectDiagram,
  FaCode,
  FaBriefcase,
  FaGraduationCap,
  FaQuoteLeft,
  FaEnvelope,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaHome,
} from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from '../components/common/ThemeToggle';

const sidebarLinks = [
  { path: '/admin', icon: FaTachometerAlt, label: 'Dashboard' },
  { path: '/admin/projects', icon: FaProjectDiagram, label: 'Projects' },
  { path: '/admin/skills', icon: FaCode, label: 'Skills' },
  { path: '/admin/experience', icon: FaBriefcase, label: 'Experience' },
  { path: '/admin/education', icon: FaGraduationCap, label: 'Education' },
  { path: '/admin/testimonials', icon: FaQuoteLeft, label: 'Testimonials' },
  { path: '/admin/messages', icon: FaEnvelope, label: 'Messages' },
  { path: '/admin/settings', icon: FaCog, label: 'Settings' },
];

const AdminLayout = ({ children, title }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-dark-100 dark:bg-dark-950 flex">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white dark:bg-dark-900 border-r border-dark-200 dark:border-dark-800 transform transition-transform lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 border-b border-dark-200 dark:border-dark-800">
          <h1 className="text-xl font-display font-bold gradient-text">Admin Panel</h1>
          <p className="text-xs text-dark-500 mt-1">{user?.email}</p>
        </div>
        <nav className="p-4 space-y-1">
          {sidebarLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                location.pathname === link.path
                  ? 'bg-primary-500/10 text-primary-600 dark:text-primary-400'
                  : 'text-dark-600 dark:text-dark-400 hover:bg-dark-100 dark:hover:bg-dark-800'
              }`}
            >
              <link.icon className="w-4 h-4" />
              {link.label}
            </Link>
          ))}
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-dark-600 dark:text-dark-400 hover:bg-dark-100 dark:hover:bg-dark-800"
          >
            <FaHome className="w-4 h-4" />
            View Site
          </Link>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white dark:bg-dark-900 border-b border-dark-200 dark:border-dark-800 px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-dark-100 dark:hover:bg-dark-800"
            >
              {sidebarOpen ? <FaTimes /> : <FaBars />}
            </button>
            <h2 className="text-lg font-semibold">{title}</h2>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-red-500 hover:bg-red-500/10 transition-colors"
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-8 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
