import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { connect, connections } from 'mongoose';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function connectToDatabase() {
  if (connections[0].readyState) return;
  await connect(process.env.MONGODB_URI!);
}
