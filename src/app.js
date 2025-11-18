import express from 'express';
import { json } from 'body-parser';
import { connectDB } from './db/knex';
import routes from './routes';
import { errorHandler } from './middlewares/error.middleware';
import { logger } from './utils/logger';

const app = express();

// Middleware
app.use(json());
app.use(logger);

// Connect to the database
connectDB();

// Routes
app.use('/api', routes);

// Error handling middleware
app.use(errorHandler);

export default app;