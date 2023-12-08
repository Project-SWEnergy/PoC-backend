DO $$ BEGIN
 CREATE TYPE "allergene_enum" AS ENUM('glutine', 'crostacei', 'uova', 'pesce', 'arachidi', 'soia', 'latte', 'frutta a guscio', 'sedano', 'senape', 'sesamo', 'lupini', 'molluschi');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "prize_enum" AS ENUM('economico', 'medio', 'costoso');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "stato_ordine_enum" AS ENUM('da confermare', 'in attesa', 'in corso', 'concluso');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "allergene" (
	"id_ingrediente" integer NOT NULL,
	"allergene" "allergene_enum" NOT NULL,
	"foto" json,
	CONSTRAINT id PRIMARY KEY("id_ingrediente","allergene")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "allergia" (
	"id_utente" integer NOT NULL,
	"allergene" "allergene_enum" NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "composizione" (
	"id_piatto" integer NOT NULL,
	"id_ingrediente" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "cucina" (
	"id_tag" integer NOT NULL,
	"id_ristorante" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ingrediente" (
	"id" serial PRIMARY KEY NOT NULL,
	"nome" varchar(100) NOT NULL,
	"descrizione" varchar(255),
	"foto" json
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "menu" (
	"id_ristorante" integer NOT NULL,
	"id_piatto" integer NOT NULL,
	"prezzo" real NOT NULL,
	CONSTRAINT id PRIMARY KEY("id_ristorante","id_piatto")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ordinazione" (
	"id_utente" integer NOT NULL,
	"id_prenotazione" integer NOT NULL,
	"id_piatto" integer NOT NULL,
	"quantita" integer NOT NULL,
	CONSTRAINT id PRIMARY KEY("id_utente","id_prenotazione","id_piatto")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "piatto" (
	"id" serial PRIMARY KEY NOT NULL,
	"nome" varchar(100) NOT NULL,
	"descrizione" varchar(511),
	"foto" json
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "prenotazione" (
	"id" serial PRIMARY KEY NOT NULL,
	"data_e_ora" timestamp NOT NULL,
	"numero_persone" integer NOT NULL,
	"stato" "stato_ordine_enum" NOT NULL,
	"id_utente" integer NOT NULL,
	"id_ristorante" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ristorante" (
	"id" integer PRIMARY KEY NOT NULL,
	"nome" varchar(100) NOT NULL,
	"orario" json,
	"descrizione" varchar(511),
	"indirizzo" varchar(255) NOT NULL,
	"telefono" varchar(10),
	"website" varchar(255),
	"costo" "prize_enum" DEFAULT 'medio',
	"sedie_per_bambini" boolean,
	"adatto_ai_disabili" boolean
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tag" (
	"id" serial PRIMARY KEY NOT NULL,
	"nome" varchar(50) NOT NULL,
	"descrizione" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "utente" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(255),
	"username" varchar(100)
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "allergene" ADD CONSTRAINT "allergene_id_ingrediente_ingrediente_id_fk" FOREIGN KEY ("id_ingrediente") REFERENCES "ingrediente"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "allergia" ADD CONSTRAINT "allergia_id_utente_utente_id_fk" FOREIGN KEY ("id_utente") REFERENCES "utente"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "composizione" ADD CONSTRAINT "composizione_id_piatto_piatto_id_fk" FOREIGN KEY ("id_piatto") REFERENCES "piatto"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "composizione" ADD CONSTRAINT "composizione_id_ingrediente_ingrediente_id_fk" FOREIGN KEY ("id_ingrediente") REFERENCES "ingrediente"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cucina" ADD CONSTRAINT "cucina_id_tag_tag_id_fk" FOREIGN KEY ("id_tag") REFERENCES "tag"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cucina" ADD CONSTRAINT "cucina_id_ristorante_ristorante_id_fk" FOREIGN KEY ("id_ristorante") REFERENCES "ristorante"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "menu" ADD CONSTRAINT "menu_id_ristorante_ristorante_id_fk" FOREIGN KEY ("id_ristorante") REFERENCES "ristorante"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "menu" ADD CONSTRAINT "menu_id_piatto_piatto_id_fk" FOREIGN KEY ("id_piatto") REFERENCES "piatto"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ordinazione" ADD CONSTRAINT "ordinazione_id_utente_utente_id_fk" FOREIGN KEY ("id_utente") REFERENCES "utente"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ordinazione" ADD CONSTRAINT "ordinazione_id_prenotazione_prenotazione_id_fk" FOREIGN KEY ("id_prenotazione") REFERENCES "prenotazione"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ordinazione" ADD CONSTRAINT "ordinazione_id_piatto_piatto_id_fk" FOREIGN KEY ("id_piatto") REFERENCES "piatto"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "prenotazione" ADD CONSTRAINT "prenotazione_id_utente_utente_id_fk" FOREIGN KEY ("id_utente") REFERENCES "utente"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "prenotazione" ADD CONSTRAINT "prenotazione_id_ristorante_ristorante_id_fk" FOREIGN KEY ("id_ristorante") REFERENCES "ristorante"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ristorante" ADD CONSTRAINT "ristorante_id_utente_id_fk" FOREIGN KEY ("id") REFERENCES "utente"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
