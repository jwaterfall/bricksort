import mongoose from 'mongoose';

export const MONGODB_URI = process.env.MONGODB_URI as string;

export async function connectToDatabase() {
    if (!mongoose.connections[0].readyState) await mongoose.connect(MONGODB_URI);
}
