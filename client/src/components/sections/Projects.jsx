import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaSearch } from 'react-icons/fa';
import { FadeIn, StaggerContainer, StaggerItem } from '../common/Animate';
import api, { getImageUrl } from '../../services/api';

const Projects = ({ projects: initialProjects = [] }) => {
  const [projects, setProjects] = useState(initialProjects);
  const [categories, setCategories] = useState(['All']);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setProjects(initialProjects);
  }, [initialProjects]);

  useEffect(() => {
    if (initialProjects.length > 0) {
      const cats = ['All', ...new Set(initialProjects.map((p) => p.category))];
      setCategories(cats);
    }
  }, [initialProjects]);

  useEffect(() => {
    if (!search && category === 'All') return;

    const fetchProjects = async () => {
      setLoading(true);
      try {
        const params = {};
        if (search) params.search = search;
        if (category !== 'All') params.category = category;
        const { data } = await api.get('/projects', { params });
        setProjects(data);
      } catch {
        /* keep current list */
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(fetchProjects, 400);
    return () => clearTimeout(debounce);
  }, [search, category]);

  return (
    <section id="projects" className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-12">
          <h2 className="section-title">Projects</h2>
          <p className="section-subtitle mx-auto">
            A showcase of my recent work and personal projects
          </p>
        </FadeIn>

        <FadeIn delay={0.1} className="flex flex-col sm:flex-row gap-4 mb-12 max-w-2xl mx-auto">
          <div className="relative flex-1">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field pl-11"
            />
          </div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="input-field sm:w-48"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </FadeIn>

        {loading ? (
          <div className="text-center py-12 text-dark-500">Loading projects...</div>
        ) : projects.length === 0 ? (
          <div className="text-center py-12 text-dark-500">No projects found.</div>
        ) : (
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <StaggerItem key={project._id}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="glass-card overflow-hidden group h-full flex flex-col"
                >
                  <div className="relative overflow-hidden h-48">
                    <img
                      src={getImageUrl(project.image) || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop'}
                      alt={project.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <span className="text-xs px-2 py-1 rounded-full bg-primary-500/80 text-white">
                        {project.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-lg font-semibold mb-2">{project.name}</h3>
                    <p className="text-sm text-dark-500 dark:text-dark-400 mb-4 flex-1 line-clamp-3">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies?.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs px-2 py-1 rounded-lg bg-primary-500/10 text-primary-600 dark:text-primary-400"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      {project.githubLink && (
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-sm text-dark-500 hover:text-primary-500 transition-colors"
                        >
                          <FaGithub /> Code
                        </a>
                      )}
                      {project.liveDemoLink && (
                        <a
                          href={project.liveDemoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-sm text-dark-500 hover:text-primary-500 transition-colors"
                        >
                          <FaExternalLinkAlt /> Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}
      </div>
    </section>
  );
};

export default Projects;
