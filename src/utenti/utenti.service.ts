import { Injectable } from '@nestjs/common';
import { CreateUtentiDto } from './dto/create-utenti.dto';
import { UpdateUtentiDto } from './dto/update-utenti.dto';
import { db } from '../db';
import { utente } from '../db/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class UtentiService {
	async create(createUtentiDto: CreateUtentiDto) {
		return await db.insert(utente)
			.values(createUtentiDto)
			.returning()
	}

	async findAll() {
		return await db.select().from(utente)
	}

	async findOne(email: string) {
		return await db.select().from(utente).where(eq(utente.email, email))
	}

	async update(id: number, updateUtentiDto: UpdateUtentiDto) {
		return await db.update(utente)
			.set({ ...updateUtentiDto })
			.where(eq(utente.id, id))
			.returning()

	}

	async remove(id: number) {
		await db.delete(utente).where(eq(utente.id, id))
	}
}
