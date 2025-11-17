<<<<<<< HEAD
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
require('dotenv').config();
const logger = require('./logger');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('combined'));

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

app.get('/', (req,res)=> res.send('Product Catalog API is running'));

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> {
  logger.info(`Server started on port ${PORT}`);
  console.log(`Server ${PORT}`);
=======
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
>>>>>>> 222126396ae93864d164b26c1d673408ba07bd7c
});
