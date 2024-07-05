import { v4 as uuidv4 } from 'uuid';
import { sql } from 'drizzle-orm';
import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const User = sqliteTable('User', {
  id: text('id')
    .$defaultFn(() => uuidv4())
    .primaryKey(),
  name: text('name').notNull(),
  email: text('email').unique().notNull(),
  hashed_password: text('hashed_password').notNull(),
  created_at: text('created_at').default(sql`(CURRENT_TIMESTAMP)`),
  updated_at: text('updated_at').default(sql`(CURRENT_TIMESTAMP)`),
});

export type User = typeof User.$inferSelect;
