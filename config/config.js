// config.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  'ajpbooking', 
  'ajpbooking_user',
   'wYKvK4I5XpwRZ2nuZmm4NXV4Cwa9oNtD', {
  host: 'dpg-cr5f4sij1k6c7395937g-a',
  dialect: 'postgres',
});

module.exports = sequelize;
