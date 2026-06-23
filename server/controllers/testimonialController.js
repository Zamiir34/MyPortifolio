import Testimonial from '../models/Testimonial.js';

export const getTestimonials = async (req, res) => {
  const testimonials = await Testimonial.find().sort({ order: 1 });
  res.json(testimonials);
};

export const createTestimonial = async (req, res) => {
  const data = { ...req.body };
  if (req.file) data.photo = `/uploads/${req.file.filename}`;
  const testimonial = await Testimonial.create(data);
  res.status(201).json(testimonial);
};

export const updateTestimonial = async (req, res) => {
  const data = { ...req.body };
  if (req.file) data.photo = `/uploads/${req.file.filename}`;
  const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, data, {
    new: true,
    runValidators: true,
  });
  if (!testimonial) return res.status(404).json({ message: 'Testimonial not found' });
  res.json(testimonial);
};

export const deleteTestimonial = async (req, res) => {
  const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
  if (!testimonial) return res.status(404).json({ message: 'Testimonial not found' });
  res.json({ message: 'Testimonial removed' });
};
