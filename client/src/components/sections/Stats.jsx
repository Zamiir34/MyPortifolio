import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaProjectDiagram, FaCode, FaEnvelope, FaQuoteLeft } from 'react-icons/fa';
import { FadeIn } from '../common/Animate';
import { useInView } from '../../hooks/useInView';
import { useCounter } from '../../hooks/useCounter';
import api from '../../services/api';

const CounterStat = ({ icon: Icon, label, value, delay }) => {
  const [ref, isInView] = useInView({ threshold: 0.5 });
  const [count, startCounter] = useCounter(value, 2000);

  useEffect(() => {
    if (isInView) startCounter();
  }, [isInView, startCounter]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="glass-card p-6 text-center"
    >
      <Icon className="w-8 h-8 text-primary-500 mx-auto mb-3" />
      <p className="text-3xl font-bold gradient-text">{count}+</p>
      <p className="text-sm text-dark-500 mt-1">{label}</p>
    </motion.div>
  );
};

const Stats = () => {
  const [stats, setStats] = useState({ projects: 0, skills: 0, messages: 0, testimonials: 0 });

  useEffect(() => {
    Promise.all([
      api.get('/projects'),
      api.get('/skills'),
      api.get('/testimonials'),
    ]).then(([projects, skills, testimonials]) => {
      setStats({
        projects: projects.data.length,
        skills: skills.data.length,
        messages: 50,
        testimonials: testimonials.data.length,
      });
    });
  }, []);

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <CounterStat icon={FaProjectDiagram} label="Projects" value={stats.projects} delay={0} />
            <CounterStat icon={FaCode} label="Skills" value={stats.skills} delay={0.1} />
            <CounterStat icon={FaEnvelope} label="Happy Clients" value={stats.messages} delay={0.2} />
            <CounterStat icon={FaQuoteLeft} label="Testimonials" value={stats.testimonials} delay={0.3} />
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default Stats;
