
import mongoose from 'mongoose';

const dbConnect = async (): Promise<void> => {
    try {
        await mongoose.connect(process.env.MONGODB_URL as string);
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection error:', error);
        throw error;
    }
};

export default dbConnect;
