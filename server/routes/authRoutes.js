import express from 'express';
import { login, getMe, updateProfile, getPublicProfile } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

router.post('/login', login);
router.get('/profile', getPublicProfile);
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);
router.post('/upload', protect, upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
  res.json({ url: `/uploads/${req.file.filename}` });
});

export default router;
