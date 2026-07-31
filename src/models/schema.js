import { serial, pgTable, varchar, integer, text } from "drizzle-orm/pg-core";

export const mahasiswa = pgTable('mahasiswa', {
    id: serial('id').primaryKey(),
    nim: varchar('nim', { length: 20 }).notNull().unique(),
    nama: varchar('nama', { length: 255 }).notNull(),
    prodi: varchar('prodi', { length: 255 }).notNull(),
    umur: integer('umur').notNull()
});

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    nama: varchar('nama', { length: 255 }).notNull(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    password: text('password').notNull()
});