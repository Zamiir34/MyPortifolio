import Education from '../models/Education.js';

export const getEducation = async (req, res) => {
  const education = await Education.find().sort({ order: 1, graduationYear: -1 });
  res.json(education);
};

export const createEducation = async (req, res) => {
  const item = await Education.create(req.body);
  res.status(201).json(item);
};

export const updateEducation = async (req, res) => {
  const item = await Education.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!item) return res.status(404).json({ message: 'Education not found' });
  res.json(item);
};

export const deleteEducation = async (req, res) => {
  const item = await Education.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ message: 'Education not found' });
  res.json({ message: 'Education removed' });
};
