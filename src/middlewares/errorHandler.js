<<<<<<< HEAD
const logger = require('../logger');
module.exports = (err, req, res, next) => {
  logger.error(err.stack || err.message);
  res.status(500).json({ status: 'error', message: 'Internal Server Error' });
=======
module.exports = (err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({
    error: err.message || 'Internal Server Error'
  });
>>>>>>> 222126396ae93864d164b26c1d673408ba07bd7c
};
