import { useEffect, useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import api, { getImageUrl } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const ProfileSettings = () => {
  const { user, setUser } = useAuth();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    profile: {
      fullName: '',
      jobTitle: '',
      bio: '',
      shortIntro: '',
      typingTexts: '',
      profileImage: '',
      resumeUrl: '',
      socialLinks: { github: '', linkedin: '', twitter: '', facebook: '' },
      personalInfo: { email: '', phone: '', location: '', nationality: '', age: '', freelance: '' },
      about: { biography: '', skillsSummary: '', experienceOverview: '' },
    },
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || '',
        email: user.email || '',
        password: '',
        profile: {
          fullName: user.profile?.fullName || '',
          jobTitle: user.profile?.jobTitle || '',
          bio: user.profile?.bio || '',
          shortIntro: user.profile?.shortIntro || '',
          typingTexts: user.profile?.typingTexts?.join(', ') || '',
          profileImage: user.profile?.profileImage || '',
          resumeUrl: user.profile?.resumeUrl || '',
          socialLinks: { ...form.profile.socialLinks, ...user.profile?.socialLinks },
          personalInfo: { ...form.profile.personalInfo, ...user.profile?.personalInfo },
          about: { ...form.profile.about, ...user.profile?.about },
        },
      });
    }
  }, [user]);

  const handleImageUpload = async (e, field) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('image', file);
    const { data } = await api.post('/auth/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    setForm((prev) => ({
      ...prev,
      profile: { ...prev.profile, [field]: data.url },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      const payload = {
        name: form.name,
        email: form.email,
        profile: {
          ...form.profile,
          typingTexts: form.profile.typingTexts.split(',').map((t) => t.trim()).filter(Boolean),
        },
      };
      if (form.password) payload.password = form.password;

      const { data } = await api.put('/auth/profile', payload);
      setUser(data);
      localStorage.setItem('user', JSON.stringify(data));
      setMessage('Profile updated successfully!');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Update failed');
    } finally {
      setSaving(false);
    }
  };

  const updateProfile = (path, value) => {
    const keys = path.split('.');
    setForm((prev) => {
      const updated = { ...prev };
      let current = updated;
      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...current[keys[i]] };
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return updated;
    });
  };

  return (
    <AdminLayout title="Profile Settings">
      <form onSubmit={handleSubmit} className="max-w-3xl space-y-8">
        {message && (
          <div className={`p-4 rounded-xl text-sm ${message.includes('success') ? 'bg-green-500/10 text-green-600' : 'bg-red-500/10 text-red-600'}`}>
            {message}
          </div>
        )}

        <section className="glass-card p-6 space-y-4">
          <h3 className="font-semibold">Account</h3>
          <input type="text" placeholder="Admin Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-field" />
          <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input-field" />
          <input type="password" placeholder="New Password (leave blank to keep)" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="input-field" />
        </section>

        <section className="glass-card p-6 space-y-4">
          <h3 className="font-semibold">Hero Section</h3>
          <input type="text" placeholder="Full Name" value={form.profile.fullName} onChange={(e) => updateProfile('profile.fullName', e.target.value)} className="input-field" />
          <input type="text" placeholder="Job Title" value={form.profile.jobTitle} onChange={(e) => updateProfile('profile.jobTitle', e.target.value)} className="input-field" />
          <textarea placeholder="Bio" value={form.profile.bio} onChange={(e) => updateProfile('profile.bio', e.target.value)} rows={3} className="input-field resize-none" />
          <input type="text" placeholder="Typing texts (comma separated)" value={form.profile.typingTexts} onChange={(e) => updateProfile('profile.typingTexts', e.target.value)} className="input-field" />
          <div className="flex items-center gap-4">
            {form.profile.profileImage && (
              <img src={getImageUrl(form.profile.profileImage)} alt="Profile" className="w-16 h-16 rounded-full object-cover" />
            )}
            <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'profileImage')} className="input-field" />
          </div>
          <div>
            <label className="text-sm mb-2 block">Resume (PDF)</label>
            <input type="file" accept=".pdf" onChange={(e) => handleImageUpload(e, 'resumeUrl')} className="input-field" />
          </div>
        </section>

        <section className="glass-card p-6 space-y-4">
          <h3 className="font-semibold">Social Links</h3>
          {['github', 'linkedin', 'twitter', 'facebook'].map((key) => (
            <input key={key} type="url" placeholder={key} value={form.profile.socialLinks[key]} onChange={(e) => updateProfile(`profile.socialLinks.${key}`, e.target.value)} className="input-field" />
          ))}
        </section>

        <section className="glass-card p-6 space-y-4">
          <h3 className="font-semibold">About Section</h3>
          <textarea placeholder="Biography" value={form.profile.about.biography} onChange={(e) => updateProfile('profile.about.biography', e.target.value)} rows={3} className="input-field resize-none" />
          <textarea placeholder="Skills Summary" value={form.profile.about.skillsSummary} onChange={(e) => updateProfile('profile.about.skillsSummary', e.target.value)} rows={2} className="input-field resize-none" />
          <textarea placeholder="Experience Overview" value={form.profile.about.experienceOverview} onChange={(e) => updateProfile('profile.about.experienceOverview', e.target.value)} rows={2} className="input-field resize-none" />
        </section>

        <section className="glass-card p-6 space-y-4">
          <h3 className="font-semibold">Personal Info</h3>
          {['email', 'phone', 'location', 'nationality', 'age', 'freelance'].map((key) => (
            <input key={key} type="text" placeholder={key} value={form.profile.personalInfo[key]} onChange={(e) => updateProfile(`profile.personalInfo.${key}`, e.target.value)} className="input-field" />
          ))}
        </section>

        <button type="submit" disabled={saving} className="btn-primary disabled:opacity-50">
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </AdminLayout>
  );
};

export default ProfileSettings;
