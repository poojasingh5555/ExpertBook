import express from 'express';
import { createBooking, getBookingsByEmail, updateBookingStatus } from '../controllers/Bookingcontroller.js';
import { validateBooking } from '../middleware/validation.js';
const router = express.Router();

router.post('/', validateBooking, createBooking);
router.get('/', getBookingsByEmail);
router.patch('/:id/status', updateBookingStatus);

export default router;