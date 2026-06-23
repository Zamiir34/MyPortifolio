import { useEffect, useState } from 'react';
import api, { fetchWithRetry, wakeUpServer } from '../services/api';
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

const fetchEndpoint = (url) => fetchWithRetry(() => api.get(url), 3, 3000);

const fetchInBatches = async (endpoints) => {
  const results = [];
  const batchSize = 2;

  for (let i = 0; i < endpoints.length; i += batchSize) {
    const batch = endpoints.slice(i, i + batchSize);
    const batchResults = await Promise.allSettled(batch.map((url) => fetchEndpoint(url)));
    results.push(...batchResults);
    if (i + batchSize < endpoints.length) {
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }

  return results;
};

const Home = () => {
  const [profile, setProfile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [education, setEducation] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState('');

  const loadData = async () => {
    setLoading(true);
    setFetchError('');

    try {
      await wakeUpServer();

      const results = await fetchInBatches([
        '/auth/profile',
        '/skills',
        '/projects',
        '/experiences',
        '/education',
        '/testimonials',
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
        setFetchError('Server is waking up. Please wait a moment and click Retry.');
      } else if (failed > 0) {
        setFetchError('Some sections failed to load. Click Retry to refresh.');
      }
    } catch (err) {
      console.error('Failed to fetch data:', err);
      setFetchError('Could not reach the server. Click Retry in a few seconds.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <MainLayout profile={profile}>
      {fetchError && (
        <div className="bg-amber-500/10 border-b border-amber-500/30 text-amber-700 dark:text-amber-300 text-center text-sm py-3 px-4 flex items-center justify-center gap-4">
          <span>{fetchError}</span>
          <button
            onClick={loadData}
            className="px-4 py-1 rounded-lg bg-amber-500 text-white text-xs font-semibold hover:bg-amber-600"
          >
            Retry
          </button>
        </div>
      )}
      <Hero profile={profile} />
      <Stats projects={projects} skills={skills} testimonials={testimonials} />
      <About profile={profile} education={education} />
      <Skills skills={skills} />
      <Projects projects={projects} />
      <Experience experiences={experiences} />
      <EducationSection education={education} />
      <Services />
      <Testimonials testimonials={testimonials} />
      <Contact profile={profile} />
    </MainLayout>
  );
};

export default Home;
