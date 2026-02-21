import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
  expert: { type: mongoose.Schema.Types.ObjectId, ref: 'Expert', required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  date: String,
  timeSlot: String,
  notes: String,
  status: { type: String, enum: ['Pending','Confirmed','Completed'], default: 'Pending' }
});

BookingSchema.index({ expert: 1, date: 1, timeSlot: 1 }, { unique: true }); // Prevent double booking

export default mongoose.model('Booking', BookingSchema);