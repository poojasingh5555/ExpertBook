import Booking from "../models/Booking.js";
import mongoose from "mongoose";

/**
 * Create a booking
 * Required fields validated by middleware: name, email, date, timeSlot
 * Optional: phone (10 digits), notes
 * Prevents double booking
 * Emits Socket.io event
 */
export const createBooking = async (req, res, next) => {
  try {
    const { expert, date, timeSlot } = req.body;

    if (!expert || !date || !timeSlot) {
      const error = new Error("Expert, date and timeSlot required");
      error.statusCode = 400;
      return next(error);
    }

    const booking = await Booking.create(req.body);

    //  Emit socket event with date also
    req.io.emit("slotBooked", {
      expert: booking.expert.toString(),
      date: booking.date,
      timeSlot: booking.timeSlot,
    });

    res.status(201).json(booking);
  } catch (err) {
    if (err.code === 11000) {
      const error = new Error("Slot already booked");
      error.statusCode = 400;
      return next(error);
    }

    next(err);
  }
};
/**
 * Get bookings filtered by email
 * GET /api/bookings?email=
 */
export const getBookingsByEmail = async (req, res, next) => {
  const { email } = req.query;
  if (!email) {
    const error = new Error("Email required");
    error.statusCode = 400;
    return next(error);
  }

  try {
    const bookings = await Booking.find({ email }).populate("expert");
    res.json(bookings);
  } catch (err) {
    next(err); // global error handler
  }
};

/**
 * Update booking status
 * PATCH /api/bookings/:id/status
 */
export const updateBookingStatus = async (req, res, next) => {
  const { status } = req.body;
  if (!["Pending", "Confirmed", "Completed"].includes(status)) {
    const error = new Error("Invalid status");
    error.statusCode = 400;
    return next(error);
  }

  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!booking) {
      const error = new Error("Booking not found");
      error.statusCode = 404;
      throw error;
    }
    res.json(booking);
  } catch (err) {
    next(err); // global error handler
  }
};
