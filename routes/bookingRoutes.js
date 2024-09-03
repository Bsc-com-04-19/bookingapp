// routes/bookingRoutes.js
const express = require('express');
const {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
  getBookingsWithBalance, 
  getBookingsWithoutBalance, 
  getBookingsWithZeroBalance 
} = require('../controllers/bookingController');
const authenticateToken = require('../middleware/authenticateToken');

const router = express.Router();

router.post('/', authenticateToken, createBooking);
router.get('/', authenticateToken, getAllBookings);
router.get('/:id', authenticateToken, getBookingById);
router.put('/:id', authenticateToken, updateBooking);
router.delete('/:id', authenticateToken, deleteBooking);
// Get all bookings with balance
router.get('/with-balance', getBookingsWithBalance);
// Get all bookings with zero balance
router.get('/with-zero-balance', getBookingsWithZeroBalance);

module.exports = router;
