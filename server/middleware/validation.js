import mongoose from "mongoose";

export const validateBooking = (req, res, next) => {
  const { expert, name, email, date, timeSlot } = req.body;

  if (!expert || !name || !email || !date || !timeSlot) {
    return res.status(400).json({ error: "Expert, Name, Email, Date, and Time Slot are required" });
  }

  // Simple email validation
  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  // Optional: phone number validation
  if (req.body.phone && !/^\d{10}$/.test(req.body.phone)) {
    return res.status(400).json({ error: "Phone number must be 10 digits" });
  }

  next();
};


// Expert API validation for GET /experts and GET /experts/:id
export const validateGetExperts = (req, res, next) => {
  let { page = 1, limit = 10, category, search } = req.query;

  page = Number(page);
  limit = Number(limit);

  if (isNaN(page) || page < 1) return res.status(400).json({ error: "Page must be a positive number" });
  if (isNaN(limit) || limit < 1) return res.status(400).json({ error: "Limit must be a positive number" });
  if (category && typeof category !== "string") return res.status(400).json({ error: "Category must be a string" });
  if (search && typeof search !== "string") return res.status(400).json({ error: "Search must be a string" });

  next();
};

export const validateGetExpertById = (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid expert ID" });
  }
  next();
};