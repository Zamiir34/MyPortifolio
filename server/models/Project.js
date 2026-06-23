import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    technologies: [{ type: String }],
    githubLink: { type: String, default: '' },
    liveDemoLink: { type: String, default: '' },
    category: { type: String, default: 'Web App' },
    image: { type: String, default: '' },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Project = mongoose.model('Project', projectSchema);
export default Project;
