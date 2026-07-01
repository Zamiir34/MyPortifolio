import { isDbConnected } from '../config/db.js';

export const requireDB = (req, res, next) => {
  if (isDbConnected()) return next();
  res.status(503).json({
    message: 'Database unavailable. Check MongoDB connection and try again.',
  });
};
