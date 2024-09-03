// server.js or app.js
const express = require('express');
const authRoutes = require('./routes/auth');
const bookingRoutes = require('./routes/bookingRoutes');
const sequelize = require('./config/config');

const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});












