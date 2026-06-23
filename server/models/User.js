import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const profileSchema = new mongoose.Schema({
  fullName: { type: String, default: 'Your Name' },
  jobTitle: { type: String, default: 'Full Stack MERN Developer' },
  bio: { type: String, default: '' },
  shortIntro: { type: String, default: '' },
  typingTexts: [{ type: String }],
  profileImage: { type: String, default: '' },
  resumeUrl: { type: String, default: '' },
  socialLinks: {
    github: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    twitter: { type: String, default: '' },
    facebook: { type: String, default: '' },
  },
  personalInfo: {
    email: { type: String, default: '' },
    phone: { type: String, default: '' },
    location: { type: String, default: '' },
    nationality: { type: String, default: '' },
    age: { type: String, default: '' },
    freelance: { type: String, default: 'Available' },
  },
  about: {
    biography: { type: String, default: '' },
    skillsSummary: { type: String, default: '' },
    experienceOverview: { type: String, default: '' },
  },
});

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: ['admin'], default: 'admin' },
    profile: profileSchema,
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;
