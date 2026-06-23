import express from 'express';
import {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from '../controllers/testimonialController.js';
import { protect } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

router.get('/', getTestimonials);
router.post('/', protect, upload.single('photo'), createTestimonial);
router.put('/:id', protect, upload.single('photo'), updateTestimonial);
router.delete('/:id', protect, deleteTestimonial);

export default router;
