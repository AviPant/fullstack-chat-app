import mongoose from 'mongoose';

export async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error('MONGODB_URI is not defined in your .env file');
    console.log('Please set up a MongoDB Atlas connection string in your .env file');
    console.log('Example: MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/chatapp?retryWrites=true&w=majority');
    process.exit(1);
  }

  // Check if using local MongoDB in WebContainer (not supported)
  if (uri.includes('localhost') || uri.includes('127.0.0.1')) {
    console.error('❌ Local MongoDB is not supported in this environment');
    console.log('Please use MongoDB Atlas instead. Update your MONGODB_URI in the .env file to use a cloud connection string.');
    console.log('Example: MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/chatapp?retryWrites=true&w=majority');
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    console.log('Please check your MongoDB Atlas connection string and ensure your IP is whitelisted');
    process.exit(1);
  }
}