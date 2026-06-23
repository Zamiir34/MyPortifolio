import User from '../models/User.js';
import Project from '../models/Project.js';
import Skill from '../models/Skill.js';
import Experience from '../models/Experience.js';
import Education from '../models/Education.js';
import Testimonial from '../models/Testimonial.js';
import dotenv from 'dotenv';
import connectDB from './db.js';

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    await Promise.all([
      User.deleteMany(),
      Project.deleteMany(),
      Skill.deleteMany(),
      Experience.deleteMany(),
      Education.deleteMany(),
      Testimonial.deleteMany(),
    ]);

    const admin = await User.create({
      name: process.env.ADMIN_NAME || 'Admin',
      email: process.env.ADMIN_EMAIL || 'admin@portfolio.com',
      password: process.env.ADMIN_PASSWORD || 'admin123',
      role: 'admin',
      profile: {
        fullName: 'Mohamed Developer',
        jobTitle: 'Full Stack MERN Developer',
        bio: 'Passionate full-stack developer with expertise in building scalable web applications using the MERN stack. I love turning complex problems into simple, beautiful, and intuitive solutions.',
        shortIntro: 'I build exceptional digital experiences.',
        typingTexts: ['Full Stack Developer', 'MERN Stack Expert', 'UI/UX Enthusiast', 'Problem Solver'],
        profileImage: '/profile.png',
        resumeUrl: '/uploads/resume.pdf',
        socialLinks: {
          github: 'https://github.com',
          linkedin: 'https://linkedin.com',
          twitter: 'https://twitter.com',
          facebook: 'https://facebook.com',
        },
        personalInfo: {
          email: 'mohamedabdi61210@gmail.com',
          phone: '+252 612103239',
          location: 'Mogadishu, Somalia',
          nationality: 'Somali',
          age: '22',
          freelance: 'Available',
        },
        about: {
          biography: 'I am a dedicated Full Stack MERN Developer with over 5 years of experience crafting modern web applications. My journey in tech started with a curiosity about how websites work, which evolved into a passion for building products that make a difference.',
          skillsSummary: 'Expert in React, Node.js, Express, and MongoDB with strong foundations in REST API design, responsive UI development, and database architecture.',
          experienceOverview: '5+ years of professional experience across startups and enterprise environments, delivering end-to-end solutions from concept to deployment.',
        },
      },
    });

    const skills = [
      { name: 'HTML', category: 'Frontend Development', proficiency: 95, order: 1 },
      { name: 'CSS', category: 'Frontend Development', proficiency: 90, order: 2 },
      { name: 'JavaScript', category: 'Frontend Development', proficiency: 92, order: 3 },
      { name: 'React.js', category: 'Frontend Development', proficiency: 90, order: 4 },
      { name: 'Tailwind CSS', category: 'Frontend Development', proficiency: 88, order: 5 },
      { name: 'Redux', category: 'Frontend Development', proficiency: 85, order: 6 },
      { name: 'Node.js', category: 'Backend Development', proficiency: 88, order: 7 },
      { name: 'Express.js', category: 'Backend Development', proficiency: 90, order: 8 },
      { name: 'REST API', category: 'Backend Development', proficiency: 92, order: 9 },
      { name: 'MongoDB', category: 'Database', proficiency: 88, order: 10 },
      { name: 'MySQL', category: 'Database', proficiency: 75, order: 11 },
      { name: 'Git', category: 'Tools', proficiency: 90, order: 12 },
      { name: 'GitHub', category: 'Tools', proficiency: 92, order: 13 },
      { name: 'VS Code', category: 'Tools', proficiency: 95, order: 14 },
      { name: 'Postman', category: 'Tools', proficiency: 88, order: 15 },
    ];
    await Skill.insertMany(skills);

    const projects = [
      {
        name: 'RealP Estate',
        description: 'A full-featured real estate management system with property listings, user authentication, and admin dashboard for managing real estate operations.',
        technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
        githubLink: '',
        liveDemoLink: 'https://real-state-quz2.vercel.app/login',
        category: 'Full Stack',
        image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop',
        featured: true,
      },
      {
        name: 'E-Commerce Platform',
        description: 'A full-featured e-commerce platform with product management, cart, checkout, and payment integration.',
        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        githubLink: 'https://github.com',
        liveDemoLink: 'https://example.com',
        category: 'Full Stack',
        image: 'https://images.unsplash.com/photo-1557821552-051077d398bf?w=600&h=400&fit=crop',
        featured: true,
      },
      {
        name: 'Task Management App',
        description: 'Collaborative task management application with real-time updates and team workspaces.',
        technologies: ['React', 'Express', 'Socket.io', 'MongoDB'],
        githubLink: 'https://github.com',
        liveDemoLink: 'https://example.com',
        category: 'Web App',
        image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop',
        featured: true,
      },
      {
        name: 'Portfolio CMS',
        description: 'Content management system for portfolio websites with admin dashboard and dynamic content.',
        technologies: ['MERN', 'Tailwind', 'JWT'],
        githubLink: 'https://github.com',
        liveDemoLink: 'https://example.com',
        category: 'Full Stack',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
        featured: false,
      },
    ];
    await Project.insertMany(projects);

    const experiences = [
      {
        company: 'Tech Solutions Inc.',
        position: 'Senior Full Stack Developer',
        startDate: '2022-01',
        endDate: 'Present',
        description: 'Led development of multiple client projects using MERN stack. Mentored junior developers and established coding standards.',
        order: 1,
      },
      {
        company: 'Digital Agency Co.',
        position: 'Full Stack Developer',
        startDate: '2019-06',
        endDate: '2021-12',
        description: 'Built responsive web applications and REST APIs for various clients. Collaborated with design team on UI/UX implementation.',
        order: 2,
      },
      {
        company: 'Startup Labs',
        position: 'Junior Web Developer',
        startDate: '2018-01',
        endDate: '2019-05',
        description: 'Developed frontend components and assisted in backend API development. Participated in agile sprints and code reviews.',
        order: 3,
      },
    ];
    await Experience.insertMany(experiences);

    const education = [
      {
        university: 'University of Technology',
        degree: 'Bachelor of Science in Computer Science',
        graduationYear: '2026',
        description: 'Expected to graduate in 2026. Focused on software engineering, web development, and database systems.',
        order: 1,
      },
      {
        university: 'Online Learning Platform',
        degree: 'MERN Stack Development Certification',
        graduationYear: '2026',
        description: 'Comprehensive certification covering MongoDB, Express, React, and Node.js full-stack development.',
        order: 2,
      },
    ];
    await Education.insertMany(education);

    const testimonials = [
      {
        name: 'Sarah Johnson',
        position: 'CEO, TechStart',
        review: 'Exceptional developer who delivered our project ahead of schedule. The quality of work and attention to detail is outstanding.',
        rating: 5,
        photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
        order: 1,
      },
      {
        name: 'Michael Chen',
        position: 'Product Manager, InnovateCo',
        review: 'Working with this developer was a pleasure. Great communication, technical expertise, and always willing to go the extra mile.',
        rating: 5,
        photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
        order: 2,
      },
      {
        name: 'Emily Rodriguez',
        position: 'Founder, DesignHub',
        review: 'Transformed our vision into a beautiful, functional web application. Highly recommend for any MERN stack project.',
        rating: 5,
        photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
        order: 3,
      },
    ];
    await Testimonial.insertMany(testimonials);

    console.log('Database seeded successfully!');
    console.log(`Admin login: ${admin.email} / ${process.env.ADMIN_PASSWORD || 'admin123'}`);
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedData();
