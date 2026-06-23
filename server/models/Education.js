import mongoose from 'mongoose';

const educationSchema = new mongoose.Schema(
  {
    university: { type: String, required: true },
    degree: { type: String, required: true },
    graduationYear: { type: String, required: true },
    description: { type: String, default: '' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Education = mongoose.model('Education', educationSchema);
export default Education;
