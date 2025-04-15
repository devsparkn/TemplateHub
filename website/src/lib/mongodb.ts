import mongoose from 'mongoose';

// Define the global cached mongoose connection
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Extend the global type for TypeScript
declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

// Ensure MONGODB_URI is available
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  throw new Error('Please add your MongoDB URI to .env.local');
}

// Initialize global cache safely
const globalWithMongoose = global as typeof globalThis & {
  mongooseCache: MongooseCache;
};

if (!globalWithMongoose.mongooseCache) {
  globalWithMongoose.mongooseCache = { conn: null, promise: null };
}

const cached = globalWithMongoose.mongooseCache;

async function dbConnect() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };
    if (!MONGODB_URI) {
      throw new Error('MongoDB URI is undefined');
    }
    cached.promise = mongoose.connect(MONGODB_URI, opts);
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}

export default dbConnect;
