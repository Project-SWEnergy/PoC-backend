import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';

const pool = new Pool({
	connectionString: "postgresql://user:postgres@db:5432/testDB?schema=public",
})

const db = drizzle(pool)

async function main() {
	console.log("Migrating database...")
	await migrate(db, { migrationsFolder: "migrations" })
	console.log("Done!")
	process.exit(0)
}

main().catch(err => {
	console.error(err)
	process.exit(1)
})
