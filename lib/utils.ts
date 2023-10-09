import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import mongoose from 'mongoose';

export const MONGODB_URI = process.env.MONGODB_URI as string;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const connectToDatabase = async () => {
  if (!mongoose.connections[0].readyState) await mongoose.connect(MONGODB_URI);
};
