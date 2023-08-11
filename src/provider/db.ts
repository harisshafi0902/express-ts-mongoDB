// MongoDB Query to connect.

import mongoose, { ConnectOptions } from 'mongoose';
import { string } from 'zod';

const connectdb = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL as string, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);
    console.log(`Connected to MongoDB: ${conn.connection.host}`);
  } catch (err) {
    console.log('error is :', err);
    process.exit(1);
  }
};

export default connectdb;
