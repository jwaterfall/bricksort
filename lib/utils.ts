import mongoose from 'mongoose';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const MONGODB_URI = process.env.MONGODB_URI as string;

export const connectToDatabase = async () => {
  if (!mongoose.connections[0].readyState) await mongoose.connect(MONGODB_URI);
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
