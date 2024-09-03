// models/Booking.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');
const User = require('./User');

const Booking = sequelize.define('Booking', {
  ownerName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contactNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
  },
  paid: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  amountPaid: {
    type: DataTypes.DOUBLE,
  },
  balance: {
    type: DataTypes.DOUBLE,
  },
  numberOfPictures: {
    type: DataTypes.INTEGER,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
});

Booking.belongsTo(User, { foreignKey: 'userId', as: 'user' });

module.exports = Booking;
