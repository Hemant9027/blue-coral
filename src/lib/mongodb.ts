import { MongoClient, type Collection } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || 'blue-coral';

let cachedClient: MongoClient | null = null;
let cachedDb: ReturnType<MongoClient['db']> | null = null;

export interface QueryDocument {
  id: string;
  name: string;
  email: string;
  phone: string;
  arrivalDate: string;
  departureDate: string;
  guests: string;
  message: string;
  createdAt: string;
}

export async function getQueryCollection(): Promise<Collection<QueryDocument> | null> {
  if (!uri) {
    return null;
  }

  try {
    if (cachedDb) {
      return cachedDb.collection<QueryDocument>('queries');
    }

    if (!cachedClient) {
      cachedClient = new MongoClient(uri);
      await cachedClient.connect();
    }

    cachedDb = cachedClient.db(dbName);
    return cachedDb.collection<QueryDocument>('queries');
  } catch (error) {
    console.error('MongoDB unavailable, falling back to local storage.', error);
    return null;
  }
}
