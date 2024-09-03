// controllers/bookingController.js
const Booking = require('../models/Booking');
const User = require('../models/User');

exports.createBooking = async (req, res) => {
  const { ownerName, contactNumber, type, paid, amountPaid, balance, numberOfPictures } = req.body;

  try {
    const booking = await Booking.create({
      ownerName,
      contactNumber,
      type,
      paid,
      amountPaid,
      balance,
      numberOfPictures,
      userId: req.user.id,
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      include: {
        model: User,
        as: 'user',
        attributes: ['username'],
      },
    });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id, {
      include: {
        model: User,
        as: 'user',
        attributes: ['username'],
      },
    });

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.updateBooking = async (req, res) => {
  const { ownerName, contactNumber, type, paid, amountPaid, balance, numberOfPictures } = req.body;

  try {
    const booking = await Booking.findByPk(req.params.id);

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    booking.ownerName = ownerName;
    booking.contactNumber = contactNumber;
    booking.type = type;
    booking.paid = paid;
    booking.amountPaid = amountPaid;
    booking.balance = balance;
    booking.numberOfPictures = numberOfPictures;

    await booking.save();

    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id);

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    await booking.destroy();

    res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all bookings with balance
exports.getBookingsWithBalance = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      where: {
        balance: {
          [Sequelize.Op.gt]: 0
        }
      },
      include: {
        model: User,
        as: 'user',
        attributes: ['username'],
      },
    });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
// Get all bookings with zero balance
exports.getBookingsWithZeroBalance = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      where: {
        balance: 0
      },
      include: {
        model: User,
        as: 'user',
        attributes: ['username'],
      },
    });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
// Calculate the total balance from all bookings
exports.getTotalBalance = async (req, res) => {
  try {
    const result = await Booking.findAll({
      attributes: [[sequelize.fn('SUM', sequelize.col('balance')), 'totalBalance']]
    });

    res.json({ totalBalance: result[0].get('totalBalance') });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Calculate the total amount paid from all bookings
exports.getTotalAmountPaid = async (req, res) => {
  try {
    const result = await Booking.findAll({
      attributes: [[sequelize.fn('SUM', sequelize.col('amountPaid')), 'totalAmountPaid']]
    });

    res.json({ totalAmountPaid: result[0].get('totalAmountPaid') });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};