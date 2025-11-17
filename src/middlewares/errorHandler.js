const logger = require('../logger');
module.exports = (err, req, res, next) => {
  logger.error(err.stack || err.message);
  res.status(500).json({ status: 'error', message: 'Internal Server Error' });
};
