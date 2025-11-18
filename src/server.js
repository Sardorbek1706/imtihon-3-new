import express from 'express';
import { json } from 'body-parser';
import { connectDatabase } from './db/knex';
import routes from './routes';
import { errorHandler } from './middlewares/error.middleware';
import { logger } from './utils/logger';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(json());
app.use(logger);

// Routes
app.use('/api', routes);

// Error handling middleware
app.use(errorHandler);

// Start the server
const startServer = async () => {
    try {
        await connectDatabase();
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Failed to connect to the database:', error);
        process.exit(1);
    }
};

startServer();