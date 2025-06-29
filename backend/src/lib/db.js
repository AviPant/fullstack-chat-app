import mongoose from 'mongoose';

export async function connectDB() {
  const uri = process.env.MONGODB_URI; // ✅ Match this with your .env

  if (!uri) {
    console.error('MONGO_URI is not defined in your .env file');
    process.exit(1);
  }

  try {
    await mongoose.connect(uri); // ✅ No need for deprecated options
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  }
}
