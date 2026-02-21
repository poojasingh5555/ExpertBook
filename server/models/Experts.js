import mongoose from 'mongoose';

const ExpertSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  experience: { type: Number, required: true },
  rating: { type: Number, default: 0 },
  availableSlots: [
    {
      date: String,
      slots: [String], // ["10:00", "11:00"]
    }
  ],
});

export default mongoose.model('Expert', ExpertSchema);