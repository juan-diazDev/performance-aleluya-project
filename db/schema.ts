import { v4 as uuidv4 } from 'uuid';
import { sql } from 'drizzle-orm';
import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const User = sqliteTable('User', {
  id: text('id')
    .$defaultFn(() => uuidv4())
    .primaryKey(),
  name: text('name'),
  email: text('email').unique(),
  createdAt: text('createdAt').default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text('updatedAt').default(sql`(CURRENT_TIMESTAMP)`),
});
