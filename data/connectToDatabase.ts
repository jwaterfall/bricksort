import mongoose from 'mongoose';

export const MONGODB_URI = process.env.MONGODB_URI as string;

const connectToDatabase = async () => {
  if (!mongoose.connections[0].readyState) await mongoose.connect(MONGODB_URI);
};

export default connectToDatabase;
