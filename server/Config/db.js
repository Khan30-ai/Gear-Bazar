import { connect } from 'mongoose';

const connectDB = async () => {
    try {
        await connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/gearbazar');
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    }
};

export default connectDB; 
