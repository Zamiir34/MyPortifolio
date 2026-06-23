import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGlobe, FaBirthdayCake, FaUserTie } from 'react-icons/fa';
import { FadeIn, StaggerContainer, StaggerItem } from '../common/Animate';
import { getImageUrl } from '../../services/api';

const About = ({ profile, education }) => {
  const about = profile?.about || {};
  const personal = profile?.personalInfo || {};

  const infoItems = [
    { icon: FaEnvelope, label: 'Email', value: personal.email },
    { icon: FaPhone, label: 'Phone', value: personal.phone },
    { icon: FaMapMarkerAlt, label: 'Location', value: personal.location },
    { icon: FaGlobe, label: 'Nationality', value: personal.nationality },
    { icon: FaBirthdayCake, label: 'Age', value: personal.age },
    { icon: FaUserTie, label: 'Freelance', value: personal.freelance },
  ];

  return (
    <section id="about" className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle mx-auto">
            Get to know more about my background, skills, and experience
          </p>
        </FadeIn>

        <div className="grid lg:grid-cols-3 gap-8">
          <FadeIn delay={0.1} className="lg:col-span-2 space-y-6">
            <div className="glass-card p-8">
              <h3 className="text-xl font-semibold mb-4 gradient-text">Biography</h3>
              <p className="text-dark-600 dark:text-dark-400 leading-relaxed">
                {about.biography || 'Professional biography goes here.'}
              </p>
            </div>
            <div className="glass-card p-8">
              <h3 className="text-xl font-semibold mb-4 gradient-text">Skills Summary</h3>
              <p className="text-dark-600 dark:text-dark-400 leading-relaxed">
                {about.skillsSummary || 'Skills summary goes here.'}
              </p>
            </div>
            <div className="glass-card p-8">
              <h3 className="text-xl font-semibold mb-4 gradient-text">Experience Overview</h3>
              <p className="text-dark-600 dark:text-dark-400 leading-relaxed">
                {about.experienceOverview || 'Experience overview goes here.'}
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="glass-card p-8 sticky top-24">
              <div className="flex justify-center mb-6">
                <img
                  src={getImageUrl(profile?.profileImage) || '/profile.png'}
                  alt={profile?.fullName}
                  className="w-32 h-32 rounded-2xl object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold text-center mb-6">Personal Information</h3>
              <StaggerContainer className="space-y-4">
                {infoItems.map(
                  (item) =>
                    item.value && (
                      <StaggerItem key={item.label}>
                        <div className="flex items-center gap-3">
                          <item.icon className="w-4 h-4 text-primary-500 flex-shrink-0" />
                          <div>
                            <p className="text-xs text-dark-500">{item.label}</p>
                            <p className="text-sm font-medium">{item.value}</p>
                          </div>
                        </div>
                      </StaggerItem>
                    )
                )}
              </StaggerContainer>

              {education?.length > 0 && (
                <div className="mt-8 pt-6 border-t border-dark-200 dark:border-dark-700">
                  <h4 className="font-semibold mb-3 text-sm">Education</h4>
                  {education.slice(0, 2).map((edu) => (
                    <div key={edu._id} className="mb-3">
                      <p className="text-sm font-medium">{edu.degree}</p>
                      <p className="text-xs text-dark-500">{edu.university} • {edu.graduationYear}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default About;
