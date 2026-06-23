import Project from '../models/Project.js';
import Skill from '../models/Skill.js';
import Message from '../models/Message.js';
import Testimonial from '../models/Testimonial.js';
import Experience from '../models/Experience.js';
import Education from '../models/Education.js';

export const getStats = async (req, res) => {
  const [projects, skills, messages, testimonials, experiences, education] =
    await Promise.all([
      Project.countDocuments(),
      Skill.countDocuments(),
      Message.countDocuments(),
      Testimonial.countDocuments(),
      Experience.countDocuments(),
      Education.countDocuments(),
    ]);

  const unreadMessages = await Message.countDocuments({ read: false });

  res.json({
    projects,
    skills,
    messages,
    testimonials,
    experiences,
    education,
    unreadMessages,
  });
};
