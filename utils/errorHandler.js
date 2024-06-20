// utils/errorHandler.js
const Log = require('../models/log');

const errorHandler = async (err, req, res, next) => {
  // Tworzenie wpisu w tabeli logów
  await Log.create({
    message: `${req.path} - ${err.message}`
  });

  // Wysyłanie odpowiedzi z błędem
  res.status(500).json({
    message: 'Server error',
    error: err.message
  });
};

module.exports = errorHandler;
