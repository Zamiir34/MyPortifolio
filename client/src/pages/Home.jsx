import { useEffect, useState } from 'react';
import api from '../services/api';
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

const Home = () => {
  const [profile, setProfile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [education, setEducation] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, skillsRes, projectsRes, expRes, eduRes, testRes] = await Promise.all([
          api.get('/auth/profile'),
          api.get('/skills'),
          api.get('/projects'),
          api.get('/experiences'),
          api.get('/education'),
          api.get('/testimonials'),
        ]);
        setProfile(profileRes.data);
        setSkills(skillsRes.data);
        setProjects(projectsRes.data);
        setExperiences(expRes.data);
        setEducation(eduRes.data);
        setTestimonials(testRes.data);
      } catch (err) {
        console.error('Failed to fetch data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <MainLayout profile={profile}>
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
