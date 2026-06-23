import { motion } from 'framer-motion';
import { FadeIn, StaggerContainer, StaggerItem } from '../common/Animate';
import { useInView } from '../../hooks/useInView';

const SkillBar = ({ skill }) => {
  const [ref, isInView] = useInView({ threshold: 0.5 });

  return (
    <div ref={ref} className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium">{skill.name}</span>
        <span className="text-sm text-primary-500">{skill.proficiency}%</span>
      </div>
      <div className="h-2.5 bg-dark-200 dark:bg-dark-700 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: isInView ? `${skill.proficiency}%` : 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="h-full bg-gradient-to-r from-primary-500 to-purple-500 rounded-full"
        />
      </div>
    </div>
  );
};

const Skills = ({ skills }) => {
  const categories = [...new Set(skills.map((s) => s.category))];

  return (
    <section id="skills" className="py-20 md:py-28 bg-dark-100/50 dark:bg-dark-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <h2 className="section-title">Skills</h2>
          <p className="section-subtitle mx-auto">
            Technologies and tools I work with
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-8">
          {categories.map((category, idx) => (
            <FadeIn key={category} delay={idx * 0.1}>
              <div className="glass-card p-8 h-full">
                <h3 className="text-lg font-semibold mb-6 gradient-text">{category}</h3>
                <StaggerContainer>
                  {skills
                    .filter((s) => s.category === category)
                    .map((skill) => (
                      <StaggerItem key={skill._id}>
                        <SkillBar skill={skill} />
                      </StaggerItem>
                    ))}
                </StaggerContainer>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
