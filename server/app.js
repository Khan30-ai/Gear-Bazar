import express from 'express';
import cors from 'cors';
import sellerRoutes from './Routes/sellerRoutes.js';
import errorHandler from './Middleware/errorHandler.js';
import productRoutes from "./Routes/productRoutes.js"
import orderRoutes from "./Routes/orderRoutes.js"

const app = express();

app.use(express.json());
app.use(cors());

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Routes
app.use('/api/sellers', sellerRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);  //this will change into (,adminAuth,confirmOrder) once jwt comes

//to catch unknown routes
app.use((req,res,next)=>{
  res.status(404);
  next(new Error("Route not found"))
})

// Global Handler
app.use(errorHandler);

export default app;
