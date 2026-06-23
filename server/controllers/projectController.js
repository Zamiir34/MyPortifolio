import Project from '../models/Project.js';

export const getProjects = async (req, res) => {
  const { search, category } = req.query;
  const filter = {};

  if (category && category !== 'All') filter.category = category;
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
      { technologies: { $regex: search, $options: 'i' } },
    ];
  }

  const projects = await Project.find(filter).sort({ createdAt: -1 });
  res.json(projects);
};

export const getProject = async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) return res.status(404).json({ message: 'Project not found' });
  res.json(project);
};

export const createProject = async (req, res) => {
  const data = { ...req.body };
  if (req.file) data.image = `/uploads/${req.file.filename}`;
  if (typeof data.technologies === 'string') {
    data.technologies = data.technologies.split(',').map((t) => t.trim());
  }
  const project = await Project.create(data);
  res.status(201).json(project);
};

export const updateProject = async (req, res) => {
  const data = { ...req.body };
  if (req.file) data.image = `/uploads/${req.file.filename}`;
  if (typeof data.technologies === 'string') {
    data.technologies = data.technologies.split(',').map((t) => t.trim());
  }
  const project = await Project.findByIdAndUpdate(req.params.id, data, {
    new: true,
    runValidators: true,
  });
  if (!project) return res.status(404).json({ message: 'Project not found' });
  res.json(project);
};

export const deleteProject = async (req, res) => {
  const project = await Project.findByIdAndDelete(req.params.id);
  if (!project) return res.status(404).json({ message: 'Project not found' });
  res.json({ message: 'Project removed' });
};

export const getCategories = async (req, res) => {
  const categories = await Project.distinct('category');
  res.json(['All', ...categories]);
};
