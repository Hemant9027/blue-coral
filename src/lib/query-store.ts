import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { getQueryCollection, type QueryDocument } from '@/lib/mongodb';

const storageDir = join(process.cwd(), 'data');
const storageFile = join(storageDir, 'queries.json');

export interface GuestQuery extends QueryDocument {}

function ensureStorage() {
  if (!existsSync(storageDir)) {
    mkdirSync(storageDir, { recursive: true });
  }

  if (!existsSync(storageFile)) {
    writeFileSync(storageFile, JSON.stringify([]), 'utf8');
  }
}

function readStorage(): GuestQuery[] {
  ensureStorage();
  try {
    const raw = readFileSync(storageFile, 'utf8');
    return JSON.parse(raw) as GuestQuery[];
  } catch {
    writeFileSync(storageFile, JSON.stringify([]), 'utf8');
    return [];
  }
}

function writeStorage(queries: GuestQuery[]) {
  ensureStorage();
  writeFileSync(storageFile, JSON.stringify(queries, null, 2), 'utf8');
}

export async function getQueries(): Promise<GuestQuery[]> {
  const collection = await getQueryCollection();
  if (collection) {
    const docs = await collection.find({}).sort({ createdAt: -1 }).toArray();
    return docs as GuestQuery[];
  }

  return readStorage().sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));
}

export async function addQuery(payload: Omit<GuestQuery, 'id' | 'createdAt'>): Promise<GuestQuery> {
  const newQuery: GuestQuery = {
    ...payload,
    id: typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    createdAt: new Date().toISOString(),
  };

  const collection = await getQueryCollection();
  if (collection) {
    await collection.insertOne(newQuery);
    return newQuery;
  }

  const queries = readStorage();
  queries.unshift(newQuery);
  writeStorage(queries);
  return newQuery;
}

export async function deleteQuery(id: string): Promise<boolean> {
  const collection = await getQueryCollection();
  if (collection) {
    const result = await collection.deleteOne({ id });
    return result.deletedCount > 0;
  }

  const queries = readStorage();
  const filtered = queries.filter((query) => query.id !== id);
  if (filtered.length === queries.length) {
    return false;
  }
  writeStorage(filtered);
  return true;
}
