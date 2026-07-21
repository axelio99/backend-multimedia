import { serial, pgTable, varchar, integer } from "drizzle-orm/pg-core";

export const mahasiswa = pgTable('mahasiswa', {
    id: serial('id').primaryKey(),
    nim: varchar('nim', { length: 20 }).notNull().unique(),
    nama: varchar('nama', { length: 255 }).notNull(),
    prodi: varchar('prodi', { length: 255 }).notNull(),
    umur: integer('umur').notNull()
});