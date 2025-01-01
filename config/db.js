import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

let client = null;

export const connectDB = async () => {
  try {
    if (!client) {
      client = new MongoClient(process.env.MONGODB_URI);
      await client.connect();
      console.log('MongoDB connected successfully');
    }
    return client.db();
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};

export const closeDB = async () => {
  if (client) {
    await client.close();
    client = null;
  }
};

export const getCollection = async (collectionName) => {
  const db = await connectDB();
  return db.collection(collectionName);
};