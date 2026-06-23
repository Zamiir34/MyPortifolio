import { useEffect, useState } from 'react';
import { FaProjectDiagram, FaCode, FaEnvelope, FaQuoteLeft } from 'react-icons/fa';
import AdminLayout from '../../layouts/AdminLayout';
import api from '../../services/api';

const StatCard = ({ icon: Icon, label, value, color }) => (
  <div className="glass-card p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-dark-500 dark:text-dark-400">{label}</p>
        <p className="text-3xl font-bold mt-1">{value}</p>
      </div>
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get('/dashboard/stats').then((res) => setStats(res.data));
  }, []);

  return (
    <AdminLayout title="Dashboard Overview">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard icon={FaProjectDiagram} label="Total Projects" value={stats?.projects ?? '—'} color="bg-primary-500" />
        <StatCard icon={FaCode} label="Total Skills" value={stats?.skills ?? '—'} color="bg-purple-500" />
        <StatCard icon={FaEnvelope} label="Total Messages" value={stats?.messages ?? '—'} color="bg-pink-500" />
        <StatCard icon={FaQuoteLeft} label="Total Testimonials" value={stats?.testimonials ?? '—'} color="bg-indigo-500" />
      </div>

      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-4">Welcome to Admin Dashboard</h3>
        <p className="text-dark-600 dark:text-dark-400 text-sm leading-relaxed">
          Manage your portfolio content from here. Use the sidebar to navigate between sections.
          {stats?.unreadMessages > 0 && (
            <span className="block mt-2 text-primary-500 font-medium">
              You have {stats.unreadMessages} unread message(s).
            </span>
          )}
        </p>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
