import { FaGraduationCap } from 'react-icons/fa';
import { FadeIn, StaggerContainer, StaggerItem } from '../common/Animate';

const EducationSection = ({ education }) => {
  return (
    <section id="education" className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <h2 className="section-title">Education</h2>
          <p className="section-subtitle mx-auto">
            My academic background and certifications
          </p>
        </FadeIn>

        <StaggerContainer className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {education.map((edu) => (
            <StaggerItem key={edu._id}>
              <div className="glass-card p-8 h-full">
                <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center mb-4">
                  <FaGraduationCap className="w-6 h-6 text-primary-500" />
                </div>
                <span className="text-sm text-primary-500 font-medium">{edu.graduationYear}</span>
                <h3 className="text-lg font-semibold mt-1 mb-1">{edu.degree}</h3>
                <p className="text-dark-500 dark:text-dark-400 font-medium mb-3">{edu.university}</p>
                <p className="text-sm text-dark-600 dark:text-dark-400 leading-relaxed">{edu.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default EducationSection;
