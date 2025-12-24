import express from 'express';
import cors from 'cors';
import sellerRoutes from './Routes/sellerRoutes.js';
import errorHandler from './Middleware/errorHandler.js';

const app = express();

app.use(express.json());
app.use(cors());

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Routes
app.use('/api/sellers', sellerRoutes);

// Global Handler
app.use(errorHandler);

export default app;
