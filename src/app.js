require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const expressWinston = require('express-winston');
const winston = require('winston');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const errorHandler = require('./middlewares/errorHandler');

app.use(express.json());

// logging
app.use(expressWinston.logger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'src/logs/app.log' })
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  ),
  meta: true,
  expressFormat: true,
  colorize: false,
}));

app.use('/auth', authRoutes);
app.use('/products', productRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log('Server listening on port', port);
  console.log('Use .env.example to configure DATABASE_URL and secrets.');
});
