const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Log extends Model {}

Log.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  sequelize,
  modelName: 'Log',
  tableName: 'logs',
});

module.exports = Log;
