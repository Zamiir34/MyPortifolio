import { FadeIn } from '../common/Animate';
import { FaBriefcase } from 'react-icons/fa';

const Experience = ({ experiences = [] }) => {
  return (
    <section id="experience" className="py-20 md:py-28 bg-dark-100/50 dark:bg-dark-900/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <h2 className="section-title">Experience</h2>
          <p className="section-subtitle mx-auto">
            My professional journey and work history
          </p>
        </FadeIn>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 to-purple-500 md:-translate-x-1/2" />

          {experiences.length === 0 ? (
            <p className="text-center text-dark-500 py-8">No experience entries yet.</p>
          ) : (
            experiences.map((exp, idx) => (
              <FadeIn key={exp._id} delay={idx * 0.1}>
                <div className={`relative flex items-start gap-8 mb-12 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className="hidden md:block md:w-1/2" />
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-primary-500 rounded-full border-4 border-white dark:border-dark-900 md:-translate-x-1/2 z-10 mt-2" />
                  <div className={`ml-12 md:ml-0 md:w-1/2 ${idx % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                    <div className="glass-card p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <FaBriefcase className="w-4 h-4 text-primary-500" />
                        <span className="text-sm text-primary-500 font-medium">
                          {exp.startDate} — {exp.endDate}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold">{exp.position}</h3>
                      <p className="text-primary-600 dark:text-primary-400 font-medium mb-3">{exp.company}</p>
                      <p className="text-sm text-dark-600 dark:text-dark-400 leading-relaxed">{exp.description}</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Experience;
