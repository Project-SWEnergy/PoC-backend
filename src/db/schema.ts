import { primaryKey, real, time, integer, timestamp, pgTable, serial, varchar, json, pgEnum, boolean } from 'drizzle-orm/pg-core'

export const prize_enum = pgEnum("prize_enum", [
	'economico',
	'medio',
	'costoso'])

export const stato_ordine_enum = pgEnum("stato_ordine_enum", [
	'da confermare',
	'in attesa',
	'in corso',
	'concluso'])

export const allergene_enum = pgEnum("allergene_enum", [
	'glutine',
	'crostacei',
	'uova',
	'pesce',
	'arachidi',
	'soia',
	'latte',
	'frutta a guscio',
	'sedano',
	'senape',
	'sesamo',
	'lupini',
	'molluschi',
])

export const giorno_enum = pgEnum("giorno_enum", [
	'lunedì',
	'martedì',
	'mercoledì',
	'giovedì',
	'venerdì',
	'sabato',
	'domenica',
])

export const utente = pgTable("utente", {
	id: serial("id").primaryKey(),
	email: varchar("email", { length: 255 }).unique().notNull(),
	username: varchar("username", { length: 100 }).notNull(),
})

export const ristorante = pgTable("ristorante", {
	id_ristorante: integer("id").primaryKey().references(() => utente.id),
	nome: varchar("nome", { length: 100 }).notNull(),
	descrizione: varchar("descrizione", { length: 511 }),
	indirizzo: varchar("indirizzo", { length: 255 }).unique().notNull(),
	telefono: varchar("telefono", { length: 10 }),
	website: varchar("website", { length: 255 }),
	costo: prize_enum("costo").default('medio'),
	sedie_per_bambini: boolean("sedie_per_bambini"),
	adatto_ai_disabili: boolean("adatto_ai_disabili"),
})

export const orario = pgTable("orario", {
	id_ristorante: integer("id_ristorante").notNull().references(() =>
		ristorante.id_ristorante),
	giorno: giorno_enum("giorno").notNull(),
	apertura: time("apertura").notNull(),
	chiusura: time("chiusura").notNull(),
})

export const prenotazione = pgTable("prenotazione", {
	id: serial("id").primaryKey(),
	data_e_ora: timestamp("data_e_ora").notNull(),
	numero_persone: integer("numero_persone").notNull(),
	stato: stato_ordine_enum("stato").notNull(),
	id_utente: integer("id_utente").notNull().references(() => utente.id),
	id_ristorante: integer("id_ristorante").notNull().references(() =>
		ristorante.id_ristorante),
})

export const tag = pgTable("tag", {
	id: serial("id").primaryKey(),
	nome: varchar("nome", { length: 50 }).notNull(),
	descrizione: varchar("descrizione", { length: 255 }),
})

export const cucina = pgTable("cucina", {
	id_tag: integer("id_tag").notNull().references(() => tag.id),
	id_ristorante: integer("id_ristorante").notNull().references(() =>
		ristorante.id_ristorante),
})

export const piatto = pgTable("piatto", {
	id: serial("id").primaryKey(),
	nome: varchar("nome", { length: 100 }).notNull(),
	descrizione: varchar("descrizione", { length: 511 }),
	foto: json("foto"),
})

export const menu = pgTable("menu", {
	id_ristorante: integer("id_ristorante").notNull().references(() =>
		ristorante.id_ristorante),
	id_piatto: integer("id_piatto").notNull().references(() => piatto.id),
	prezzo: real("prezzo").notNull(),
}, (table) => {
	return {
		pk: primaryKey({
			columns: [table.id_ristorante, table.id_piatto]
		})
	};
})

export const ingrediente = pgTable("ingrediente", {
	id: serial("id").primaryKey(),
	nome: varchar("nome", { length: 100 }).notNull(),
	descrizione: varchar("descrizione", { length: 255 }),
	foto: json("foto"),
})

export const composizione = pgTable("composizione", {
	id_piatto: integer("id_piatto").notNull().references(() => piatto.id),
	id_ingrediente: integer("id_ingrediente").notNull().references(() =>
		ingrediente.id),
})

export const allergia = pgTable("allergia", {
	id_utente: integer("id_utente").notNull().references(() => utente.id),
	allergene: allergene_enum("allergene").notNull(),
})

export const ordinazione = pgTable("ordinazione", {
	id_utente: integer("id_utente").notNull().references(() => utente.id),
	id_prenotazione: integer("id_prenotazione").notNull().references(() =>
		prenotazione.id),
	id_piatto: integer("id_piatto").notNull().references(() => piatto.id),
	quantita: integer("quantita").notNull(),
}, (table) => {
	return {
		pk: primaryKey({
			columns: [table.id_utente, table.id_prenotazione, table.id_piatto]
		})
	};
})

export const allergene = pgTable("allergene", {
	id_ingrediente: integer("id_ingrediente").notNull().references(() =>
		ingrediente.id),
	allergene: allergene_enum("allergene").notNull(),
	foto: json("foto"),
}, (table) => {
	return {
		pk: primaryKey({
			columns: [table.id_ingrediente, table.allergene]
		})
	};
})
