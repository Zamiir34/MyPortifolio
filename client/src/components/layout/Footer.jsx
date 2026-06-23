import { FaGithub, FaLinkedin, FaTwitter, FaFacebook, FaArrowUp } from 'react-icons/fa';

const quickLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

const Footer = ({ profile }) => {
  const social = profile?.socialLinks || {};

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { icon: FaGithub, url: social.github, label: 'GitHub' },
    { icon: FaLinkedin, url: social.linkedin, label: 'LinkedIn' },
    { icon: FaTwitter, url: social.twitter, label: 'Twitter' },
    { icon: FaFacebook, url: social.facebook, label: 'Facebook' },
  ];

  return (
    <footer className="relative bg-dark-900 dark:bg-dark-950 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          <div>
            <h3 className="text-2xl font-display font-bold gradient-text mb-4">
              {profile?.fullName || 'Portfolio'}
            </h3>
            <p className="text-dark-400 text-sm leading-relaxed">
              {profile?.shortIntro || 'Building exceptional digital experiences with modern web technologies.'}
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollTo(link.id)}
                    className="text-dark-400 hover:text-primary-400 transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Connect</h4>
            <div className="flex gap-3">
              {socialLinks.map(
                ({ icon: Icon, url, label }) =>
                  url && (
                    <a
                      key={label}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="w-10 h-10 rounded-xl glass flex items-center justify-center hover:bg-primary-500/20 hover:text-primary-400 transition-all"
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  )
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-dark-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-dark-500 text-sm">
            &copy; {new Date().getFullYear()} {profile?.fullName || 'Portfolio'}. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-xl glass hover:bg-primary-500/20 text-sm transition-all"
          >
            <FaArrowUp className="w-4 h-4" />
            Back to Top
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
