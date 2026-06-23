import { motion } from 'framer-motion';
import {
  FaCode,
  FaLayerGroup,
  FaMobileAlt,
  FaServer,
  FaDatabase,
  FaPaintBrush,
} from 'react-icons/fa';
import { FadeIn, StaggerContainer, StaggerItem } from '../common/Animate';

const services = [
  {
    icon: FaCode,
    title: 'Web Development',
    description: 'Building fast, scalable, and maintainable web applications with modern frameworks.',
  },
  {
    icon: FaLayerGroup,
    title: 'MERN Stack Development',
    description: 'End-to-end solutions using MongoDB, Express, React, and Node.js.',
  },
  {
    icon: FaMobileAlt,
    title: 'Responsive Website Design',
    description: 'Mobile-first designs that look stunning on every device and screen size.',
  },
  {
    icon: FaServer,
    title: 'API Development',
    description: 'RESTful APIs with robust authentication, validation, and documentation.',
  },
  {
    icon: FaDatabase,
    title: 'Database Design',
    description: 'Efficient database schemas and queries for MongoDB and SQL databases.',
  },
  {
    icon: FaPaintBrush,
    title: 'UI/UX Design',
    description: 'Intuitive interfaces with attention to user experience and accessibility.',
  },
];

const Services = () => {
  return (
    <section id="services" className="py-20 md:py-28 bg-dark-100/50 dark:bg-dark-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <h2 className="section-title">Services</h2>
          <p className="section-subtitle mx-auto">
            What I can do for you and your business
          </p>
        </FadeIn>

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <StaggerItem key={service.title}>
              <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                className="glass-card p-8 h-full group cursor-default"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-primary-500/25 transition-shadow">
                  <service.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-3">{service.title}</h3>
                <p className="text-sm text-dark-600 dark:text-dark-400 leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default Services;
