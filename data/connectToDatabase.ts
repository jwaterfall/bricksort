import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

const connectToDatabase = () => {
  if (!mongoose.connections[0].readyState) mongoose.connect(MONGODB_URI);
};

export default connectToDatabase;
