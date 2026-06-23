import { useEffect, useState } from 'react';
import api, { fetchWithRetry } from '../services/api';
import MainLayout from '../layouts/MainLayout';
import LoadingScreen from '../components/common/LoadingScreen';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Skills from '../components/sections/Skills';
import Projects from '../components/sections/Projects';
import Experience from '../components/sections/Experience';
import EducationSection from '../components/sections/Education';
import Services from '../components/sections/Services';
import Testimonials from '../components/sections/Testimonials';
import Contact from '../components/sections/Contact';
import Stats from '../components/sections/Stats';

const fetchEndpoint = (url) => fetchWithRetry(() => api.get(url));

const Home = () => {
  const [profile, setProfile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [education, setEducation] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setFetchError('');
      try {
        const results = await Promise.allSettled([
          fetchEndpoint('/auth/profile'),
          fetchEndpoint('/skills'),
          fetchEndpoint('/projects'),
          fetchEndpoint('/experiences'),
          fetchEndpoint('/education'),
          fetchEndpoint('/testimonials'),
        ]);

        const [profileRes, skillsRes, projectsRes, expRes, eduRes, testRes] = results;

        if (profileRes.status === 'fulfilled') setProfile(profileRes.value.data);
        if (skillsRes.status === 'fulfilled') setSkills(skillsRes.value.data);
        if (projectsRes.status === 'fulfilled') setProjects(projectsRes.value.data);
        if (expRes.status === 'fulfilled') setExperiences(expRes.value.data);
        if (eduRes.status === 'fulfilled') setEducation(eduRes.value.data);
        if (testRes.status === 'fulfilled') setTestimonials(testRes.value.data);

        const failed = results.filter((r) => r.status === 'rejected').length;
        if (failed === results.length) {
          setFetchError('Could not load portfolio data. The server may be waking up — please refresh in a moment.');
        }
      } catch (err) {
        console.error('Failed to fetch data:', err);
        setFetchError('Could not load portfolio data. Please refresh the page.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <MainLayout profile={profile}>
      {fetchError && (
        <div className="bg-amber-500/10 border-b border-amber-500/30 text-amber-700 dark:text-amber-300 text-center text-sm py-3 px-4">
          {fetchError}
        </div>
      )}
      <Hero profile={profile} />
      <Stats />
      <About profile={profile} education={education} />
      <Skills skills={skills} />
      <Projects initialProjects={projects} />
      <Experience experiences={experiences} />
      <EducationSection education={education} />
      <Services />
      <Testimonials testimonials={testimonials} />
      <Contact profile={profile} />
    </MainLayout>
  );
};

export default Home;
