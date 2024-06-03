import express from 'express';
import bodyParser from 'body-parser';
import bookingRoutes from './routes/bookingRoutes';
import creditRoutes from './routes/creditRoutes';

const app = express();

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Routes
app.use(bookingRoutes);
app.use(creditRoutes);

export default app;
