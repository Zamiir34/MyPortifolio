import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FaGithub, FaLinkedin, FaTwitter, FaFacebook, FaDownload } from 'react-icons/fa';
import { HiMail } from 'react-icons/hi';
import { FadeIn } from '../common/Animate';
import { getImageUrl } from '../../services/api';

const Hero = ({ profile }) => {
  const social = profile?.socialLinks || {};
  const typingTexts = profile?.typingTexts?.length
    ? profile.typingTexts
    : ['Full Stack Developer', 'MERN Stack Expert', 'Problem Solver'];

  const typeSequence = typingTexts.flatMap((text) => [text, 2000]);

  const socialLinks = [
    { icon: FaGithub, url: social.github },
    { icon: FaLinkedin, url: social.linkedin },
    { icon: FaTwitter, url: social.twitter },
    { icon: FaFacebook, url: social.facebook },
  ];

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-purple-500/5 to-pink-500/10 dark:from-primary-900/20 dark:via-purple-900/10 dark:to-pink-900/10" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <FadeIn>
            <p className="text-primary-500 font-semibold mb-2">Hello, I&apos;m</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-4">
              {profile?.fullName || 'Your Name'}
            </h1>
            <h2 className="text-xl sm:text-2xl text-dark-600 dark:text-dark-300 mb-4">
              {profile?.jobTitle || 'Full Stack MERN Developer'}
            </h2>
            <div className="text-lg sm:text-xl text-dark-500 dark:text-dark-400 mb-6 h-8">
              <TypeAnimation
                sequence={typeSequence}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="gradient-text font-semibold"
              />
            </div>
            <p className="text-dark-600 dark:text-dark-400 mb-8 max-w-lg leading-relaxed">
              {profile?.bio || profile?.shortIntro || 'Passionate developer building modern web applications.'}
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              {profile?.resumeUrl && (
                <a
                  href={getImageUrl(profile.resumeUrl)}
                  download
                  className="btn-primary flex items-center gap-2"
                >
                  <FaDownload /> Download CV
                </a>
              )}
              <button onClick={scrollToContact} className="btn-outline flex items-center gap-2">
                <HiMail /> Hire Me
              </button>
            </div>

            <div className="flex gap-4">
              {socialLinks.map(
                ({ icon: Icon, url }, i) =>
                  url && (
                    <motion.a
                      key={i}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="w-11 h-11 rounded-xl glass flex items-center justify-center text-dark-600 dark:text-dark-300 hover:text-primary-500 hover:bg-primary-500/10 transition-colors"
                    >
                      <Icon className="w-5 h-5" />
                    </motion.a>
                  )
              )}
            </div>
          </FadeIn>

          <FadeIn delay={0.2} direction="left">
            <div className="relative flex justify-center lg:justify-end">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-purple-500 rounded-full blur-2xl opacity-30 scale-90" />
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="relative"
              >
                <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-full p-1 bg-gradient-to-r from-primary-500 via-purple-500 to-pink-500">
                  <img
                    src={getImageUrl(profile?.profileImage) || '/profile.png'}
                    alt={profile?.fullName || 'Profile'}
                    className="w-full h-full rounded-full object-cover border-4 border-white dark:border-dark-900"
                  />
                </div>
              </motion.div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default Hero;
