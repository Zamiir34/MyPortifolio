import mongoose from 'mongoose';

let connecting = false;

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
  if (!uri) {
    console.error('MONGODB_URI or MONGO_URI environment variable is required');
    return false;
  }

  if (mongoose.connection.readyState === 1) return true;
  if (connecting) return false;

  connecting = true;
  mongoose.set('bufferCommands', false);

  const maxRetries = 5;
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const conn = await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 15000,
        family: 4,
      });
      console.log(`MongoDB Connected: ${conn.connection.host}`);
      connecting = false;
      return true;
    } catch (error) {
      console.error(`MongoDB connection attempt ${attempt} failed: ${error.message}`);
      if (attempt === maxRetries) {
        console.error('Could not connect to MongoDB. API will return 503 until connected.');
        console.error('Tip: check internet/DNS, Atlas IP whitelist (0.0.0.0/0), or use local MongoDB URI.');
        connecting = false;
        return false;
      }
      await new Promise((resolve) => setTimeout(resolve, 3000 * attempt));
    }
  }

  connecting = false;
  return false;
};

export const isDbConnected = () => mongoose.connection.readyState === 1;

export default connectDB;
