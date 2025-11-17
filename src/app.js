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
});
