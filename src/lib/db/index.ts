import { NeonQueryFunction, neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

export const sql: NeonQueryFunction<boolean, boolean> = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);
export default db;