import { Helmet } from 'react-helmet-async';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const MainLayout = ({ children, profile }) => {
  return (
    <>
      <Helmet>
        <title>{profile?.fullName ? `${profile.fullName} | ${profile.jobTitle}` : 'Portfolio'}</title>
        <meta name="description" content={profile?.bio || 'Full Stack MERN Developer Portfolio'} />
      </Helmet>
      <div className="min-h-screen bg-dark-50 dark:bg-dark-950 text-dark-900 dark:text-white transition-colors duration-300">
        <Navbar />
        <main>{children}</main>
        <Footer profile={profile} />
      </div>
    </>
  );
};

export default MainLayout;
