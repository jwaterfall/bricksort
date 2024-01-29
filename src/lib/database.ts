import { connections, connect } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const MONGODB_URI = process.env.MONGODB_URI as string;

export async function connectToDatabase() {
	if (!connections[0].readyState) await connect(MONGODB_URI);
}