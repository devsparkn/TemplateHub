import mongoose from 'mongoose';
import { config } from 'dotenv';

config({ path: '.env.local' }); // Explicitly load from .env.local

// Type for Mongoose connection cache
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Augment global scope with TypeScript declaration
declare global {
  // eslint-disable-next-line no-var
  var mongooseGlobal: MongooseCache | undefined;
}

// Constants and validation
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI is not defined in environment variables');
}

// Initialize or reuse global cache
const mongooseCache: MongooseCache = global.mongooseGlobal || {
  conn: null,
  promise: null,
};

async function dbConnect(): Promise<typeof mongoose> {
  if (mongooseCache.conn) {
    return mongooseCache.conn;
  }

  if (!mongooseCache.promise) {
    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    mongooseCache.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: true,
      serverSelectionTimeoutMS: 10000,
      family: 4, // Force IPv4
    }).then(mongoose => {
      console.log('MongoDB connection established');
      return mongoose;
    });
  }

  try {
    mongooseCache.conn = await mongooseCache.promise;
  } catch (error) {
    mongooseCache.promise = null; // Reset promise on failure
    console.error('MongoDB connection error:', error);
    throw new Error(`Database connection failed: ${(error as Error).message}`);
  }

  // For Next.js HMR (Hot Module Replacement), preserve cache
  if (process.env.NODE_ENV !== 'production') {
    global.mongooseGlobal = mongooseCache;
  }

  return mongooseCache.conn;
}

// Utility function to check connection status
export function isConnected(): boolean {
  return !!mongooseCache.conn && 
    mongooseCache.conn.connection.readyState === 1;
}

export default dbConnect;