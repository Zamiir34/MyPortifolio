import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB, { isDbConnected } from './config/db.js';
import { requireDB } from './middleware/dbCheck.js';
import { errorHandler } from './middleware/auth.js';

import authRoutes from './routes/authRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import skillRoutes from './routes/skillRoutes.js';
import experienceRoutes from './routes/experienceRoutes.js';
import educationRoutes from './routes/educationRoutes.js';
import testimonialRoutes from './routes/testimonialRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';

dotenv.config();

process.on('unhandledRejection', (err) => {
  console.error('Unhandled rejection:', err?.message || err);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught exception:', err?.message || err);
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Portfolio API is running',
    db: isDbConnected() ? 'connected' : 'disconnected',
  });
});

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', requireDB, authRoutes);
app.use('/api/projects', requireDB, projectRoutes);
app.use('/api/skills', requireDB, skillRoutes);
app.use('/api/experiences', requireDB, experienceRoutes);
app.use('/api/education', requireDB, educationRoutes);
app.use('/api/testimonials', requireDB, testimonialRoutes);
app.use('/api/messages', requireDB, messageRoutes);
app.use('/api/dashboard', requireDB, dashboardRoutes);

if (process.env.NODE_ENV === 'production') {
  const clientDist = path.join(__dirname, '../client/dist');
  app.use(express.static(clientDist));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api') || req.path.startsWith('/uploads')) {
      return next();
    }
    res.sendFile(path.join(clientDist, 'index.html'));
  });
}

app.use(errorHandler);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});

export default app;
