const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  street: {
    type: Sequelize.STRING,
    allowNull: false
  },
  buildingNumber: {
    type: Sequelize.STRING,
    allowNull: false
  },
  apartmentNumber: {
    type: Sequelize.STRING,
    allowNull: true
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false
  },
  postalCode: {
    type: Sequelize.STRING,
    allowNull: false
  },
  nip: {
    type: Sequelize.STRING,
    allowNull: true
  },
  regon: {
    type: Sequelize.STRING,
    allowNull: true
  },
  role: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'user'
  },
  refreshToken: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

User.sync();

module.exports = User;
