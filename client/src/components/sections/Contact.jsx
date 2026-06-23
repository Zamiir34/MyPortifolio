import { useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { FadeIn } from '../common/Animate';
import api from '../../services/api';

const Contact = ({ profile }) => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const personal = profile?.personalInfo || {};

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      await api.post('/messages', form);
      setStatus({ type: 'success', message: 'Message sent successfully! I will get back to you soon.' });
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setStatus({
        type: 'error',
        message: err.response?.data?.message || 'Failed to send message. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-dark-100/50 dark:bg-dark-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <h2 className="section-title">Contact Me</h2>
          <p className="section-subtitle mx-auto">
            Have a project in mind? Let&apos;s work together!
          </p>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <FadeIn delay={0.1}>
            <div className="space-y-6">
              {personal.email && (
                <div className="flex items-center gap-4 glass-card p-5">
                  <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center">
                    <FaEnvelope className="w-5 h-5 text-primary-500" />
                  </div>
                  <div>
                    <p className="text-sm text-dark-500">Email</p>
                    <a href={`mailto:${personal.email}`} className="font-medium hover:text-primary-500">
                      {personal.email}
                    </a>
                  </div>
                </div>
              )}
              {personal.phone && (
                <div className="flex items-center gap-4 glass-card p-5">
                  <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center">
                    <FaPhone className="w-5 h-5 text-primary-500" />
                  </div>
                  <div>
                    <p className="text-sm text-dark-500">Phone</p>
                    <p className="font-medium">{personal.phone}</p>
                  </div>
                </div>
              )}
              {personal.location && (
                <div className="flex items-center gap-4 glass-card p-5">
                  <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center">
                    <FaMapMarkerAlt className="w-5 h-5 text-primary-500" />
                  </div>
                  <div>
                    <p className="text-sm text-dark-500">Location</p>
                    <p className="font-medium">{personal.location}</p>
                  </div>
                </div>
              )}
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <form onSubmit={handleSubmit} className="glass-card p-8 space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="Project inquiry"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="input-field resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              {status.message && (
                <div
                  className={`p-4 rounded-xl text-sm ${
                    status.type === 'success'
                      ? 'bg-green-500/10 text-green-600 dark:text-green-400'
                      : 'bg-red-500/10 text-red-600 dark:text-red-400'
                  }`}
                >
                  {status.message}
                </div>
              )}

              <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default Contact;
