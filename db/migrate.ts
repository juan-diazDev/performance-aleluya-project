import { drizzle } from 'drizzle-orm/better-sqlite3';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import path from 'path';

import * as schema from './schema';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const sqlite = new Database(__dirname + '/data.db');
const db = drizzle(sqlite, { schema });

migrate(db, { migrationsFolder: 'drizzle' });

console.log('dirname', __dirname + '/drizzle');
