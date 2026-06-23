import mongoose from 'mongoose';

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
  if (!uri) {
    console.error('MONGODB_URI or MONGO_URI environment variable is required');
    return;
  }

  const maxRetries = 5;
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const conn = await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 10000,
      });
      console.log(`MongoDB Connected: ${conn.connection.host}`);
      return;
    } catch (error) {
      console.error(`MongoDB connection attempt ${attempt} failed: ${error.message}`);
      if (attempt === maxRetries) {
        console.error('Could not connect to MongoDB after multiple attempts');
        return;
      }
      await new Promise((resolve) => setTimeout(resolve, 3000 * attempt));
    }
  }
};

export default connectDB;
